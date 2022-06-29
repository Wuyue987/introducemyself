//全域變數宣告
var BMI = 0;
var judge = '';
//DOM節點
var btn = document.querySelector('.h-btn');
var result = document.querySelector('.result');
var list = document.querySelector('.list');
var tall = document.getElementById('centimeter');
var weight = document.getElementById('kilogram');
var data = [];
var clear = document.querySelector('.delet');

//刪除按鍵

//建立監聽
result.addEventListener('click', action);
clear.addEventListener('click',deletItem);

//btn的控制操作
function action() {
	//取得輸入的資料
	var t = tall.value;
	var w = weight.value;
	//檢查是否為數字
	var check_t = Number(t);
	var check_w = Number(w);
	if (isNaN(check_t) || isNaN(check_w)) {
		alert('請輸入數字');
		return;
	}
	//檢查是否為空值
	if (t == '' || w == '' || t <= 0 || w <= 0) {
		alert('未輸出身高與體重');
		return;
	}
	//檢查數值是否正常
	if(t >= 300 || w >=500){
		alert('數值過大，請重新輸入');
		return;
	}
	//執行方法
	count(t, w);
	addData(t, w);
	//changeBtn();
	uppdateList(data);
	tall.value = '';
	weight.value = '';
}
//計算BMI
function count(t, w) {
	//計算BMI過程
	var BMIbefore = w / Math.pow(t / 100, 2);
	BMI = BMIbefore.toFixed(2);//取得小數點後2位的值
	//判定BMI的值
	if (BMI >= 40) {
		judge = '重度肥胖';
	}
	else if (BMI >= 35 && BMI < 40) {
		judge = '中度肥胖';
	}
	else if (BMI >= 30 && BMI < 35) {
		judge = '輕度肥胖';
	}
	else if (BMI >= 25 && BMI < 30) {
		judge = '過重';
	}
	else if (BMI >= 18.5 && BMI < 25) {
		judge = '理想';
	}
	else {
		judge = '過輕';
	}
}
//取得日期與時間
function today() {
	var today = new Date();
	var time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +today.getDate() 
	return time;
}
//建立資料存取
function addData(t, w) {
	var total = {
		cm: t,
		kg: w,
		BMI: BMI,
		stat: judge,
		time: today()
	}
	data.push(total);
}
//更新歷史紀錄資料
function uppdateList(data) {
	//更新list內容
	var str = '';
	var len = data.length;
	for (i = 0; i < len; i++) {
		str += '<div class="item"><div class="boxColor"></div><ul class="bmi-item"><li>' + data[i].stat + '</li><li>身高:' + data[i].cm + 'cm</li><li>體重:' + data[i].kg + 'kg</li><li>BMI:' + data[i].BMI + '</li><li>' +data[i].time+ '</li></ul></div>'
	}
	list.innerHTML = str;
	//變更列表的顏色
	for (colorNum = 0; colorNum < len; colorNum++) {
		changeColor(colorNum, data[colorNum].stat);
	}
}
//變更歷史紀錄欄位的顏色
function changeColor(colorNum,stat) {
	//DOM元素
	var boxColor = document.querySelectorAll('.boxColor');
	//判定顏色
	switch (stat) {
		case '過輕':
			boxColor[colorNum].classList.add('lev1');
			break;
		case '理想':
			boxColor[colorNum].classList.add('lev2');
			break;
		case '過重':
			boxColor[colorNum].classList.add('lev3');
			break;
		case '輕度肥胖':
			boxColor[colorNum].classList.add('lev4');
			break;
		case '中度肥胖':
			boxColor[colorNum].classList.add('lev5');
			break;
		case '重度肥胖':
			boxColor[colorNum].classList.add('lev6');
			break;
	}
}
//變更btn的樣子
// function changeBtn(){
// 	//更新btn的內容
// 	var str = '<div class="newbtn">'+ BMI +'<h2 class="BMI">BMI</h2></div><button type="reset" class="refreshBtn"></button>'
// 	btn.innerHTML = str;
// 	//建立DOM
// 	var newBtn = document.querySelector('.newbtn');
// 	var refresh = document.querySelector('.refreshBtn');
// 	//判定顏色
// 	//switch(stat){
		
// 	//}
// 	// refresh.onclick = reloading();
// }
//初始化數值與按鈕
// function reloading(e){
// 	var str = '<input type="button" id="resultId" class="result" value="看結果">'
// 	btn.innerHTML = str;
	
// }
//刪除歷史紀錄
function deletItem(e){
	e.preventDefault();
	data = [];
	uppdateList(data);
}
// result.addEventListener('click',count);



// /*計算判斷用*/
// function count(){
// 	var cm = parseInt(tall.value);
// 	var m = parseInt(tall.value) / 100;
// 	var kg = parseInt(weight.value);
// 	var bmi = kg/(m*m);
// 	bmi = Number(bmi.toFixed(2));
// 	console.log(bmi);
// 	var state = judgebmi(bmi);
// 	console.log(state);
// 	var remdata = {
// 		center: cm,
// 		weigh: kg,
// 		BMI: bmi,
// 		stat: state,
// 	}
// 	bdata.push(remdata);
// 	console.log(bdata);
// 	uppdateList(bdata);
// }
// /*判斷用*/
// function judgebmi(items){
// 	var a = '';
// 	if (items < 18.5) {
// 		a = '過輕'
// 		return a;
// 	}
// 	else if(items >= 18.5 && items < 24){
// 		a = '理想'
// 		return a;
// 	}
// 	else if(items >= 24 && items<27){
// 		a = '過重'
// 		return a;
// 	}
// 	else if(items>=27){
// 		a = '肥胖'
// 		return a;
// 	}
// }

// function uppdateList(edata){
// 	str = '';
// 	var len = edata.length;
// 	for(i = 0;i < len; i++){
// 		str += '<ul class="bmi-item"><li>'+edata[i].stat+'</li><li>身高:'+edata[i].center+'</li><li>體重:'+edata[i].weigh+'</li><li>BMI:'+edata[i].BMI+'</li></ul>'
// 	}
// 	list.innerHTML = str;
// }
