const connectToMongo = require('./db')
const express = require('express')

connectToMongo();
const app = express();

app.get('/',(req,res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT,()=>{
    console.log(`listening at http://localhost:${process.env.PORT}`)
})

