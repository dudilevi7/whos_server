require('dotenv').config();
const {
    AUTHORITY,
    PORT = 3001,
    MONGODB_CONNECTION_URL,
} = process.env

module.exports = {
    PORT,
    AUTHORITY,
    MONGODB_CONNECTION_URL,
}