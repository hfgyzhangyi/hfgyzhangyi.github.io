const express=require("express");
const bodyParser=require("body-parser");
const listRouter=require("./router/list.js");
const viewRouter=require("./router/view.js");
const loginRouter=require("./router/login.js");
const indexRouter=require("./router/index.js");
const backstageRouter=require("./router/backstage.js");
const cookieParser=require("cookie-parser");
//const session=require("express-session");
//const cookieSession=require("cookie-session");
//const demoRouter=require("./router/demo.js");
var session=require("express-session");
var server=express();
server.listen(3000);
server.set('views',__dirname+"/views");
server.set("view engine",'ejs');
server.use(express.static(__dirname+"/public"));
server.use(bodyParser.urlencoded({
	extended:false
}));
server.use(cookieParser());
server.use(session({
    secret:'test secret',
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:60*1000*30}
}));
// server.use(cookieSession({
// 	keys:['aaa','bbb','ccc'],
// 	maxAge:60*60,
// 	name:'session'
// }));
// server.use(session({
// 	resave:true,
// 	saveUninitialized:true,
// 	secret:'sessionTest',
// 	cookie:{
// 		maxAge:1000*60*60*24,
// 		secure:false
// 	}
// }));
server.use("/list",listRouter);
server.use("/view",viewRouter);
server.use("/login",loginRouter);
server.use("/index",indexRouter);
server.use("/backstage",backstageRouter);
//server.use("/user",demoRouter);