require("dotenv").config();

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const Show = require("../models/show.model");
const Ticket = require("../models/ticket.model");

const movieFilter=async(req,res)=>{
    const {searchTerm}=req.body;
      try {
        let rg = new RegExp(searchTerm, "gmi");
        const movies = await Movie.find({name : { $regex :rg } }).sort({total : -1})
   

     res.status(200).send({success:true,count:movies.length,movies:movies});
      } catch (error) {
       res.status(400).send({success:false,msg:error.message})
      }
   }

const theatreFilter=async(req,res)=>{
    const {searchTerm}=req.body;
      try {
        let rg = new RegExp(searchTerm, "gmi");
        const theaters = await Theatre.find({location : { $regex :rg } }).sort({total : -1})
   
     res.status(200).send({success:true,count:theaters.length,theaters:theaters});
   
    } catch (error) {
       res.status(400).send({success:false,msg:error.message})
      }
   }


const bookTicket=async(req,res)=>{
    const {showId,customerName,gender,age}=req.body;
    try {

        const show=await Show.findById(showId);
        let TotalBookings=show.peopleBooked;
        if(TotalBookings+1<=show.peopleLimit){
        const newTicket=new Ticket({
            showId,
            customerName,
            gender,
            age
    })
      await newTicket.save();
      const updateShow=await Show.findByIdAndUpdate(showId,{
        peopleBooked:TotalBookings+1
      })
     return res.status(200).send({success:true,ticket:newTicket}) 
    }
    else{
        res.status(400).send({success:false,msg:"No slot available in this show"})
    }
      
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}

const ticketReschedule=async(req,res)=>{
    const {ticketId,newshowId}=req.body;
    try {

        const show=await Show.findById(newshowId);
        let TotalBookings=show.peopleBooked;
        if(TotalBookings+1<=show.peopleLimit){
        const prevTicket=await Ticket.findById(ticketId);
        const prevShow=await Show.findById(prevTicket.showId)
        let prevShowTotalBookings=prevShow.peopleBooked;
        let prevShowId=prevTicket.showId;
        const updatePrevShow=await Show.findByIdAndUpdate(prevShowId,{
            peopleBooked:prevShowTotalBookings-1
        })
        const newTicket=await Ticket.findByIdAndUpdate(ticketId,{showId:newshowId})
      
        const updateShow=await Show.findByIdAndUpdate(newshowId,{
            peopleBooked:TotalBookings+1
      })
     return res.status(200).send({success:true,ticket:newTicket}) 
    }
    else{
        res.status(400).send({success:false,msg:"can't be rescheduled,No slot available in this show"})
    }
      
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}




module.exports={
    movieFilter,
    theatreFilter,
    bookTicket,
    ticketReschedule
}