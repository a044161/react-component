import React from 'react';

import CalendarBody from './CalendarBody.jsx';
import moment from 'moment';

class Calendar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			toDay:{yyyy: '', mm: '', dd: '', ymd: '', md: ''},// 今日的日期对象 yyyy: 年 mm：月，dd：日 ymd：年月日（2016-01-20）md：月日（01-20）
			monthEn: ['January ', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'],
			weeksArray:[] // 存储当前月份的日期
		}
	}
	componentDidMount(){
		this.getNowDate();
		this.createMonthArray();
	}
	getNowDate(){ // 获取当前时间，并更新state
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
	}
	createMonthArray(year, month){ // 生成当前月份的整个日期排序
		var weekArray = []; // 存放一周的天数
		var weeksArray = []; // 存放一整个月的天数，一个子数组为一周

		var _moment = new moment(); // new moment 才能保证设置年、月等属性时是有效的
		var toDay = this.state.toDay;

		var _year = year? year : toDay.yyyy;
		var _month = month? month : toDay.mm;

		_moment.set({'year': _year, 'month': _month}); // 设置年、月

		var days = _moment.daysInMonth(); // 获取当前月份下的天数

		var dayInfo = {}; // 初始一个每天的详情对象

		for(var d=1; d<days+1; d++){ // 根据当前月份的天数生成，日期对应星期的数组

			_moment.set('date', d);  // 设置日期

			var day = _moment.day(); // 获取星期

			dayInfo.yyyy = _year; // 年
			dayInfo.mm = _month; // 月
			dayInfo.dd = d; // 日
			dayInfo.day = day; // 星期
			dayInfo.ymd = _moment.format('YYYY-MM-DD'); // 年-月-日

			if(day == 6){ // 判断是否为星期六 为周六则需要结束该子数组
				weekArray[day] = dayInfo;
				weeksArray.push(weekArray.concat());
				weekArray = [];
			}else if(d==days){ // 判断是否为最后一天 最后一天也需要结束该子数组
				weekArray[day] = dayInfo;
				weeksArray.push(weekArray.concat());
			}else{
				weekArray[day] = dayInfo;
			}

			dayInfo = {}

		}

		for(var w in weeksArray){ // 将为空的部分填充上空
			for(var d=0; d<7; d++){
				if(typeof(weeksArray[w][d]) == 'undefined'){
					weeksArray[w][d] = '';
				}
			}
		}

		this.setState({weeksArray: weeksArray})

	}
	handlePreMonth(){ // 选择上一个月
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
	}
	handleNextMonth(){ // 选择下一个月
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
	}
	render(){
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

}

export default Calendar