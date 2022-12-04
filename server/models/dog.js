let mongoose = require('mongoose');

// create a model class
let dogModel = mongoose.Schema({
    name: String,
    owner: String,
    age: Number,
    description: String,
    breed: String
},
{
    collection: "dogs"
});

module.exports = mongoose.model('Dog', dogModel);