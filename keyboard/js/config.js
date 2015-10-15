window.config={
    dns:"",
	Rurl:"http://wx.chinapag.com/",//正式 
	//Rurl:"http://api.uat.daoyitong.com/"//UAT 
	//Rurl:"http://192.168.99.207:9090/",//测试
    //Rurl:"http://192.168.99.65:8080/"//本地
}

//信息提示框
function promptTips(textMes,callback,noHide,element){
    var element = !!element ? element : $('body');
    if(!!element.find('#codetip').length) return false;
    $("<p id='codetip'></p>").text(textMes).css({'color':'#ffffff','width':"80%",'line-height':"16px;",'padding':'16px 0','background-color':"#7b7e7d",'position':"fixed",'left':"50%",'top':"50%",'margin-left':"-40%",'margin-top':"-25px",'text-align':"center",'font-size':"12px","border-radius":"5px",'opacity':'.8','z-index':15}).appendTo(element);
    if(!noHide){
        setTimeout(function(){
            $('#codetip').remove();
            !!callback && callback();
        },3000);
    }
}


