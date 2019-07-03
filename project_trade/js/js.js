// JavaScript Document
(function(){
	"use strict"
	/******************广告倒计时*********************/
	var adTop=document.getElementById("adTop");
	var adTopEm=adTop.getElementsByTagName("em")[0];
	var closeBtn=adTop.getElementsByTagName("i")[0];
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
	/******************打开,关闭弹出层*********************/
	var areaAll=document.getElementsByClassName("area_all")[0];
	var areaMainClose=areaAll.getElementsByTagName("i")[0];
	areaMainClose.onclick=function(){
		areaUp(0);
	};
	var logoTel=document.getElementsByClassName("logoTel")[0];
	var logoTelSpan=logoTel.getElementsByTagName("span")[0];
	logoTelSpan.onclick=function(){
		areaDown(0);
	};
	function areaUp(num){
		num+=5;
		if(num<=50){
			areaAll.style.marginTop=-num+"%";
			return setTimeout(function(){areaUp(num)},20);
		}else{
			areaAll.style.display="none";
		}
	}
	function areaDown(num){
		if(num==0){
			areaAll.style.display="block";
		}
		num+=5;
		if(num<=100){
			areaAll.style.marginTop=(-100+num)+"%";
			return setTimeout(function(){areaDown(num)},25);
		}
	}
	/******************选择城市*********************/
	var areaMainHotCities=document.getElementsByClassName("area_main_hotCities")[0];
	var areaMainHotCitiesLinks=areaMainHotCities.getElementsByTagName("a");
	var logoAreaI2=document.getElementsByClassName("logo_area_i2")[0];
	for(var i=0;i<areaMainHotCitiesLinks.length;i++){
		areaMainHotCitiesLinks[i].onclick=(function(j){
			return function(){
				logoAreaI2.innerHTML=this.innerHTML;
				areaAll.style.display="none";
			};
		})(i);
	}
})();