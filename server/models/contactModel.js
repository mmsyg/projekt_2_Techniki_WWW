const mongosse = require('mongoose')

const Schema = mongosse.Schema


const contactSchema = new Schema({
    phoneNumber:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports =mongosse.model('Contact', contactSchema)