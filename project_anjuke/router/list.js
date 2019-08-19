const pool=require("../pool.js");
const express=require("express");
var router=express.Router();
const session=require("express-session");
router.use(session({
    secret:'test secret',
    cookie:{maxAge:60*1000*30}
}));
const district_list=[
    {href:"http://localhost:3000/list/detail?district=",text:"全部"},
    {href:"http://localhost:3000/list/detail?district=浦东",text:"浦东"},
    {href:"http://localhost:3000/list/detail?district=闵行",text:"闵行"},
    {href:"http://localhost:3000/list/detail?district=宝山",text:"宝山"},
    {href:"http://localhost:3000/list/detail?district=徐汇",text:"徐汇"},
    {href:"javascript:;",text:"松江"},
    {href:"javascript:;",text:"嘉定"},
    {href:"javascript:;",text:"静安"},
    {href:"javascript:;",text:"普陀"},
    {href:"javascript:;",text:"杨浦"},
    {href:"javascript:;",text:"虹口"},
    {href:"javascript:;",text:"长宁"},
    {href:"javascript:;",text:"黄浦"},
    {href:"javascript:;",text:"青浦"},
    {href:"javascript:;",text:"奉贤"},
    {href:"javascript:;",text:"金山"},
    {href:"javascript:;",text:"崇明"},
    {href:"javascript:;",text:"上海周边"}
];
const price_list=[
    {href:"http://localhost:3000/list/detail?from_price=&to_price=",text:"全部"},
    {href:"http://localhost:3000/list/detail?from_price=&to_price=100",text:"100万以下"},
    {href:"http://localhost:3000/list/detail?from_price=100&to_price=150",text:"100-150万"},
    {href:"http://localhost:3000/list/detail?from_price=150&to_price=200",text:"150-200万"},
    {href:"http://localhost:3000/list/detail?from_price=200&to_price=250",text:"200-250万"},
    {href:"http://localhost:3000/list/detail?from_price=250&to_price=300",text:"250-300万"},
    {href:"http://localhost:3000/list/detail?from_price=300&to_price=400",text:"300-400万"},
    {href:"http://localhost:3000/list/detail?from_price=400&to_price=500",text:"400-500万"},
    {href:"http://localhost:3000/list/detail?from_price=500&to_price=700",text:"500-700万"},
    {href:"http://localhost:3000/list/detail?from_price=700&to_price=1000",text:"700-1000万"},
    {href:"http://localhost:3000/list/detail?from_price=1000&to_price=1500",text:"1000-1500万"},
    {href:"http://localhost:3000/list/detail?from_price=1500&to_price=2000",text:"1500-2000万"},
    {href:"http://localhost:3000/list/detail?from_price=2000&to_price=",text:"2000万以上"}
];
const area_list=[
    {href:"http://localhost:3000/list/detail?from_area=&to_area=",text:"全部"},
    {href:"http://localhost:3000/list/detail?from_area=&to_area=50",text:"50m²以下"},
    {href:"http://localhost:3000/list/detail?from_area=50&to_area=70",text:"50-70m²"},
    {href:"http://localhost:3000/list/detail?from_area=70&to_area=90",text:"70-90m²"},
    {href:"http://localhost:3000/list/detail?from_area=90&to_area=110",text:"90-110m²"},
    {href:"http://localhost:3000/list/detail?from_area=110&to_area=130",text:"110-130m²"},
    {href:"http://localhost:3000/list/detail?from_area=130&to_area=150",text:"130-150m²"},
    {href:"http://localhost:3000/list/detail?from_area=150&to_area=200",text:"150-200m²"},
    {href:"http://localhost:3000/list/detail?from_area=200&to_area=300",text:"200-300m²"},
    {href:"http://localhost:3000/list/detail?from_area=300&to_area=",text:"300m²以上"}
];
const layout_list=[
    {href:"http://localhost:3000/list/detail?layout=",text:"全部"},
    {href:"http://localhost:3000/list/detail?layout=1室1厅",text:"一室"},
    {href:"http://localhost:3000/list/detail?layout=2室1厅",text:"二室"},
    {href:"http://localhost:3000/list/detail?layout=3室1厅",text:"三室"},
    {href:"http://localhost:3000/list/detail?layout=4室1厅",text:"四室"},
    {href:"http://localhost:3000/list/detail?layout=5室1厅",text:"五室"},
    {href:"http://localhost:3000/list/detail?layout=5室1厅以上",text:"五室以上"}
];
const floor_list=[
    {href:"http://localhost:3000/list/detail?floor=",text:"全部"},
    {href:"http://localhost:3000/list/detail?floor=中层(共6层)",text:"6层以下"},
    {href:"http://localhost:3000/list/detail?floor=中高层(共12层)",text:"6-12层"},
    {href:"http://localhost:3000/list/detail?floor=高层(12层以上)",text:"12层以上"}
];
router.get("/",(req,res)=>{
    //res.redirect('http://localhost:3000/list.html');
    //res.render('list',{start:"aaa"});
    //var items=[1,2,3,4,5];
    //res.render('list',{items:items});
    //销毁session:req.session.destroy();
    req.session.layout=null;
    req.session.fromArea=null;
    req.session.toArea=null;
    req.session.floor=null;
    req.session.fromPrice=null;
    req.session.toPrice=null;
    req.session.district=null;
    req.session.customizeArea=null;
    req.session.customizePrice=null;
    var pageNow=parseInt(req.query.pageNow);
    var pageSize=60;
    var totalPage=0;
    var sql1="select * from ershoufang_list limit "+(pageNow-1)*60+","+pageSize;
    var sql2="select count(*) as count from ershoufang_list";
    pool.query(sql2,null,(err,result)=>{
        totalPage=Math.ceil(result[0].count/60);
        pool.query(sql1,null,(err,result)=>{
            //console.log(result);
            //console.log(result.length);
            //if(pageNow<=4){
            if(totalPage>7)
                res.render('list',{pagingNumber:[1,2,3,4,5,6,7],items:result,lEllipsis:false,rEllipsis:true,pageNow:pageNow,totalPage:totalPage,
                    district_list:district_list,district_selected:"全部",
                    price_list:price_list,price_selected:"全部",price_from:0,price_to:0,
                    area_list:area_list,area_selected:"全部",area_from:0,area_to:0,
                    layout_list:layout_list,layout_selected:"全部",
                    floor_list:floor_list,floor_selected:"全部"
                });
            else{
                var pagingNumber=[];
                for(var i=0;i<totalPage;i++)
                    pagingNumber[i]=i+1;
                res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage,
                    district_list:district_list,district_selected:"全部",
                    price_list:price_list,price_selected:"全部",price_from:0,price_to:0,
                    area_list:area_list,area_selected:"全部",area_from:0,area_to:0,
                    layout_list:layout_list,layout_selected:"全部",
                    floor_list:floor_list,floor_selected:"全部"
                });
            }
            /*}else if(pageNow==5){
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
                for(var i=pageNow-3,j=0;i<=pageNow+3;i++,j++)
                    pagingNumber[j]=i;
                res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:true,rEllipsis:true,pageNow:pageNow,totalPage:totalPage});
            }else{
                if(totalPage<=8){
                    var pagingNumber=[];
                    for(var i=1,j=0;i<=totalPage;i++,j++)
                        pagingNumber[j]=i;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage});
                }else{
                    var pagingNumber=[];
                    for(var i=totalPage-6,j=0;i<=totalPage;i++,j++)
                        pagingNumber[j]=i;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:true,rEllipsis:false,pageNow:pageNow,totalPage:totalPage});
                }
            }*/
        });
    });
});
router.get("/detail",(req,res)=>{
    var sql1="select * from ershoufang_list";
    var sql2="select count(*) as count from ershoufang_list";
    //房型
    var layout=req.session.layout;
    var q_layout=req.query.layout;
    if(q_layout!=undefined){
        req.session.layout=q_layout;
        if(q_layout==""){
            sql2+=" where 1=1";
            sql1+=" where 1=1";
        }else{
            sql2+=" where layout='"+q_layout+"'";
            sql1+=" where layout='"+q_layout+"'";
        }
    }else if(layout!=undefined){
        if(layout==""){
            sql2+=" where 1=1";
            sql1+=" where 1=1";
        }else{
            sql2+=" where layout='"+layout+"'";
            sql1+=" where layout='"+layout+"'";
        }
    }else{
        sql2+=" where 1=1";
        sql1+=" where 1=1";
    }
    //面积
    var fromArea=req.session.fromArea;
    var toArea=req.session.toArea;
    var q_fromArea=req.query.from_area;
    var q_toArea=req.query.to_area;
    //var q_customize_area=req.query.customize_area;
    //console.log(q_customize_area=="true");✔
    //console.log(q_fromArea==undefined);✔
    //console.log(q_customize_area==undefined);
    //console.log(q_customize_area);
    if(q_fromArea!=undefined&&q_toArea!=undefined){
        req.session.fromArea=q_fromArea;
        req.session.toArea=q_toArea;
        //if(q_customize_area==undefined){
        req.session.customizeArea="false";
        //}else{
        //    res.cookie.customizeArea="true";
        //}
        if(q_fromArea==""){
            if(q_toArea!=""){
                sql2+=" and area<="+q_toArea;
                sql1+=" and area<="+q_toArea;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else if(q_toArea==""){
            if(q_fromArea!=""){
                sql2+=" and area>="+q_fromArea;
                sql1+=" and area>="+q_fromArea;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else{
            sql2+=" and area between "+q_fromArea+" and "+q_toArea;
            sql1+=" and area between "+q_fromArea+" and "+q_toArea;
        }
    }else if(fromArea!=null&&toArea!=null){
        if(fromArea==""){
            if(toArea!=""){
                sql2+=" and area<="+toArea;
                sql1+=" and area<="+toArea;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else if(toArea==""){
            if(fromArea!=""){
                sql2+=" and area>="+fromArea;
                sql1+=" and area>="+fromArea;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else{
            sql2+=" and area between "+fromArea+" and "+toArea;
            sql1+=" and area between "+fromArea+" and "+toArea;
        }
    }else{
        sql2+=" and 1=1";
        sql1+=" and 1=1";
    }
    //楼层
    var floor=req.session.floor;
    var q_floor=req.query.floor;
    if(q_floor!=undefined){
        req.session.floor=q_floor;
        if(q_floor==""){
            sql2+=" and 1=1";
            sql1+=" and 1=1";
        }else{
            sql2+=" and floor='"+q_floor+"'";
            sql1+=" and floor='"+q_floor+"'";
        }
    }else if(floor!=undefined){
        if(floor==""){
            sql2+=" and 1=1";
            sql1+=" and 1=1";
        }else{
            sql2+=" and floor='"+floor+"'";
            sql1+=" and floor='"+floor+"'";
        }
    }else{
        sql2+=" and 1=1";
        sql1+=" and 1=1";
    }
    //售价
    var fromPrice=req.session.fromPrice;
    var toPrice=req.session.toPrice;
    var q_fromPrice=req.query.from_price;
    var q_toPrice=req.query.to_price;
    //var q_customize_price=req.query.customize_price;
    //console.log(q_fromPrice==undefined);✔
    //console.log(q_fromPrice==null);✔
    //console.log(q_fromPrice=="");✖
    //console.log(fromPrice==null);✔
    //console.log(q_fromPrice=="");不填✔
    //console.log(q_customize_price);
    //console.log(q_fromPrice);
    if(q_fromPrice!=undefined&&q_toPrice!=undefined){
        req.session.fromPrice=q_fromPrice;
        req.session.toPrice=q_toPrice;
        //if(q_customize_price==undefined){
        req.session.customizePrice="false";
        //}else{
        //    res.cookie.customizePrice="true";
        //}
        if(q_fromPrice==""){
            if(q_toPrice!=""){
                sql2+=" and total_price<="+q_toPrice;
                sql1+=" and total_price<="+q_toPrice;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else if(q_toPrice==""){
            if(q_fromPrice!=""){
                sql2+=" and total_price>="+q_fromPrice;
                sql1+=" and total_price>="+q_fromPrice;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else{
            sql2+=" and total_price between "+q_fromPrice+" and "+q_toPrice;
            sql1+=" and total_price between "+q_fromPrice+" and "+q_toPrice;
        }
    }else if(fromPrice!=null&&toPrice!=null){
        if(fromPrice==""){
            if(toPrice!=""){
                sql2+=" and total_price<="+toPrice;
                sql1+=" and total_price<="+toPrice;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else if(toPrice==""){
            if(fromPrice!=""){
                sql2+=" and total_price>="+fromPrice;
                sql1+=" and total_price>="+fromPrice;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else{
            sql2+=" and total_price between "+fromPrice+" and "+toPrice;
            sql1+=" and total_price between "+fromPrice+" and "+toPrice;
        }
    }else{
        sql2+=" and 1=1";
        sql1+=" and 1=1";
    }
    //区域
    //var district=res.cookie.district;
    var district=req.session.district;
    var q_district=req.query.district;
    //console.log(q_district=="");全部✔
    if(q_district!=undefined){
        //res.cookie.district=q_district;
        req.session.district=q_district;
        if(q_district==""){
            sql2+=" and 1=1";
            sql1+=" and 1=1";
        }else{
            sql2+=" and district='"+q_district+"'";
            sql1+=" and district='"+q_district+"'";
        }
    }else if(district!=undefined){
        if(district==""){
            sql2+=" and 1=1";
            sql1+=" and 1=1";
        }else{
            sql2+=" and district='"+district+"'";
            sql1+=" and district='"+district+"'";
        }
    }else{
        sql2+=" and 1=1";
        sql1+=" and 1=1";
    }
    var pageNow=req.query.pageNow;
    if(pageNow==undefined){
        pageNow=1;
    }else{
        pageNow=parseInt(pageNow);
    }
    var pageSize=60;
    var totalPage=0;
    sql1+=" limit "+(pageNow-1)*60+","+pageSize;
    //res.clearCookie("district");
    //console.log(sql2);
    //console.log(sql1);
    //var sql1="select * from ershoufang_list limit "+(pageNow-1)*60+","+pageSize;
    //var sql2="select count(*) as count from ershoufang_list";
    //console.log(district_list);
    //console.log(layout);
    //console.log(floor);
    //console.log(district);
    pool.query(sql2,null,(err,result)=>{
        totalPage=Math.ceil(result[0].count/60);
        //console.log(totalPage);
        pool.query(sql1,null,(err,result)=>{
            // var cookie_layout=res.cookie.layout;
            // var cookie_fromArea=res.cookie.fromArea;
            // var cookie_toArea=res.cookie.toArea;
            // var cookie_floor=res.cookie.floor;
            // var cookie_fromPrice=res.cookie.fromPrice;
            // var cookie_toPrice=res.cookie.toPrice;
            // var cookie_district=res.cookie.district;
            var session_layout=req.session.layout;
            var session_fromArea=req.session.fromArea;
            var session_toArea=req.session.toArea;
            var session_floor=req.session.floor;
            var session_fromPrice=req.session.fromPrice;
            var session_toPrice=req.session.toPrice;
            var session_district=req.session.district;
            var price_selected="";
            var area_selected="";
            var district_selected="";
            var floor_selected="";
            var layout_selected="";
            if(session_layout==""||session_layout==undefined){
                layout_selected="全部";
            }else if(session_layout=="1室1厅"){
                layout_selected="一室";
            }else if(session_layout=="2室1厅"){
                layout_selected="二室";
            }else if(session_layout=="3室1厅"){
                layout_selected="三室";
            }else if(session_layout=="4室1厅"){
                layout_selected="四室";
            }else if(session_layout=="5室1厅"){
                layout_selected="五室";
            }else if(session_layout=="5室1厅以上"){
                layout_selected="五室以上";
            }
            if(session_floor==""||session_floor==undefined){
                floor_selected="全部";
            }else if(session_floor=="中层(共6层)"){
                floor_selected="6层以下";
            }else if(session_floor=="中高层(共12层)"){
                floor_selected="6-12层";
            }else if(session_floor=="高层(12层以上)"){
                floor_selected="12层以上";
            }
            if(session_district==""||session_district==undefined){
                district_selected="全部";
            }else{
                district_selected=session_district;
            }
            if(req.session.customizeArea=="true"){
                area_selected="其他";
            }else{
                if(session_fromArea==""&&session_toArea==""||session_fromArea==undefined&&session_toArea==undefined){
                    area_selected="全部";
                }else if(session_fromArea==""){
                    area_selected=session_toArea+"m²以下";
                }else if(session_toArea==""){
                    area_selected=session_fromArea+"m²以上";
                }else{
                    area_selected=session_fromArea+"-"+session_toArea+"m²";
                }
            }
            if(req.session.customizePrice=="true"){
                price_selected="其他";
            }else{
                if(session_fromPrice==""&&session_toPrice==""||session_fromPrice==undefined&&session_toPrice==undefined){
                    price_selected="全部";
                }else if(session_fromPrice==""){
                    price_selected=session_toPrice+"万以下";
                }else if(session_toPrice==""){
                    price_selected=session_fromPrice+"万以上";
                }else{
                    price_selected=session_fromPrice+"-"+session_toPrice+"万";
                }
            }
            if(pageNow<=4){
                if(totalPage>7){
                    res.render('list',{pagingNumber:[1,2,3,4,5,6,7],items:result,lEllipsis:false,rEllipsis:true,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
                else{
                    var pagingNumber=[];
                    for(var i=0;i<totalPage;i++)
                        pagingNumber[i]=i+1;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
            }else if(pageNow==5){
                if(totalPage>8){
                    res.render('list',{pagingNumber:[1,2,3,4,5,6,7,8],items:result,lEllipsis:false,rEllipsis:true,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
                else{
                    var pagingNumber=[];
                    for(var i=0;i<totalPage;i++)
                    pagingNumber[i]=i+1;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
            }else if(totalPage-pageNow>3){
                var pagingNumber=[];
                for(var i=pageNow-3,j=0;i<=pageNow+3;i++,j++)
                    pagingNumber[j]=i;
                res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:true,rEllipsis:true,pageNow:pageNow,totalPage:totalPage,
                    district_list:district_list,district_selected:district_selected,
                    price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                    area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                    layout_list:layout_list,layout_selected:layout_selected,
                    floor_list:floor_list,floor_selected:floor_selected
                });
            }else{
                if(totalPage<=8){
                    var pagingNumber=[];
                    for(var i=1,j=0;i<=totalPage;i++,j++)
                        pagingNumber[j]=i;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }else{
                    var pagingNumber=[];
                    for(var i=totalPage-6,j=0;i<=totalPage;i++,j++)
                        pagingNumber[j]=i;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:true,rEllipsis:false,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
            }
        });
    });
});
router.post("/detail",(req,res)=>{
    var sql1="select * from ershoufang_list";
    var sql2="select count(*) as count from ershoufang_list";
    //房型
    var layout=req.session.layout;
    //var q_layout=req.query.layout;
    // if(q_layout!=undefined){
    //     res.cookie.layout=q_layout;
    //     if(q_layout==""){
    //         sql2+=" where 1=1";
    //         sql1+=" where 1=1";
    //     }else{
    //         sql2+=" where layout='"+q_layout+"'";
    //         sql1+=" where layout='"+q_layout+"'";
    //     }
    // }else 
    if(layout!=undefined){
        if(layout==""){
            sql2+=" where 1=1";
            sql1+=" where 1=1";
        }else{
            sql2+=" where layout='"+layout+"'";
            sql1+=" where layout='"+layout+"'";
        }
    }else{
        sql2+=" where 1=1";
        sql1+=" where 1=1";
    }
    //面积
    var fromArea=req.session.fromArea;
    var toArea=req.session.toArea;
    var q_fromArea=req.body.from_area;
    var q_toArea=req.body.to_area;
    if(q_fromArea!=undefined&&q_toArea!=undefined){
        req.session.fromArea=q_fromArea;
        req.session.toArea=q_toArea;
        //if(q_customize_area==undefined){
        //    res.cookie.customizeArea="false";
        //}else{
        req.session.customizeArea="true";
        //}
        if(q_fromArea==""){
            if(q_toArea!=""){
                sql2+=" and area<="+q_toArea;
                sql1+=" and area<="+q_toArea;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else if(q_toArea==""){
            if(q_fromArea!=""){
                sql2+=" and area>="+q_fromArea;
                sql1+=" and area>="+q_fromArea;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else{
            sql2+=" and area between "+q_fromArea+" and "+q_toArea;
            sql1+=" and area between "+q_fromArea+" and "+q_toArea;
        }
    }else if(fromArea!=null&&toArea!=null){
        if(fromArea==""){
            if(toArea!=""){
                sql2+=" and area<="+toArea;
                sql1+=" and area<="+toArea;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else if(toArea==""){
            if(fromArea!=""){
                sql2+=" and area>="+fromArea;
                sql1+=" and area>="+fromArea;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else{
            sql2+=" and area between "+fromArea+" and "+toArea;
            sql1+=" and area between "+fromArea+" and "+toArea;
        }
    }else{
        sql2+=" and 1=1";
        sql1+=" and 1=1";
    }
    //楼层
    var floor=req.session.floor;
    //var q_floor=req.query.floor;
    // if(q_floor!=undefined){
    //     res.cookie.floor=q_floor;
    //     if(q_floor==""){
    //         sql2+=" and 1=1";
    //         sql1+=" and 1=1";
    //     }else{
    //         sql2+=" and floor='"+q_floor+"'";
    //         sql1+=" and floor='"+q_floor+"'";
    //     }
    // }else
    if(floor!=undefined){
        if(floor==""){
            sql2+=" and 1=1";
            sql1+=" and 1=1";
        }else{
            sql2+=" and floor='"+floor+"'";
            sql1+=" and floor='"+floor+"'";
        }
    }else{
        sql2+=" and 1=1";
        sql1+=" and 1=1";
    }
    //售价
    var fromPrice=req.session.fromPrice;
    var toPrice=req.session.toPrice;
    var q_fromPrice=req.body.from_price;
    var q_toPrice=req.body.to_price;
    //console.log(req.body.from_price);
    //console.log(req.body.to_price);
    if(q_fromPrice!=undefined&&q_toPrice!=undefined){
        req.session.fromPrice=q_fromPrice;
        req.session.toPrice=q_toPrice;
        //if(q_customize_price==undefined){
        //    res.cookie.customizePrice="false";
        //}else{
        req.session.customizePrice="true";
        //}
        if(q_fromPrice==""){
            if(q_toPrice!=""){
                sql2+=" and total_price<="+q_toPrice;
                sql1+=" and total_price<="+q_toPrice;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else if(q_toPrice==""){
            if(q_fromPrice!=""){
                sql2+=" and total_price>="+q_fromPrice;
                sql1+=" and total_price>="+q_fromPrice;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else{
            sql2+=" and total_price between "+q_fromPrice+" and "+q_toPrice;
            sql1+=" and total_price between "+q_fromPrice+" and "+q_toPrice;
        }
    }else if(fromPrice!=null&&toPrice!=null){
        if(fromPrice==""){
            if(toPrice!=""){
                sql2+=" and total_price<="+toPrice;
                sql1+=" and total_price<="+toPrice;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else if(toPrice==""){
            if(fromPrice!=""){
                sql2+=" and total_price>="+fromPrice;
                sql1+=" and total_price>="+fromPrice;
            }else{
                sql2+=" and 1=1";
                sql1+=" and 1=1";
            }
        }else{
            sql2+=" and total_price between "+fromPrice+" and "+toPrice;
            sql1+=" and total_price between "+fromPrice+" and "+toPrice;
        }
    }else{
        sql2+=" and 1=1";
        sql1+=" and 1=1";
    }
    //区域
    var district=req.session.district;
    //var q_district=req.query.district;
    //console.log(q_district=="");全部✔
    // if(q_district!=undefined){
    //     res.cookie.district=q_district;
    //     if(q_district==""){
    //         sql2+=" and 1=1";
    //         sql1+=" and 1=1";
    //     }else{
    //         sql2+=" and district='"+q_district+"'";
    //         sql1+=" and district='"+q_district+"'";
    //     }
    // }else
    if(district!=undefined){
        if(district==""){
            sql2+=" and 1=1";
            sql1+=" and 1=1";
        }else{
            sql2+=" and district='"+district+"'";
            sql1+=" and district='"+district+"'";
        }
    }else{
        sql2+=" and 1=1";
        sql1+=" and 1=1";
    }
    var pageNow=req.query.pageNow;
    if(pageNow==undefined){
        pageNow=1;
    }else{
        pageNow=parseInt(pageNow);
    }
    var pageSize=60;
    var totalPage=0;
    sql1+=" limit "+(pageNow-1)*60+","+pageSize;
    pool.query(sql2,null,(err,result)=>{
        totalPage=Math.ceil(result[0].count/60);
        //console.log(totalPage);
        pool.query(sql1,null,(err,result)=>{
            var session_layout=req.session.layout;
            var session_fromArea=req.session.fromArea;
            var session_toArea=req.session.toArea;
            var session_floor=req.session.floor;
            var session_fromPrice=req.session.fromPrice;
            var session_toPrice=req.session.toPrice;
            var session_district=req.session.district;
            var price_selected="";
            var area_selected="";
            var district_selected="";
            var floor_selected="";
            var layout_selected="";
            if(session_layout==""||session_layout==undefined){
                layout_selected="全部";
            }else if(session_layout=="1室1厅"){
                layout_selected="一室";
            }else if(session_layout=="2室1厅"){
                layout_selected="二室";
            }else if(session_layout=="3室1厅"){
                layout_selected="三室";
            }else if(session_layout=="4室1厅"){
                layout_selected="四室";
            }else if(session_layout=="5室1厅"){
                layout_selected="五室";
            }else if(session_layout=="5室1厅以上"){
                layout_selected="五室以上";
            }
            if(session_floor==""||session_floor==undefined){
                floor_selected="全部";
            }else if(session_floor=="中层(共6层)"){
                floor_selected="6层以下";
            }else if(session_floor=="中高层(共12层)"){
                floor_selected="6-12层";
            }else if(session_floor=="高层(12层以上)"){
                floor_selected="12层以上";
            }
            if(session_district==""||session_district==undefined){
                district_selected="全部";
            }else{
                district_selected=session_district;
            }
            if(req.session.customizeArea=="true"){
                area_selected="其他";
            }else{
                if(session_fromArea==""&&session_toArea==""||session_fromArea==undefined&&session_toArea==undefined){
                    area_selected="全部";
                }else if(session_fromArea==""){
                    area_selected=session_toArea+"m²以下";
                }else if(session_toArea==""){
                    area_selected=session_fromArea+"m²以上";
                }else{
                    area_selected=session_fromArea+"-"+session_toArea+"m²";
                }
            }
            if(req.session.customizePrice=="true"){
                price_selected="其他";
            }else{
                if(session_fromPrice==""&&session_toPrice==""||session_fromPrice==undefined&&session_toPrice==undefined){
                    price_selected="全部";
                }else if(session_fromPrice==""){
                    price_selected=session_toPrice+"万以下";
                }else if(session_toPrice==""){
                    price_selected=session_fromPrice+"万以上";
                }else{
                    price_selected=session_fromPrice+"-"+session_toPrice+"万";
                }
            }
            if(pageNow<=4){
                if(totalPage>7){
                    res.render('list',{pagingNumber:[1,2,3,4,5,6,7],items:result,lEllipsis:false,rEllipsis:true,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
                else{
                    var pagingNumber=[];
                    for(var i=0;i<totalPage;i++)
                        pagingNumber[i]=i+1;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
            }else if(pageNow==5){
                if(totalPage>8){
                    res.render('list',{pagingNumber:[1,2,3,4,5,6,7,8],items:result,lEllipsis:false,rEllipsis:true,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
                else{
                    var pagingNumber=[];
                    for(var i=0;i<totalPage;i++)
                    pagingNumber[i]=i+1;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
            }else if(totalPage-pageNow>3){
                var pagingNumber=[];
                for(var i=pageNow-3,j=0;i<=pageNow+3;i++,j++)
                    pagingNumber[j]=i;
                res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:true,rEllipsis:true,pageNow:pageNow,totalPage:totalPage,
                    district_list:district_list,district_selected:district_selected,
                    price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                    area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                    layout_list:layout_list,layout_selected:layout_selected,
                    floor_list:floor_list,floor_selected:floor_selected
                });
            }else{
                if(totalPage<=8){
                    var pagingNumber=[];
                    for(var i=1,j=0;i<=totalPage;i++,j++)
                        pagingNumber[j]=i;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:false,rEllipsis:false,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }else{
                    var pagingNumber=[];
                    for(var i=totalPage-6,j=0;i<=totalPage;i++,j++)
                        pagingNumber[j]=i;
                    res.render('list',{pagingNumber:pagingNumber,items:result,lEllipsis:true,rEllipsis:false,pageNow:pageNow,totalPage:totalPage,
                        district_list:district_list,district_selected:district_selected,
                        price_list:price_list,price_selected:price_selected,price_from:session_fromPrice,price_to:session_toPrice,
                        area_list:area_list,area_selected:area_selected,area_from:session_fromArea,area_to:session_toArea,
                        layout_list:layout_list,layout_selected:layout_selected,
                        floor_list:floor_list,floor_selected:floor_selected
                    });
                }
            }
        });
    });
});
module.exports=router;