const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express();

// Middleware
app.use(express.json())

//CORS
app.use(cors());

// Available Routes
app.use('/api/auth', require('./routes/Auth'))
app.use('/api/note', require('./routes/Note'))

app.listen(process.env.PORT,()=>{
    console.log(`listening at http://localhost:${process.env.PORT}`)
})

