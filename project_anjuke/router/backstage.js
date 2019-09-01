const pool=require("../pool.js");
const express=require("express");
const PAGESIZE=15;
var router=express.Router();
router.get("/",(req,res)=>{
    var backUsername=req.session.backUsername;
    if(backUsername==null){
        res.render("backstageLogin");
    }else{
        res.redirect("http://localhost:3000/backstage/list?pageNow=1");
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
router.post("/addAndModify",(req,res)=>{
    var sql1="insert into ershoufang_list(title,layout,area,floor,time,estate_name,address,total_price,univalence,district,trade_area,short_address,img_name) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var sql2="update ershoufang_list set title=?,layout=?,area=?,floor=?,time=?,estate_name=?,address=?,total_price=?,univalence=?,district=?,trade_area=?,short_address=? where id=?";
    var id=req.body.id;
    var title=req.body.title;
    var layout=req.body.layout==1?"1室1厅":req.body.layout==2?"2室1厅":req.body.layout==3?"3室1厅":req.body.layout==4?"4室1厅":req.body.layout==5?"5室1厅":"5室1厅以上";
    var area=req.body.area;
    var floor=req.body.floor==1?"中层(共6层)":req.body.floor==2?"中高层(共12层)":"高层(12层以上)";
    var time=req.body.time+"年建造";
    var estate_name=req.body.estate_name;
    var address=req.body.address;
    var total_price=req.body.total_price;
    var univalence=req.body.univalence;
    var district=req.body.district;
    var trade_area=req.body.trade_area;
    var short_address=req.body.short_address;
    var hidden_pageNow=req.body.hidden_pageNow;
    if(id==""){
        pool.query(sql1,[title,layout,area,floor,time,estate_name,address,total_price,univalence,district,trade_area,short_address,"list_pic_1.jpg"],(err,result)=>{
            res.redirect("http://localhost:3000/backstage/list?pageNow="+hidden_pageNow);
        });
    }else{
        pool.query(sql2,[title,layout,area,floor,time,estate_name,address,total_price,univalence,district,trade_area,short_address,id],(err,result)=>{
            res.redirect("http://localhost:3000/backstage/list?pageNow="+hidden_pageNow);
        });
    }
});
/*Ajax*/
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
    if(req.session.backUsername==null){
        res.render("backstageLogin");
    }else{
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
    }
});
module.exports=router;