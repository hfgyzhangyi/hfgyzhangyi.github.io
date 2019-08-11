const express=require("express");
const bodyParser=require("body-parser");
const listRouter=require("./router/list.js");
//const demoRouter=require("./router/demo.js");
var server=express();
server.listen(3000);
server.set('views',__dirname+"/views");
server.set("view engine",'ejs');
server.use(express.static(__dirname+"/public"));
server.use(bodyParser.urlencoded({
	extended:false
}));
server.use("/list",listRouter);
//server.use("/user",demoRouter);