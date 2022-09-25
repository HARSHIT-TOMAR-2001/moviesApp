let mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
     theaterId:{
        type:String,
        ref:"Thread" 
    },
    movieId:{
        type:String,
        ref:"Movie" 
    },
     showDate:Date,
     startTime:String,
     endTime:String,
     peopleBooked:{
        type:Number,
        default:0
     },
     peopleLimit:{
          type:Number,
          default:50
     },
});

const Show = mongoose.model("Show", ShowSchema);

module.exports = Show;
