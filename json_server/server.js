const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');



// PwIHqVk7BMpbojGI
const postRouter = require('./model/routes/api/post')
const app = express();


var cors = require('cors')

 
app.use(cors())

// bodyparser middleWare
app.use(express.json())
//connect to mongodb
mongoose.connect(MONGO_URI)
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err))
// user router
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server run at port ${PORT}`))