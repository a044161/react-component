var CalendarBody = React.createClass({
	renderDay: function(day, key){
		var toDay = this.props.calendarState.toDay;

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
	},
	renderWeek: function(week, key){
		var day = week.map(this.renderDay)
		return(
			<ul key={key} className="day-list">
				{day}
			</ul>
		)
	},
	render: function(){
		var weeksArray = this.props.calendarState.weeksArray;
		var week = weeksArray.map(this.renderWeek)
		return(
			<div>
				{week}
			</div>
		)
	}
});

module.exports = CalendarBody;