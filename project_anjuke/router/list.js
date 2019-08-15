const pool=require("../pool.js");
const express=require("express");
var router=express.Router();
router.get("/",(req,res)=>{
    //res.redirect('http://localhost:3000/list.html');
    //res.render('list',{start:"aaa"});
    //var items=[1,2,3,4,5];
    //res.render('list',{items:items});
    var pageNow=req.query.pageNow;
    var pageSize=60;
    var totalPage=0;
    var sql1="select * from ershoufang_list limit "+(pageNow-1)*60+","+pageSize;
    var sql2="select count(*) as count from ershoufang_list";
    pool.query(sql2,null,(err,result)=>{
        totalPage=Math.ceil(result[0].count/60);
    });
    pool.query(sql1,null,(err,result)=>{
        //console.log(result);
        //console.log(result.length);
        if(pageNow<=4){
            if(totalPage>7)
                res.render('list',{pagingNumber:[1,2,3,4,5,6,7],items:result,lEllipsis:false,rEllipsis:true,pageNow:pageNow,totalPage:totalPage});
            else{
                var pagingNumber=[];
                for(var i=0;i<totalPage;i++)
                    pagingNumber[i]=i+1;
                res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage});
            }
        }else if(pageNow==5){
            if(totalPage>8)
                res.render('list',{pagingNumber:[1,2,3,4,5,6,7,8],items:result,lEllipsis:false,rEllipsis:true,pageNow:pageNow,totalPage:totalPage});
            else{
                var pagingNumber=[];
                for(var i=0;i<totalPage;i++)
                   pagingNumber[i]=i+1;
                res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage});
            }
        }else if(totalPage-pageNow>3){
            var pagingNumber=[];
            for(var i=pageNow-3;i<=pageNow+3;i++)
                pagingNumber[i]=i;
            res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:true,rEllipsis:true,pageNow:pageNow,totalPage:totalPage});
        }else{
            if(totalPage<=8){
                var pagingNumber=[];
                for(var i=1;i<=totalPage;i++)
                    pagingNumber[i]=i;
                res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage});
            }else{
                var pagingNumber=[];
                for(var i=totalPage-6;i<=totalPage;i++)
                    pagingNumber[i]=i;
                res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:true,rEllipsis:false,pageNow:pageNow,totalPage:totalPage});
            }
        }
    });
});
module.exports=router;