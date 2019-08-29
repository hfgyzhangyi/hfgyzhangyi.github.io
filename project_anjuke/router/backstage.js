const pool=require("../pool.js");
const express=require("express");
var router=express.Router();
router.get("/",(req,res)=>{
    var backUsername=req.session.backUsername;
    if(backUsername==null){
        res.render("backstageLogin");
    }else{
        res.render("backstage");
    }
});
router.post("/check",(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    var sql="select * from user where username=? and password=? and type=?";
    pool.query(sql,[username,password,0],(err,result)=>{
        if(result==""){
            res.send("err");
        }else{
            req.session.backUsername=username;
            res.send("ok");
        }
    });
});
router.post("/list",(req,res)=>{
    //数据库取房源信息数据
    res.render("backstage");
});
module.exports=router;