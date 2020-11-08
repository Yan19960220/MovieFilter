'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Poster: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: false
    },
    Year: {
        type: String,
        required: false
    },
    Description: {
        type: String,
        required: false
    },
    Published: {
        type: Boolean,
        required: false
    },
    Created_at: {
        type: Date,
        default: Date.now
    },
    Updated_at: {
        type: Date,
        default: Date.now
    }
});

//Export movie
var Mov = module.exports =  mongoose.model('Movies', MovieSchema);

module.exports.get = function (callback, limit) {
    Mov.find(callback).limit(limit); 
}

