'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: false
    }
});

//Export User
var User = module.exports =  mongoose.model('Users', UserSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit); 
}

