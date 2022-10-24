var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PSchema = new Schema({
    _id:Number,
    patientid:Number,
    name:String,
    age:Number
});

const Patient = mongoose.model('patient',PSchema);
module.exports = Patient;