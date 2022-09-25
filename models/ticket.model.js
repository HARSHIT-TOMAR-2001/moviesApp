let mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
     showId:{
     type:String,
     ref:"Show" 
    },
    customerName:String,
    gender:String,
    age:Number,
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
