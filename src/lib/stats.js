const User = require('../models/User');
const whosLogger = require('../utils/whosLogger');

const table = async() =>{
    try {
        let sortedTable = await User.aggregate([{
            "$group" : {"_id": {username : "$username", img : "$img" , highScore : "$highScore"}},
        }]).sort({'_id.highScore.result': -1})
        if (!sortedTable) 
             throw new Error("no results")
        else 
            return sortedTable;
    } catch (error) {
        whosLogger.error(error)
    }
}

const update = async (userId, result = 0) => {
    try {
        const ok = await User.findOneAndUpdate({"_id": userId }, { highScore: { time: new Date(), result } });
        return ok;
    }catch(err) {
        whosLogger.error(err)
    }
}

module.exports = {
    table,
    update,
}