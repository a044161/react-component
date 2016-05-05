import React from 'react';
import ReactAddons from 'react-addons';

class CalendarBody extends React.Component{
	renderDay(day, key){ // 渲染每一天

		var toDay = this.props.calendarState.toDay;
		console.log(toDay)
		var cx = ReactAddons.classSet;

		var isToday = function(){
			if(toDay.ymd == day.ymd){
				return true;
			}else{
				return false;
			}
		}

		var dayClass = cx({
			'day-item': true,
			'now': isToday()
		})

		return(
			<li className={dayClass} key={key} data-yyyy={day.yyyy} data-mm={day.mm} data-dd={day.dd} data-day={day.day} data-ymd={day.ymd}>{day.dd}</li>
		)
	}
	renderWeek(week, key){ // 渲染每一周
		console.log(week)
		var day = week.map(this.renderDay())
		console.log(day)
		return(
			<ul key={key} className="day-list">
				{day}
			</ul>
		)
	}
	render(){
		var weeksArray = this.props.calendarState.weeksArray;
		var week = weeksArray.map(this.renderWeek())
		return(
			<div>
				{week}
			</div>
		)
	}
}

export default CalendarBody;