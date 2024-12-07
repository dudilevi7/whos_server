const { stats } = require('../../lib');
const whosLogger = require('../../utils/whosLogger');

const updateStats = async (req, res) => {
    try {
        whosLogger.info('trying to update high score')
        const { userId, newResult } = req.body;
        const table = await stats.update(userId, newResult);
        if (!table) 
            throw new Error("setting stats table has been failed")
        else {
            whosLogger.info('set stats successfully')
            return res.send(table);
        }
            
    } catch (error) {
        whosLogger.error(error)
        res.status(400).send(error)
    }
}

module.exports = updateStats