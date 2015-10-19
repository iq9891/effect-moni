$(function(){

	var iOldY = 0, //旧的Y值
		iNewY = 0, //新的Y值
		oSpeedY = 0, //抬起时候的速度
		iStartDeg = 120, //旋转角度
		iDeg = iStartDeg, //旋转角度
		oTim = null,
		bTop = true,
		$ul = $('#ul,#ul2');

	createLiFn($ul.eq(0), 12);
	createLiFn($ul.eq(1), 12);

	var $li = $ul.eq(0).find('li'),
		$li2 = $ul.eq(1).find('li'),
		$div = $('.div'),
		r = 80, //半径
		iDegPer = 30;	//每个li的倾斜的度数

	/*
	 * 创建li
	 * obj object 添加的父级
	 * num number 创建li的个数
	*/
	function createLiFn(obj, num){
		var sHtml = '',
			i = 0;
		for (i=num; i>0; i--) {
			sHtml += '<li>'+ (i) +'</li>'
		}
		obj.append(sHtml);
	};
	
	//li布局
	$li.each(function(i,e){

		var y = r*Math.cos(i*iDegPer*Math.PI/180)+$div.height()-112,
			z = r*Math.sin(i*iDegPer*Math.PI/180);

		y = y.toFixed(2);
		z = z.toFixed(2);

		$(e).css({
			'-webkit-transform': 'translate3d('+150+'px, '+ y +'px, '+ z +'px) rotateX('+(-90+i*iDegPer)+'deg)'
		});
		$li2.eq(i).css({
			'-webkit-transform': 'translate3d('+150+'px, '+ y +'px, '+ z +'px) rotateX('+(-90+i*iDegPer)+'deg)'
		});

	});

	$div.on({
		'touchstart': moveStart 
	});

	function moveStart(e){
		oSpeedY = 0;
		clearInterval(oTim);
		iOldY = e.targetTouches[0].clientY;
		$(document).on({
			'touchmove': moveIng,
			'touchend': moveEnd
		});
	}

	function moveIng(e){
		var oMy = e.targetTouches[0];
			
		if(oMy.clientY>iOldY){//下
			$ul.css({
				'-webkit-transform': 'rotateX('+(--iDeg)+'deg)'
			});
			bTop = false;
		}else{//上
			$ul.css({
				'-webkit-transform': 'rotateX('+(++iDeg)+'deg)'
			});
			bTop = true;
		}
		oSpeedY = Math.abs(oMy.clientY - iOldY)/10;
		
		iOldY = oMy.clientY;
	}
	
	function moveEnd(){
		$(document).off();
		bufferFn();
	}
	
	//移动完的滚动缓停
	function bufferFn(){
		
		clearInterval(oTim);
		
		oTim = setInterval(function(){
			oSpeedY *= 0.98;
			iDeg = iDeg+(bTop?1:-1)*oSpeedY;
			$ul.css({
				'-webkit-transform': 'rotateX('+iDeg+'deg)'
			});
			if(oSpeedY<1){
				clearInterval(oTim);

				var iIndex = Math.round(iDeg/iDegPer-3);
				
				iDeg = (iIndex-1)*iDegPer+iStartDeg;
				$ul.css({
					'-webkit-transform': 'rotateX('+iDeg+'deg)'
				}).addClass('anim').on('webkitTransitionEnd', function(){
					$ul.off().removeClass('anim');
				})

				iOldY = 0;
				oSpeedY = 0;
			}
		}, 30);

	};
	
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

});
