(function(){
    $(function(){
    	
    	/****
    	*日期
    	****/
		var $liH = 50,
			bCanEnd = true, //判断是否滚动结束
			iMaskTop = 50,
			iMaskTopNum = iMaskTop/$liH, //判断选中框距离上面多少个
			iYearStart = 1950,//年份从1950开始
			iYear = iYearStart,
			iMouth = 1,
			iDay = 1,
			$selectCon1 = $('#selectCon1'),
			$selectCon3 = $('#selectCon3'),
			$selNoUse = $('.selNoUse'),
			$tk = $(".select,.shade");
		
		//添加年份
		intoDateFn($selectCon1, iYearStart-1, 2050)
		
		/*
		 * 添加年月日的数据
		 * obj object 往obj里添加
		 * iStart number 数据从iStart开始
		 * iLen number 数据从iLen结束
		 */
		function intoDateFn(obj, iStart, iLen){
			obj.empty();
			for (var i=iStart; i<iLen+2; i++) {
				if(i == iStart || i == iLen+1){
					obj.append($('<div class="option"></div>'));
				}else{
					obj.append($('<div class="option">'+ i +'</div>'));
				}
			}
		};
		
		/*
		 * 验证闰年
		 */
		function testLeapYearFn(){
			if(iMouth == 2){
				if((iYear%4==0&&iYear%100!=0)||iYear%4==0){ //闰年
					intoDateFn($selectCon3, 0, 29);
					scroll3.refresh();
					return;
				}else{
					intoDateFn($selectCon3, 0, 28);
					scroll3.refresh();
					return;
				}
			}else if(iMouth==4||iMouth==6||iMouth==9||iMouth==11){ //30天
				intoDateFn($selectCon3, 0, 30);
				scroll3.refresh();
				return;
			}else{//31天
				intoDateFn($selectCon3, 0, 31);
				scroll3.refresh();
				return;
			}
		};

		/*
		 * 滚动开始函数
		 */
		function scrollStartFn(){
			bCanEnd = true;
			$selNoUse.show();
		}

		/*
		 * 滚动中函数
		 */
		function scrollIngFn(){
			if(!bCanEnd){return;}
			var thisY = this.y>>0;
			var thisDiff = this.y-this.startY;
			var iNow = Math.abs(Math.floor(thisY/$liH)) + 1;
		}
		
		/*
		 * 滚动结束函数
		 * obj object 滚动对象
		 * index number 第几个
		 * s object this对象
		 */
		function scrollEndFn(obj, index,s){
			var iNow; //滚动完对应的数据

			if(bCanEnd){
				bCanEnd =false;
				var thisY = s.y>>0;
				iNow = Math.abs(Math.floor(thisY/$liH))+ 1;
				obj.scrollToElement(document.querySelector('#selectCon'+ index +' div:nth-child('+ iNow +')'), 300);
			}
			if(iNow){
				switch(index){
					case 1:
						iYear = iNow + iYearStart - 1;
						break;
					case 2:
						iMouth = iNow;
						break;
					case 3:
						iDay = iNow;
						break;
				}
				if(index != 3){
					testLeapYearFn();
				}
				$selNoUse.hide();
			}
			
		};
		
		//年份滚动
        var scroll1 = new IScroll('#selectScroll1', {mouseWheel: true });
		scroll1.on('scrollStart', scrollStartFn);
		scroll1.on('scroll', scrollIngFn);
		scroll1.on('scrollEnd', function(){
			scrollEndFn(scroll1, 1, this);
		});

		//月份滚动
        var scroll2 = new IScroll('#selectScroll2', {mouseWheel: true });
		scroll2.on('scrollStart', scrollStartFn);
		scroll2.on('scroll', scrollIngFn);
		scroll2.on('scrollEnd', function(){
			scrollEndFn(scroll2, 2, this);
		});

		//日期滚动
        var scroll3 = new IScroll('#selectScroll3', {mouseWheel: true });
		scroll3.on('scrollStart', scrollStartFn);
		scroll3.on('scroll', scrollIngFn);
		scroll3.on('scrollEnd', function(){
			scrollEndFn(scroll3, 3, this);
		});

       	$(".birthday .inputText").on("tap",function(){
			iYear = iYearStart;
			iMouth = 1;
			iDay = 1;
			scroll1.scrollToElement(document.querySelector('#selectCon1 div:nth-child(1)'));
			scroll2.scrollToElement(document.querySelector('#selectCon2 div:nth-child(1)'));
			scroll3.scrollToElement(document.querySelector('#selectCon3 div:nth-child(1)'));
       		$tk.show();
			scroll1.refresh();
			scroll2.refresh();
			scroll3.refresh();
        });
        $(".select .selectcancel").live("tap",function(){
        	$tk.hide();  
        })
		$(".select .selectok").on("tap",function(){
			$tk.hide();
			iMouth = iMouth<10?'0'+iMouth:iMouth;
			iDay = iDay<10?'0'+iDay:iDay;
			$(".birthday .content").text(iYear+"-"+iMouth+"-"+iDay);
		})

    })
})();








