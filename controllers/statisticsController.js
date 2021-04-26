const statsService = require('../services/statsService');

const table = async(req,res)=>{
    try {
        const table = await statsService.table();
        if (!table) 
            throw new Error("Table isn't open!")
        else 
            return res.send(table);
    } catch (error) {
        console.log(error)
        res.status(400).send("Table isn't open!")
    }
}
// const sendResult = async(req,res)=>{
//     try {
//         const data = req.body;
//         if (!data.result) throw new Error("Result isn't exists")
//         return res.json({status: 'ok',name : data.name ,result : data.result, id : '1'})
//     } catch (error) {
//         console.log(error)
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
    table,
    // sendResult
}