let mongoose = require("mongoose");
const TheatreSchema = new mongoose.Schema({
     location:String,
     name:String
});

const Theatre = mongoose.model("Theatre", TheatreSchema);

module.exports = Theatre;
