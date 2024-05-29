const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/social-3')
.then(()=> console.log("database connected"))
.catch(err => console.log(err))