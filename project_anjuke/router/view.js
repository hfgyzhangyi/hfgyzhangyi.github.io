const pool=require("../pool.js");
const express=require("express");
var router=express.Router();
router.get("/",(req,res)=>{
    var id=req.query.id;
    var sql=`select title,layout,area,floor,time,estate_name,address,total_price,
    univalence,district,trade_area,short_address from ershoufang_list where id=?`;
    pool.query(sql,[id],(err,result)=>{
        res.render("view",{item:result[0],id:id,username:req.session.username});
    });
});
router.get("/logout",(req,res)=>{
    req.session.username=null;
    var id=req.query.id;
    var sql=`select title,layout,area,floor,time,estate_name,address,total_price,
    univalence,district,trade_area,short_address from ershoufang_list where id=?`;
    pool.query(sql,[id],(err,result)=>{
        res.render("view",{item:result[0],id:id,username:req.session.username});
    });
});
module.exports=router;