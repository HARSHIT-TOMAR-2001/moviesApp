require("dotenv").config();

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const Ticket = require("../models/ticket.model");
const Show = require("../models/show.model");

const addTheatre=async(req,res)=>{
    const {location,name}=req.body;
    try {
        const newTheatre=new Theatre({
            location,
            name
    })
      await newTheatre.save();
      res.status(200).send({success:true,theatre:newTheatre}) 
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}

const addMovie=async(req,res)=>{
    const {name}=req.body;
    try {
        const newMovie=new Movie({
            name
    })
      await newMovie.save();
      res.status(200).send({success:true,movie:newMovie}) 
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}

const addShow=async(req,res)=>{
    const {theaterId,movieId,showDate,startTime,endTime,peopleLimit}=req.body;
    try {
        const newShow=new Show({
            theaterId,
            movieId,
            showDate:new Date(showDate),
            startTime,
            endTime,
            peopleLimit
    })
      await newShow.save();
      res.status(200).send({success:true,show:newShow}) 
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}



module.exports={
   addTheatre,
   addMovie,
   addShow,
}