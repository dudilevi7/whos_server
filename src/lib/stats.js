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

module.exports = {
    table
}