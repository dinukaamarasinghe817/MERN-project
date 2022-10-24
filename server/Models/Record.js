const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    patientid: {
        type: Number,
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    disease: {
        type: String,
    }
});

const Record = mongoose.model('patientrecord',Schema)
module.exports = Record;