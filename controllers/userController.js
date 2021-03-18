const register = async(req,res)=>{
    try {
         const data = req.body;
         if (data.name === 'Dudi') throw new Error('username already exists')
         return res.json({status : 'ok',name : data.name,id : 'g',regDate : new Date().toISOString()})
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}
const signIn = async(req,res)=>{
    try {
        return res.json('signIn is in process')
    } catch (error) {
        
    }
}

module.exports = {
    register,
    signIn
}