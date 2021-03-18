const table = async(req,res)=>{
    try {
        const table = [{name : 'Dudi', result : 55},{name : 'Moshik',result : 25}]
         res.send(table)
    } catch (error) {
        
    }
}
const sendResult = async(req,res)=>{
    try {
        const data = req.body;
        if (!data.result) throw new Error("Result isn't exists")
        return res.json({status: 'ok',name : data.name ,result : data.result, id : '1'})
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

module.exports = {
    table,
    sendResult
}