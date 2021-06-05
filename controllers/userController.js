const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { file, body: { restData } } = req;
        const data = JSON.parse(restData);
        const isExists = await authService.isUsernameExists(data);
        if (isExists) throw new Error("Username already exists");

        const newUser = await authService.register(data, file);
        if (!newUser) throw new Error("User not created");

        return res.json({ _id: newUser.id, username: newUser.username, img: newUser.img, highScore: { result: newUser.highScore.result, time: newUser.highScore.time } })

    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message);
    }
}
const signIn = async (req, res) => {
    try {
        const data = req.body;
        const user = await authService.signIn(data);
        if (!user) throw new Error("User not exists!")
        return res.json({
            _id: user.id, username: user.username,
            img: user.img, highScore: { result: user.highScore.result, time: user.highScore.time }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const editProfile = async (req,res)=> {

    try {
        const { 
            file, body: { restData } 
        } = req
        const data = JSON.parse(restData);

        const isExists = await authService.isUsernameExists(data);
        if (isExists) throw new Error("Username already exists");

        const updatedUser = await authService.updateProfile(data, file);
        if (!updatedUser) throw new Error("User not created");

        return res.json({ _id: updatedUser.id, username: updatedUser.username, img: updatedUser.img, highScore: { result: updatedUser.highScore.result, time: updatedUser.highScore.time } })

    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message);
    }

}
module.exports = {
    register,
    signIn,
    editProfile,
}