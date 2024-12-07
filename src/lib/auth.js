const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { promisify } = require('util');
const whosLogger = require('../utils/whosLogger');
const { FILE_EXTENSTION_REGEX } = require('../utils/validation');
const pipeline = promisify(require('stream').pipeline);



const isUsernameExists = async data => {
    try {
        let result = await User.findOne({ username: data.username });
        return result;
    } catch (error) {
        whosLogger.error(error)
    }
}

const isImgValid = async (username, file = {}) => {
    const { originalname = '', size = 0, buffer: fileBuffer} = file;
    const isFileValid = originalname.match(FILE_EXTENSTION_REGEX)

    if (!isFileValid || size >= 1000000) throw new Error('please supply valid image [png, img]')

    const fileName = `${username}${Math.floor(Math.random() * 10)}${originalname}`;
    try {
        await pipeline(fileBuffer, fs.createWriteStream(`./public/images/${fileName}`))
        return fileName;
    } catch (error) {
        whosLogger.error(error)
    }
}

const register = async (data, file) => {
    try {
        const {
            username,
            isGoogle
        } = data
        let hashPass = ""
        if (!isGoogle) {
            const img = await isImgValid(username, file);
            if (!img) throw new Error('img isnt valid')
            data.img = img;
            hashPass = await bcrypt.hash(data.password, 10);
        }
        
        let newUser = new User(data);
        if (!isGoogle) {
            await newUser.setPassword(hashPass)
        }
        await newUser.save();
        if (!isGoogle) {
            let { user } = await User.authenticate()(username, password);
            newUser = user;
        }
        return newUser

    } catch (error) {
        whosLogger.error(error)
    }
}
const signIn = async (data) => {
    const { username, password, isGoogle } = data;
    try {
        const user = await User.findOne({ username }).lean().exec();
        if (isGoogle) {
            const googleUser = user ? user : registerWithGoogle(data);
            return googleUser;
        }
        const success = await bcrypt.compare(password, user.password)
        if (success) {
            return user;
        } else
            throw new Error("Wrong passowrd or user not found")
    } catch (error) {
        whosLogger.error(error)
    }
}
const registerWithGoogle = (newUser) => {
    try {
        const user = register(newUser);
        return user;
    } catch(err) {
        whosLogger.error(err);
        return {};
    }
}
const updateProfile = async (data, file) =>{
    try {
        
        if (file) {
            const img = await isImgValid(data.username, file);
            if (!img)
                throw new Error('Invalid file type or size is bigger then 100kb')
            data.img = img;
        }
        let result = await User.findOneAndUpdate({username: data.preUsername } , {username: data.username, img: data.img}, {new: true});

        if(!result){
            throw new Error('cant updated user')
        }
        return result;

    } catch (error) {
        whosLogger.error(error)
    }
}

module.exports = {
    isUsernameExists,
    register,
    signIn,
    isImgValid,
    updateProfile,
}