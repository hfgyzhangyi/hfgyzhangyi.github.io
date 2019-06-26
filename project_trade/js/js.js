// JavaScript Document
(function(){
	"use strict"
	var adTop=document.getElementById("adTop");
	var adTopEm=adTop.getElementsByTagName("em")[0];
	var closeBtn=adTop.getElementsByTagName("i")[0];
	//广告倒计时
	function adClose(num){
		num--;
		if(num==9){
			adTopEm.innerHTML="九";
		}else if(num==8){
			adTopEm.innerHTML="八";
		}else if(num==7){
			adTopEm.innerHTML="七";
		}else if(num==6){
			adTopEm.innerHTML="六";
		}else if(num==5){
			adTopEm.innerHTML="五";
		}else if(num==4){
			adTopEm.innerHTML="四";
		}else if(num==3){
			adTopEm.innerHTML="三";
		}else if(num==2){
			adTopEm.innerHTML="二";
		}else if(num==1){
			adTopEm.innerHTML="一";
		}else if(num==0){
			adCloseDo(0);
			return;
		}
		return setTimeout(function(){adClose(num);},1000);
	}
	function adCloseDo(height){
		height+=4;
		if(height<=80){
			adTop.style.marginTop=-height+"px";
			return setTimeout(function(){adCloseDo(height);},20);
		}else{
			adTop.parentNode.removeChild(adTop);
		}
	}
	closeBtn.onclick=function(){
		adTop.parentNode.removeChild(adCloseDo(0));
	};
	adClose(11);
	/******************网站导航下拉菜单*********************/
	var loginRegWebNav=document.getElementById("loginReg_webNav");
	var loginRegWebNavSpan=loginRegWebNav.getElementsByTagName("span")[0];
	var loginRegWebNavUl=loginRegWebNav.getElementsByTagName("ul")[0];
	loginRegWebNav.onmouseover=function(){
		loginRegWebNavSpan.className="loginReg_webNav_cur";
		loginRegWebNavUl.style.display="";
	}
	loginRegWebNav.onmouseout=function(){
		loginRegWebNavSpan.className="";
		loginRegWebNavUl.style.display="none";
	}
	/******************弹出层全部城市菜单*********************/
	var areaMainNavLis=document.querySelectorAll(".area_main_nav>li");
	for(var areaMainNavLi of areaMainNavLis){
		areaMainNavLi.onclick=function(){
			var areaMainNavLi=this;
			var areaMainNavLiSelected=document.querySelector(".area_main_nav_select");
			areaMainNavLiSelected.className="";
			areaMainNavLi.className="area_main_nav_select";
		};
	}
	/******************关闭弹出层*********************/
	var areaAll=document.getElementsByClassName("area_all")[0];
	var areaMainClose=areaAll.getElementsByTagName("i")[0];
	areaMainClose.onclick=function(){
		areaAll.style.display="none";
	};
	/******************打开弹出层*********************/
	var logoTel=document.getElementsByClassName("logoTel")[0];
	var logoTelSpan=logoTel.getElementsByTagName("span")[0];
	logoTelSpan.onclick=function(){
		areaAll.style.display="block";
	};
})();