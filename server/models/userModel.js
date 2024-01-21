const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')
const validator = require ('validator')

const Schema = mongoose.Schema


const userSchema = new Schema({

    email:{

        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        unique: false
    }
})

//static signup method

userSchema.statics.signup = async function(email, password) {

    //validation

    if(!email || !password){
        throw Error('Wypelnij wszystkie pola')
    }

    if(!validator.isEmail(email)) {
        throw Error('Podany email jest niepoprawny')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Hasło musi zawierać co najmniej 6 znaków, duża literę i znak niestandardowy')
    }


    const exists = await this.findOne({email})

    if(exists) {
        throw Error('Podany email jest zajęty')
    }
    //generate salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash})


    return user
}


// Static login method

userSchema.statics.login = async function(email, password) {

    // Validation

    if(!email || !password){
        throw Error('Wypełnij wszystkie pola')
    }

   


    const user = await this.findOne({email})

    if(!user) {
        throw Error('Podany email jest niepoprawny')
    }

    const match = await bcrypt.compare(password, user.password)
 
    if(!match){
        throw Error('Niepoprawne hasło')
    }

        return user
}




module.exports = mongoose.model('User', userSchema)