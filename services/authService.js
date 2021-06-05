const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

const isUsernameExists = async data => {
    try {
        let result = await User.findOne({ username: data.username });
        return result;
    } catch (error) {
        console.log(error)
    }
}

const isImgValid = async (username, file) => {
    if (file.detectedFileExtension !== '.jpg' || file.size >= 100000) throw new Error('Invalid file type or size is bigger then 100kb')

    const fileName = username + Math.floor(Math.random() * 1000) + file.detectedFileExtension;
    try {
        await pipeline(file.stream, fs.createWriteStream(`${__dirname}/../public/images/${fileName}`))
        return fileName;
    } catch (error) {
        console.log(error)
    }
}

const register = async (data, file) => {
    try {
        const img = await isImgValid(data.username, file);
        if (!img)
            throw new Error('Invalid file type or size is bigger then 100kb')
        data.img = img;

        const hashPass = await bcrypt.hash(data.password, 10);
        data.password = hashPass;
        let user = new User(data);
        let result = await user.save();
        return result;

    } catch (error) {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
    }
}

module.exports = {
    isUsernameExists,
    register,
    signIn,
    isImgValid,
    updateProfile,
}