const User = require('../models/User');

const getUsersByTable = async()=> {

}

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
        console.log(error)
    }
}

module.exports = {
    table
}