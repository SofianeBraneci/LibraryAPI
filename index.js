const express = require("express")
const bodyParser = require("body-parser")
const {libraryRouter} = require("./library")
const app = express()

// register all the routes
app.get("/", (req, res)=>{
    res.send("Hello from the library app")
})
app.use(bodyParser.json())
app.use("/library",libraryRouter)

// start the server on port 3000
app.listen(3000, ()=>{
    console.info("Server is up and running!")
})