const MongoClient = require('mongoose').MongoClient
const dotenv = require("dotenv").config()
 
// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const PROD_URI = process.env.MONGO_DB_CONNECT
const MKTG_URI = process.env.MONGO_DB_CONNECT
 
function connect(url) {
  return MongoClient.connect(url).then(client => client.db())
}
 
module.exports = async function() {
  let databases = await Promise.all([connect(PROD_URI), connect(MKTG_URI)])
 
  return {
    production: databases[0],
    marketing: databases[1]
  }
}