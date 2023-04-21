const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type:String,
        required:[true, 'UserName is Required!']
    },
    email: {
        type:String,
        required:[true, 'Email is Required!'],
        unique: [true, 'Email is already registered']
    },
    password: {
        type:String,
        required:[true, 'Password is Required!']
    },
},
{
    timestamps: true,
}
);

module.exports =  mongoose.model('User', userSchema);