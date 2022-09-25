const adminRouter = require("./admin.router");
const userRouter = require("./user.router");


const Router = require("express").Router();

Router.use("/user",userRouter)
Router.use("/admin",adminRouter)

module.exports = Router;