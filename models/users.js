var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var Schema = mongoose.Schema

var UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
})

UserSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('User', UserSchema)