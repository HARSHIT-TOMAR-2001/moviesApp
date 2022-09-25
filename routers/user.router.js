const { movieFilter, theatreFilter, bookTicket, ticketReschedule } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");

const userRouter=require("express").Router();

userRouter.get("/movie/filter",movieFilter);
userRouter.get('/theater/filter',theatreFilter);
userRouter.post('/create/booking',bookTicket);
userRouter.put('/reschedule/booking',ticketReschedule);

module.exports=userRouter