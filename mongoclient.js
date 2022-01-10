// returns a connection the mongodb server
async function getConnection(){
    try {
        
        const dotenv = require("dotenv")
        dotenv.config()
        const {MongoClient} = require("mongodb")
        const client = new MongoClient(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        return client
    
        
    } catch (error) {
        console.log(error)
    }
}


module.exports.getConnection = getConnection