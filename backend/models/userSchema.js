const mongoose = require('mongoose')

const userSchema = ({
    name : {
        type:String,
        require:true
    },
    email : {
        type:String,
        require:true,
        unique:true

    },
    password : {
        type:String,
        require:true
    }
})
const User = mongoose.model('user-auth',userSchema)
module.exports = User;