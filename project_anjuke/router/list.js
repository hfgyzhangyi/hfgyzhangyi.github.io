const express=require("express");
var router=express.Router();
router.get("/",(req,res)=>{
    //res.redirect('http://localhost:3000/list.html');
    //res.render('list',{start:"aaa"});
    res.render('list');
});
module.exports=router;