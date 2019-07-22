const express=require("express");
var router=express.Router();
router.get("/list",(req,res)=>{
	res.send("123321");
});
module.exports=router;