const { stats } = require('../../lib');
const whosLogger = require('../../utils/whosLogger');

const getTable = async(req, res)=>{
    try {
        whosLogger.info('trying to get stats table form db')
        const table = await stats.table();
        if (!table) 
            throw new Error("getting stats table has been failed")
        else {
            whosLogger.info('got stats table successfully')
            return res.send(table);
        }
            
    } catch (error) {
        whosLogger.error(error)
        res.status(400).send(error)
    }
}

module.exports = getTable