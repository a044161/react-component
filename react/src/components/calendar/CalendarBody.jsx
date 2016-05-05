import React from 'react';
import ReactAddons from 'react-addons';

class CalendarBody extends React.Component{

	constructor(props){
		super(props);
	}
	renderDay(day, key){ // 渲染每一天
		let toDay = this.props.calendarState.toDay;

		let cx = ReactAddons.classSet;

		let isToday = function(){

			if(toDay.ymd == day.ymd){
				return true;
			}else{
				return false;
			}
		}

		let dayClass = cx({

			'day-item': true,
			'now': isToday()
		})

		return(
			<li className={dayClass} key={key} data-yyyy={day.yyyy} data-mm={day.mm} data-dd={day.dd} data-day={day.day} data-ymd={day.ymd}>{day.dd}</li>
		)
	}
	renderWeek(week, key){ // 渲染每一周

		let day = week.map(this.renderDay.bind(this))

		return(
			<ul key={key} className="day-list">
				{day}
			</ul>
		)
	}
	render(){

		let weeksArray = this.props.calendarState.weeksArray;
		let week = weeksArray.map(this.renderWeek.bind(this))

		return(
			<div>
				{week}
			</div>
		)
	}

}; 

export default CalendarBody;