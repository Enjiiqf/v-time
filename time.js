var Time = {
	//取得目前时间戳记
	getUnix: function(){
		var date = new Date();
		return date.getTime();
	},
	//取得今天0点0分0秒的时间戳记
	getTodayUnix: function(){
		var date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date.getTime();
	},
	//取得今年1月1日0点0分0秒的时间戳记
	getYearUnix: function(){
		var date = new Date();
		date.setMonth(0);
		date.setDate(1);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date.getTime();
	},
	//格式化日期：输出格式为xxxx-xx-xx
	getLastDate: function(time){
		var date = new Date(time);
		var month = date.getMonth() + 1 < 10 ? '0' +(date.getMonth()+1):date.getMonth()+1;
		var day = date.getDate()<10?'0'+date.getDate():date.getDate();
		return date.getFullYear()+'-'+month+'-'+day;
	},
	//转换时间
	getFormatTime: function(timestamp){
		var now = this.getUnix();//目前时间戳记
		var today = this.getTodayUnix();//今天0点时间戳记
		var year = this.getYearUnix();//今年0点时间戳记
		var timer = (now-timestamp)/1000;//转为秒级时间戳记
		var tip = '';
		if(timer <= 0){
			tip = '刚刚';
		}else if(Math.floor(timer/60)<=0){
			tip='刚刚';
		}else if(timer<3600){
			tip = Math.floor(timer/60)+'分钟前';
		}else if(timer>3600 && (timestamp - today >= 0)){
			tip = Math.floor(timer/3600)+'小时前';
		}else if(timer/86400 <= 31){
			tip = Math.ceil(timer/86400)+'天前';
		}else{
			tip = this.getLastDate(timestamp);
		}
		return tip;
		},
	//出生时间
	getFormatBirthTime: function(timestamp){
		var now = this.getUnix();//目前时间戳记
		var today = this.getTodayUnix();//今天0点时间戳记
		var year = this.getYearUnix();//今年0点时间戳记
		var timer = (now-timestamp)/1000;//转为秒级时间戳记
		var tip = '';
		if(timer <= 0){
			tip = '刚刚出生';
		}else if(Math.floor(timer/60)<=0){
			tip='刚刚出生';
		}else if(timer<3600){
			tip = '已经出生了'+Math.floor(timer/60)+'分钟';
		}else if(timer>3600 && (timestamp - today >= 0)){
			tip = '已经出生了'+Math.floor(timer/3600)+'小时';
		}else{
			tip = '已经出生了'+Math.ceil(timer/86400)+'天';
		}
		return tip;
		}
};
Vue.directive('time',{
	bind: function(el,binding){
		el.innerHTML = Time.getFormatTime(binding.value);
		el._timeout_ = setInterval(function(){
			el.innerHTML = Time.getFormatTime(binding.value);
		},60000);
	},
	unbind: function(el){
		clearInterval(el._timeout_);
		delete el._timeout_;
	}
}),
Vue.directive('birthday',{
	bind: function(el,binding){
		el.innerHTML = Time.getFormatBirthTime(binding.value);
		el._timeout_ = setInterval(function(){
			el.innerHTML = Time.getFormatBirthTime(binding.value);
		},60000);
	},
	unbind: function(el)
	{
		clearInterval(el._timeout_);
		delete el._timeout_;
	}
})