let mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
     name:String
});

const Movie= mongoose.model("Movie", MovieSchema);

module.exports = Movie;
