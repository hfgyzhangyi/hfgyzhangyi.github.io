const express=require("express");
const bodyParser=require("body-parser");
const listRouter=require("./router/list.js");
const cookieParser=require("cookie-parser");
//const session=require("express-session");
//const cookieSession=require("cookie-session");
//const demoRouter=require("./router/demo.js");
var server=express();
server.listen(3000);
server.set('views',__dirname+"/views");
server.set("view engine",'ejs');
server.use(express.static(__dirname+"/public"));
server.use(bodyParser.urlencoded({
	extended:false
}));
server.use(cookieParser());
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
//server.use("/user",demoRouter);