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
router.post("/",(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    var sql="select * from user where username=? and password=? and type=?";
    pool.query(sql,[username,password,1],(err,result)=>{
        if(result==""){
            res.send("err");
        }else{
            req.session.username=username;
            res.send("ok");
        }
    });
});
module.exports=router;