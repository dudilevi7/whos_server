const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { promisify } = require('util');
const whosLogger = require('../utils/whosLogger');
const pipeline = promisify(require('stream').pipeline);

const isUsernameExists = async data => {
    try {
        let result = await User.findOne({ username: data.username });
        return result;
    } catch (error) {
        whosLogger.error(error)
    }
}

const isImgValid = async (username, file) => {
    if (file.detectedFileExtension !== '.jpg' || file.size >= 1000000) throw new Error('Invalid file type or size is bigger then 100kb')

    const fileName = username + Math.floor(Math.random() * 1000) + file.detectedFileExtension;
    try {
        await pipeline(file.stream, fs.createWriteStream(`./public/images/${fileName}`))
        return fileName;
    } catch (error) {
        whosLogger.error(error)
    }
}

const register = async (data, file) => {
    try {
        const {
            username,
        } = data
        
        const img = await isImgValid(username, file);
        if (!img)
            throw new Error('img isnt valid')
        data.img = img;

        // const hashPass = await bcrypt.hash(data.password, 10);
        // delete data.password
        const password = data.password
        delete data.password

        let user = new User(data);
        await user.setPassword(password)
        await user.save();
        const { user: newUser } = await User.authenticate()(username, password)
        return newUser

    } catch (error) {
        whosLogger.error(error)
    }
}
const signIn = async data => {
    const { username, password } = data;
    try {
        const user = await User.findOne({ username: username });
        const success = await bcrypt.compare(password, user.password)
        if (success) {
            return user;
        } else
            throw new Error("Wrong passowrd or user not found")
    } catch (error) {
        whosLogger.error(error)
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