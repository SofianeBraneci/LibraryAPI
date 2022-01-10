const library = require("express").Router()
const {getConnection} = require("./mongoclient")
const pageSize = 10

library.get("/books", async (req, res)=>{
    const client = await getConnection()
    await client.connect()
    const {page} = req.body
    let skips = 0;
    if(page){
       skips = pageSize * (page - 1)
    }
    const books = await client.db("library")
                              .collection("books").find().skip(skips).limit(pageSize).toArray()
    res.json(books)
    client.close()

})

library.get("/books/:title", async(req, res)=>{
    const client = await getConnection()

    const books = await client.db("library")
                                    .collection("books")
                                    .find({"title": {$regex: req.params.title}}).toArray()
    res.json(books)
    client.close()
    
})


library.get("/authors", async (req, res)=>{
    const client = await getConnection()
    await client.connect()
    const authorsArray = await client.db("library")
                                     .collection("books")
                                     .distinct("authors.name", {"authors.name": {$exists: true}})
    res.json(authorsArray)
})

library.get("/authors/:author", async(req, res)=>{
    const client = await getConnection()

    const authorBooks = await client.db("library")
                                    .collection("books")
                                    .find({"authors.name": {$regex: req.params.author}}).toArray()
    res.json(authorBooks)
    client.close()
})




library.get("/subjects", async (req, res)=>{
    const client = await getConnection()
    const documents = await client.db("library")
                                       .collection("books")
                                       .find().project({"subjects": 1}).toArray()
    let subjects = []
    documents.map(doc=>{
        subjects = subjects.concat(doc.subjects)
    }) 
    
    res.json(subjects)

})

library.get("/subjects/:subject", async (req, res)=>{
    const client = await getConnection()
    const documents = await client.db("library")
                                       .collection("books")
                                       .find({"subjects": {$regex: req.params.subject}})
                                       .project({title:1, authors: 1, subjects:1, formats:1, _id: 1})
                                       .toArray()
    
    res.json(documents)

})


module.exports.libraryRouter = library