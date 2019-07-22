const express=require("express");
const bodyParser=require("body-parser");
//const demoRouter=require("./router/demo.js");
var server=express();
server.listen(3000);
server.use(express.static(__dirname+"/public"));
server.use(bodyParser.urlencoded({
	extended:false
}));
//server.use("/user",demoRouter);