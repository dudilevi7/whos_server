const { stats } = require('../../lib');

const getTable = async(req,res)=>{
    try {
        console.debug('trying to get stats table form db')
        const table = await stats.table();
        if (!table) 
            throw new Error("getting stats table has been failed")
        else {
            console.log('got stats table successfully')
            return res.send(table);
        }
            
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
}

module.exports = getTable