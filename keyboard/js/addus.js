(function(){
    $(function(){
    	
    	/****
    	*日期
    	****/
		var $brithinput = $(".brithinput"),
			$shade = $(".shade"),
			$date = $(".day,.mouth,.year"),
			$year = $('.year'),
			$mouth = $('.mouth'),
			$day = $('.day'),
			$num = $(".num"),
			nowInput = "day";

        $(".birthday .inputText").on("tap",function(){
			var sBirthDay = $('#data').html();
			if(sBirthDay != '请选择'){
				var iY = sBirthDay.substring(0,4),
					iM = sBirthDay.substring(5,7),
					iD = sBirthDay.substring(8);
				$year.val(iY);
				$mouth.val(iM);
				$day.val(iD);
			}
			$brithinput.show().css({bottom:'-205px'});  
			$shade.show();  
			$num.css("background","#fff");  
			$date.css("background","");
        })

       

        $date.on("tap",function(){

            $(this).css("background","#FFFFE0").siblings().css("background","");

            if($brithinput.css("bottom")=="-205px"){
                $brithinput.animate({bottom:'0px'},200);  
            }

            if($(this).hasClass("day")){
                nowInput = "day";
                
            }else if($(this).hasClass("mouth")){
                nowInput = "mouth";
                
            }else if($(this).hasClass("year")){
                nowInput = "year";
                
            }

        })

        $num.on({
			'touchstart': function(){
				$(this).css({background:'#ccc'}).siblings().css({background:'#fff'});
			},
			'touchend': function(){
				$num.css({background:'#fff'});
			},
			"tap": function(){
				var index = $(this).attr("index");

				if(!!isNaN(index)){
					var val = $("."+nowInput).val();
					var newval = val.substring(0,(val.length-1));
					$("."+nowInput).val(newval);
					return;
				}
				if(index.length>0&&!isNaN(index)){
					if($("."+nowInput).hasClass("day")){
						if($("."+nowInput).val().length<2){
							$("."+nowInput).val($("."+nowInput).val()+index);
						}else{
							$("."+nowInput).val(index);
						}
						if(!/^[0-9]*$/g.test($("."+nowInput).val())){
							$("."+nowInput).val(index);
						}

					}else if($("."+nowInput).hasClass("mouth")){
						if($("."+nowInput).val().length<2){
							$("."+nowInput).val($("."+nowInput).val()+index);
						}else{
							$("."+nowInput).val(index);
						}
						if(!/^[0-9]*$/g.test($("."+nowInput).val())){
							$("."+nowInput).val(index);
						}
					}else if($("."+nowInput).hasClass("year")){
						if($("."+nowInput).val().length<4){
							$("."+nowInput).val($("."+nowInput).val()+index);
						}else{
							$("."+nowInput).val(index);
						}
						if(!/^[0-9]*$/g.test($("."+nowInput).val())){
							$("."+nowInput).val(index);
						}
					}
					
				}
			}
		});


        $(".ok").on("tap",function(){

			var iY = $year.val(),iM = $mouth.val(),iD = $day.val();

        	if(!/^[0-9]*$/g.test(iD)||!/^[0-9]*$/g.test(iM)||!/^[0-9]*$/g.test(iY)){
				if(iY==""){
					promptTips('请选择正确的年份');
					nowInput = "year";
        			return;
				}else if(iM==""){
					promptTips('请选择正确的月份');
					nowInput = "mouth";
        			return;
				}else if(iD==""){
					promptTips('请选择正确的日期');
					nowInput = "day";
        			return;
				}
        	}

			//验证
			
			if(iY>new Date().getFullYear()){
				promptTips('请选择正确的年份');
				$year.css("background","#FFFFE0").siblings().css("background","");
				if($brithinput.css("bottom")=="-205px"){
					$brithinput.animate({bottom:'0px'},200);  
				}
				nowInput = "year";
                return;
			}
			if(iY.length<4||iY<=0){
				promptTips('请选择正确的年份');
				$year.css("background","#FFFFE0").siblings().css("background","");
				if($brithinput.css("bottom")=="-205px"){
					$brithinput.animate({bottom:'0px'},200);  
				}
				nowInput = "year";
                return;
			}
			
			if(iM>12 || iM<=0){
				promptTips('请选择正确的月份');
				$mouth.css("background","#FFFFE0").siblings().css("background","");
				if($brithinput.css("bottom")=="-205px"){
					$brithinput.animate({bottom:'0px'},200);  
				}
				nowInput = "mouth";
                 return;
			}
			if(iD>31 || iD<=0){
				 promptTips('请选择正确的日期');
				 $day.css("background","#FFFFE0").siblings().css("background","");
				nowInput = "day";
                 return;
			}
			if(iM==4||iM==6||iM==9||iM==11){
				if(iD>30){
					promptTips('请选择正确的日期');
					$day.css("background","#FFFFE0").siblings().css("background","");
					nowInput = "day";
					return;
				}
			}
			if((iY%4==0&&iY%100!=0)||iY%4==0){
				if(iD>29){
					promptTips('请选择正确的日期');
					$day.css("background","#FFFFE0").siblings().css("background","");
					nowInput = "day";
					return;
				}
			}else{
				if(iD>28){
					promptTips('请选择正确的日期');
					$day.css("background","#FFFFE0").siblings().css("background","");
					nowInput = "day";
					 return;
				}
			}

			iM = iM - 0;
			iD = iD - 0;
			iM = iM<10?'0'+iM:iM;
			iD = iD<10?'0'+iD:iD;
			$day.val(iD);
			$mouth.val(iM);

        	$(".birthday .content").text(iY+"-"+iM+"-"+iD);
        	$brithinput.hide();  
        	$shade.hide(); 

        })


        $(".cancel").on("tap",function(){
			$date.val('');
        	$brithinput.hide();  
        	$shade.hide();  
        })

	})
})();








