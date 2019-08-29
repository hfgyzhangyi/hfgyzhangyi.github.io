const pool=require("../pool.js");
const express=require("express");
var router=express.Router();
const session=require("express-session");
router.use(session({
    secret:'test secret',
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:60*1000*30}
}));
router.get("/",(req,res)=>{
    res.render("index",{username:req.session.username});
});
router.get("/logout",(req,res)=>{
    req.session.username=null;
    res.render("index",{username:null});
});
module.exports=router;