var store = require('./_storeCalendar.jsx');
var CalendarBody = require('./CalendarBody.jsx');
var moment = require('moment');

var Calendar = React.createClass({
	mixins: [store],
	componentDidMount: function(){
		this.getNowDate();
		this.createMonthArray();
	},
	getNowDate: function(){ // 获取当前时间，并更新state
		var toDay = this.state.toDay;

		var year = moment().year();
		var month = moment().month();
		var date = moment().date();

		toDay.yyyy = year;
		toDay.mm = month;
		toDay.dd = date;

		toDay.ymd = moment().format('YYYY-MM-DD');
		toDay.md = moment().format('MM-DD');
		toDay.mmEn = this.state.monthEn[month];

		this.setState({toDay: toDay});
	},
	createMonthArray: function(year, month){ // 生成当前月份的整个日期排序
		var weekArray = [];
		var weeksArray = [];

		var _moment = new moment();
		var toDay = this.state.toDay;

		var _year = year? year : toDay.yyyy;
		var _month = month? month : toDay.mm;

		_moment.set({'year': _year, 'month': _month});

		var days = _moment.daysInMonth();

		var dayInfo = {};

		for(var d=1; d<days+1; d++){
			_moment.set('date', d);

			var day = _moment.day();

			dayInfo.yyyy = _year;
			dayInfo.mm = _month;
			dayInfo.dd = d;
			dayInfo.day = day;
			dayInfo.ymd = _moment.format('YYYY-MM-DD');

			if(day == 0){
				weekArray[6] = dayInfo;
				weeksArray.push(weekArray.concat());
				weekArray = [];
			}else if(d==days){
				weekArray[day-1] = dayInfo;
				weeksArray.push(weekArray.concat());
			}else{
				weekArray[day-1] = dayInfo;
			}

			dayInfo = {}

		}

		for(var w in weeksArray){
			for(var d=0; d<7; d++){
				if(typeof(weeksArray[w][d]) == 'undefined'){
					weeksArray[w][d] = '';
				}
			}
		}

		this.setState({weeksArray: weeksArray})

	},
	handlePreMonth: function(){ // 选择上一个月
		var toDay = this.state.toDay;
		var _year = toDay.yyyy;
		var _month = toDay.mm;

		if(_month == 0){
			_year -= 1; 
			_month = 11;
		}else{
			_month -=1;
		}

		toDay.yyyy = _year;
		toDay.mm = _month;
		toDay.mmEn = this.state.monthEn[_month];

		this.setState({toDay: toDay})
		this.createMonthArray()
	},
	handleNextMonth: function(){ // 选择下一个月
		var toDay = this.state.toDay;
		var _year = toDay.yyyy;
		var _month = toDay.mm;

		if(_month == 11){
			_year += 1; 
			_month = 0;
		}else{
			_month +=1;
		}

		toDay.yyyy = _year;
		toDay.mm = _month;
		toDay.mmEn = this.state.monthEn[_month];

		this.setState({toDay: toDay})
		this.createMonthArray()
	},
	init: function(year, month){ // 日历初始化

	},
	render: function(){
		var toDay = this.state.toDay;
		return(
			<div className="ui-calendar">
				<div className="header">
					<span className="arrow-left" onClick={this.handlePreMonth}>&lt;</span>
					<p className="date">
						<span className="month">{toDay.mmEn}</span>
						<span className="year">{toDay.yyyy}</span>
					</p>
					<span className="arrow-right" onClick={this.handleNextMonth}>&gt;</span>
				</div>
				<div className="body">
					<ul className="week-list">
						<li className="week-item">日</li>
						<li className="week-item">一</li>
						<li className="week-item">二</li>
						<li className="week-item">三</li>
						<li className="week-item">四</li>
						<li className="week-item">五</li>
						<li className="week-item">六</li>
					</ul>
					<CalendarBody calendarState={this.state}/>
				</div>
			</div>
			
		)
	}

})

module.exports = Calendar;