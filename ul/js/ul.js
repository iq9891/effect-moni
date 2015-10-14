$(function(){
	ulFn({id:'#sel',btnId:'#selBtn',listId:'#list',listLinkFn: function(_this){
		console.log(_this.html());
	}});
	ulFn({id:'#sel2',btnId:'#selBtn2',listId:'#list2'});
});

/*
 * 模拟select列表
 * id string 整个列表
 * btnId string 点击按钮的名字，如'#btn','.btn',默认'#selBtn'
 * listId string ul的名字，如'#list','.list',默认'#list'
 * listLinkFn function 点击选中执行的函数,参数_this，返回当前点击的元素
 * stop boolen 是否点击document收起，并阻止冒泡，默认false不收起
 */
function ulFn(json){
	
	if(!json.id){console.log('填写id参数');return;}

	var $id = $(json.id),
		$selBtn = $id.find(json.btnId||'#selBtn'),
		$list = $id.find(json.listId||'#list'),
		$listLink = $list.find('a'),
		bStop = json.stop || false,
		bBtn = true;
	
	$selBtn.click(function(event){
		$list.css({height:bBtn?'auto':46});
		$selBtn.toggleClass('on');
		bBtn = !bBtn;
		bStop && event.stopPropagation();
	});

	$listLink.click(function(event){
		var _this = $(this);
		$listLink.removeClass('on').eq(_this.parent().index()).addClass('on');
		json.listLinkFn && json.listLinkFn(_this);
		bStop && event.stopPropagation();
	});

	$(document).click(function(){
		if(bStop){
			$list.css({height:46});
			$selBtn.removeClass('on');
			bBtn = !bBtn;
		}
	});

};