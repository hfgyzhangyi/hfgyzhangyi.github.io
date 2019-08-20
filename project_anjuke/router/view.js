const pool=require("../pool.js");
const express=require("express");
var router=express.Router();
router.get("/",(req,res)=>{
    console.log(req.query.id);
    res.render("view");
});
module.exports=router;