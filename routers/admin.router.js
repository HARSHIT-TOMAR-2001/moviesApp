
const { addTheatre, addMovie, addShow } = require("../controllers/admin.controller");
const verifyToken = require("../middlewares/auth");

const adminRouter=require("express").Router();

adminRouter.post("/add/theater",addTheatre);
adminRouter.post('/add/movie',addMovie);
adminRouter.post('/add/show',addShow);

module.exports=adminRouter