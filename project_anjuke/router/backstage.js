const pool=require("../pool.js");
const express=require("express");
const PAGESIZE=15;
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
    var sql1="select * from ershoufang_list limit ?,?";
    var sql2="select count(*) as count from ershoufang_list";
    var pageNow=req.body.page==null?1:parseInt(req.body.page);
    pool.query(sql2,(err,result)=>{
        var totalPage=Math.ceil(result[0].count/PAGESIZE);
        pool.query(sql1,[(pageNow-1)*PAGESIZE,PAGESIZE],(err,result)=>{
            res.render("backstage",{items:result,pageNow:pageNow,pageSize:PAGESIZE,totalPage:totalPage});
        });
    });
});
router.post("/select",(req,res)=>{
    var id=req.body.id;
    var sql="select * from ershoufang_list where id=?";
    pool.query(sql,[id],(err,result)=>{
        res.send(JSON.stringify(result[0]));
    });
});
router.get("/list",(req,res)=>{
    if(req.session.backUsername==null){
        res.render("backstageLogin");
    }else{
        var pageNow=req.query.pageNow==null?1:parseInt(req.query.pageNow);
        var sql1="select * from ershoufang_list limit ?,?";
        var sql2="select count(*) as count from ershoufang_list";
        pool.query(sql2,(err,result)=>{
            var totalPage=Math.ceil(result[0].count/PAGESIZE);
            pool.query(sql1,[(pageNow-1)*PAGESIZE,PAGESIZE],(err,result)=>{
                res.render("backstage",{items:result,pageNow:pageNow,pageSize:PAGESIZE,totalPage:totalPage});
            });
        });
    }
});
router.get("/delete",(req,res)=>{
    var id=req.query.id;
    var pageNow=req.query.pageNow;
    var sql1="select * from ershoufang_list limit ?,?";
    var sql2="select count(*) as count from ershoufang_list";
    var sql3="delete from ershoufang_list where id=?";
    pool.query(sql3,[id],(err,result)=>{
        pool.query(sql2,(err,result)=>{
            var totalPage=Math.ceil(result[0].count/PAGESIZE);
            if(totalPage<pageNow){
                pageNow=totalPage;
            }
            pool.query(sql1,[(pageNow-1)*PAGESIZE,PAGESIZE],(err,result)=>{
                res.render("backstage",{items:result,pageNow:pageNow,pageSize:PAGESIZE,totalPage:totalPage});
            });
        });
    });
});
module.exports=router;