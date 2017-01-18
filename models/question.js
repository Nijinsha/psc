var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var questionSchema = new Schema({
    question: String,
    1: String,
    2: String,
    3: String,
    4: String,
    ans: Number
});

// Mongoose Model definition
module.exports = mongoose.model('question', questionSchema);