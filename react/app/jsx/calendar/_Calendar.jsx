var moment = require('moment');
var AjaxStore = require('../AjaxStore');

var Calendar = React.createClass({
	mixins:[AjaxStore],
	getInitialState: function(){
		return{
			nowDate: {}, // 存储现在的时间
			weekStore: [], // 存储每周的时间详情，包括年月日，以及YMD类型
			dateState:{}, // 日期的类型，1为班，2为休息
			showDateState:{}, // 存储展示用的日期
			selectDay: [], // 存储选择的日期
			switchDay: [], // 切换日期
			selectType: 1, // 选择日期的类型，1为单日，2为多日
			year:'',
			month: ''
		}
	},
	componentWillMount: function(){
		if(this.props.calendarType == 1){
			var dateState={}
			this.setState({dateState: dateState})
			this.initCalendar();
		}else if(this.props.calendarType == 2){
			var dateState={}
			for(var d in this.props.dateState){
				if(d == 'timeout'){
					for(var i in this.props.dateState[d]){
						dateState[this.props.dateState[d][i]] = 1
					}
				}else if(d == 'nosubmit'){
					for(var i in this.props.dateState[d]){
						dateState[this.props.dateState[d][i]] = 2
					}
				}
			}
			this.setState({dateState: dateState})
			this.initCalendar(dateState);
		}else if(this.props.calendarType == 3){
			this.initCalendar();
			this.setState({dateState: {}})
		}
		
	},
	componentWillReceiveProps: function(nextprops){
		var dateState={}
		for(var d in nextprops.dateState){
			if(d == 'timeout'){
				for(var i in nextprops.dateState[d]){
					dateState[nextprops.dateState[d][i]] = 3 // 超时
				}
			}else if(d == 'nosubmit'){
				for(var i in nextprops.dateState[d]){
					dateState[nextprops.dateState[d][i]] = 2 // 未提交
				}
			}else if (d == 'normal'){
				for(var i in nextprops.dateState[d]){
					dateState[nextprops.dateState[d][i]] = 1 // 正常
				}
			}
		}
		
		this.storeWeek(this.state.year, this.state.month, dateState)
	},
	initCalendar: function(dateState){
		this.getNowDate();
		this.storeWeek('', '',dateState);
	},
	getNowDate: function(){
		var _date = this.state.nowDate;
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();

		_date.year = year;
		_date.month = month;
		if(day<10){
			day = Number(0+String(day))
			_date.day = day;
		}else{
			_date.day = day;
		}
		_date.ymd = String(year)+'-'+String(month)+'-'+String(day)
		this.setState({nowDate: _date});
	},
	storeWeek: function(year, month, dateState){
		var date = new Date();
		var nowDate = this.state.nowDate;
		var _year = year? year: nowDate.year;
		var _month = month? month: nowDate.month;
		var dateState = dateState? dateState : this.state.dateState;

		var dateStore = [];
		var weekStore = [];
		var dayInfo = {};

		date.setFullYear(_year);
		date.setMonth(_month-1);

		if (year % 4 == 0 && year % 100 !== 0) {
           var daysStore = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
           var daysStore = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }

        if(_month<10){
        	_month = '0'+ _month
        }

        for (var d = 1; d < daysStore[_month - 1] + 1; d++) {

            date.setDate(d);
            var day = date.getDay();

            dayInfo.year = _year;
            dayInfo.month = _month;
            dayInfo.day = d;
            dayInfo.state = 1; // 日期的状态，1为“班”，2为“休”，0为正常
            dayInfo.date = day;

            if(d<10){
            	dayInfo.ymd = String(_year)+'-'+String(_month)+'-'+0+String(d);
            }else{
            	dayInfo.ymd = String(_year)+'-'+String(_month)+'-'+String(d);
            }
            
            if(typeof(dateState) !== 'undefined'){
            	dayInfo.state = dateState[dayInfo.ymd];
            }else{
            	dayInfo.state = 0;
            }

            if (day == 0) {
                weekStore[6] = dayInfo;
                dateStore.push(weekStore.concat());
                weekStore = [];
            } else if (d == daysStore[_month - 1]){
                weekStore[day - 1] = dayInfo;
                dateStore.push(weekStore.concat());
            } else {
                weekStore[day - 1] = dayInfo;
            }

            dayInfo = {}
        }
        for(var w in dateStore){
	        	for(var d=0; d<7; d++){
	        		if(typeof(dateStore[w][d]) == 'undefined'){
	        			dateStore[w][d] = ''
	        		}
	        }
    	}
        this.setState({weekStore: dateStore})
	},
	handleChoseType: function(e){
		var _this = e.target;
		var $calendarSelectday = $('.calendar-selectday .checkbox');
		$calendarSelectday.removeClass('checkbox-checked');
		if(_this.id == 'calendarSingleday'){
			this.setState({selectType:1, selectDay:[]})
			this.refs.calendarSingleday.className = 'checkbox checkbox-checked'
		}else if(_this.id == 'calendarMultipleDay'){
			this.setState({selectType:2, selectDay:[]})
			this.refs.calendarMultipleDay.className = 'checkbox checkbox-checked';
		}
	},
	handlePreMonth: function(){
		var _month = this.state.nowDate.month;
		var _now = this.state.nowDate;

		if(_month == 1){
			var _year = this.state.nowDate.year -1;
			_month = 12;
		}else{
			var _year = this.state.nowDate.year;
			_month -=1;
		}

		_now.year = _year;
		_now.month = _month;

		this.setState({year: _year,month: _month})

		if(typeof(this.props.switchCalendarMonth) !== 'undefined'){
			var userid = this.props.globalState.userInfo.eNumber;
			this.props.switchCalendarMonth(_year+'-'+_month, userid)
		}else{
			this.storeWeek(_year,_month)
		}
		

		
	},
	handleNextMonth: function(){
		var _month = this.state.nowDate.month;
		var _now = this.state.nowDate;

		if(_month == 12){
			var _year = this.state.nowDate.year +1;
			_month = 1;
		}else{
			var _year = this.state.nowDate.year;
			_month +=1;
		}

		_now.year = _year;
		_now.month = _month;

		this.setState({year: _year,month: _month})

		if(typeof(this.props.switchCalendarMonth) !== 'undefined'){
			var userid = this.props.globalState.userInfo.eNumber;
			this.props.switchCalendarMonth(_year+'-'+_month, userid)
		}else{
			this.storeWeek(_year,_month)
		}
		
	},
	handleSelectSingleDay: function(e){
		var _this = e.target.nodeName.toLowerCase() == 'li'? e.target:null;
		var _selectDay = [];
		var _nowDate = this.state.nowDate.ymd

		if(_this.dataset){
			var _date = _this.dataset.date;
		}else{
			var _date = _this.getAttribute('data-date');
		}

		this.props.calendarGetPlan(_date)

		if(_date == null){
			return false;
		}else{
			$('.calendar-day').removeClass('calendar-day-select-single');

			_this.className = 'calendar-day calendar-day-select-single'

			this.props.planDateStore(_date);
			_selectDay.push(_date);
			this.setState({selectDay: _selectDay});
			this.props.handleStore({maSelectDay:_selectDay})
		}
		var calendar = document.getElementById('calendar');
		calendar.style.display = 'none';
	},
	handleSelectMultipleDay: function(e){
		var _nowDate = this.state.nowDate.ymd.split('-');
		var _this = e.target.nodeName.toLowerCase() == 'li'? e.target:null;
		var _selectDay = this.state.selectDay;

		var nYear = _nowDate[0];
		if(_nowDate[1]<10){
			var nMonth = '0'+_nowDate[1];
		}else{
			var nMonth = _nowDate[1];
		}

		if(_nowDate[2]<10){
			var nDay = '0' + _nowDate[2];
		}else{
			var nDay = _nowDate[2];
		}

		_nowDate = nYear + '-' + nMonth + '-' + nDay;

		if(typeof(_selectDay) !== 'object'){
			_selectDay = []
		}

		if(_this.dataset){
			var _date = _this.dataset.date;
		}else{
			var _date = _this.getAttribute('data-date');
		}

		if(_date == null || _date<_nowDate){
			return false;
		}else{
			if(_selectDay.length<2){
				_selectDay.push(_date);
				_selectDay.sort(function(a,b){
					var a = a.replace(/-/g,'');
					var b = b.replace(/-/g,'');
					return a-b
				})

			}else{
				_selectDay = _nowDate;
				
			}
			
			
			this.props.planDateStore(_selectDay);

			this.setState({selectDay: _selectDay});
			this.props.handleStore({maSelectDay:_selectDay})

		}
		
	},
	render: function(){
		if(this.props.calendarType == 1){
			return(
					<div className="calendar" id="calendar" onMouseLeave={this.props.handleCloseCalendar}>
				        <div className="calendar-triangle">
				            <span></span>
				        </div>
					    <div className="calendar-selectday">
					        <div className="calendar-singleday">
					            <span ref="calendarSingleday" className="checkbox checkbox-checked" id="calendarSingleday" onClick={this.handleChoseType}></span>
					            <span className="calendar-singleday-text" id="calendarSingleday" onClick={this.handleChoseType}>单日</span>
					        </div>
					        <div className="calendar-multipleday">
					            <span ref="calendarMultipleDay" className="checkbox" id="calendarMultipleDay" onClick={this.handleChoseType}></span>
					            <span className="calendar-multipleday-text" id="calendarMultipleDay" onClick={this.handleChoseType}>多日</span>
					        </div>
					    </div>
					    <div className="calendar-head">
					        <span className="calendar-premonth" id="calendarPre" onClick={this.handlePreMonth}>&lt;</span>
					        <span className="calendar-month" id="calendarMonth">{this.state.nowDate.month}月</span>
					        <span className="calendar-nextmonth" id="calendarNext" onClick={this.handleNextMonth}>&gt;</span>
					    </div>
					    <div>
					        <ul className="calendar-header">
					            <li>一</li>
					            <li>二</li>
					            <li>三</li>
					            <li>四</li>
					            <li>五</li>
					            <li style={{'color':'red'}}>六</li>
					            <li style={{'color':'red'}}>日</li>
					        </ul>
					        <CalendarWeek nowDate={this.state.nowDate} selectType={this.state.selectType} weekStore={this.state.weekStore} selectDay={this.state.selectDay} handleSelectSingleDay={this.handleSelectSingleDay} handleSelectMultipleDay={this.handleSelectMultipleDay}/>
					    </div>
					</div>
			)
		}else if(this.props.calendarType == 2){
			return(
					<div className="calendar" id="calendar">
				        <div className="calendar-triangle">
				            <span></span>
				        </div>
					    <div className="calendar-head">
					        <span className="calendar-premonth" id="calendarPre" onClick={this.handlePreMonth}>&lt;</span>
					        <span className="calendar-month" id="calendarMonth">{this.state.nowDate.month}月</span>
					        <span className="calendar-nextmonth" id="calendarNext" onClick={this.handleNextMonth}>&gt;</span>
					    </div>
					    <div>
					        <ul className="calendar-header">
					            <li>一</li>
					            <li>二</li>
					            <li>三</li>
					            <li>四</li>
					            <li>五</li>
					            <li style={{'color':'red'}}>六</li>
					            <li style={{'color':'red'}}>日</li>
					        </ul>
					        <CalendarShow  handleChoseDate={this.props.handleChoseDate} weekStore={this.state.weekStore} nowDate={this.state.nowDate} />
					    </div>
					</div>
			)
		}else if(this.props.calendarType == 3){
			return(
				<div className="calendar" id="calendar" onMouseLeave={this.props.handleCloseCalendar}>
			        <div className="calendar-triangle">
			            <span></span>
			        </div>
				    <div className="calendar-head">
				        <span className="calendar-premonth" id="calendarPre" onClick={this.handlePreMonth}>&lt;</span>
				        <span className="calendar-month" id="calendarMonth">{this.state.nowDate.month}月</span>
				        <span className="calendar-nextmonth" id="calendarNext" onClick={this.handleNextMonth}>&gt;</span>
				    </div>
				    <div>
				        <ul className="calendar-header">
				            <li>一</li>
				            <li>二</li>
				            <li>三</li>
				            <li>四</li>
				            <li>五</li>
				            <li style={{'color':'red'}}>六</li>
				            <li style={{'color':'red'}}>日</li>
				        </ul>
				        <CalendarNormal nowDate={this.state.nowDate} selectDay={this.props.selectDay} handleSelectDay={this.props.handleSelectDay} weekStore={this.state.weekStore} nowDate={this.state.nowDate} />
				    </div>
				</div>
			)
		}
		
}
})

var CalendarWeek = React.createClass({
	render: function(){
		var _selectDay = this.props.selectDay;
		var _weekStore = this.props.weekStore;
		var _selectType = this.props.selectType;
		var _now = this.props.nowDate.ymd;

		_now = String(_now).split('-');
		if(_now[1]<10){
			_now[1] = '0'+_now[1];
		}
		if(_now[2]<10){
			_now[2] = '0' + _now[2];
		}

		_now = _now[0] + '-' + _now[1] + '-' + _now[2]

		var cx = ReactAddons.classSet;
		var week = _weekStore.map(function(w, key){
			var day = w.map(function(d, key){
				var isWeek = function(){ if(d.date == 0 || d.date == 6){return true}else{return false} };
				var isWork = function(){ if(d.state == 1){return true} else{return false} };
				var isRest = function(){ if(d.state == 2){return true} else{return false} };
				if(_selectDay.length>1){
					var isSelect = (function(){ if(_selectDay[0] == d.ymd || _selectDay[1] == d.ymd){ return true }else{return moment(d.ymd).isBetween(_selectDay[0],_selectDay[1])}})();
				}else{
					var isSelect = (function(){ if(_selectDay.indexOf(d.ymd)>-1){return true}else{return false} })();
				}
				if(typeof(d.ymd) == 'undefined'){
					isSelect = false;
				}
				var className = cx({
					'calendar-day': true,
					'calendar-day-weeken':isWeek(),
					'calendar-day-rest': isRest(),
					'calendar-day-select-single': isSelect,
				});
				
				if(d.ymd == _now){
					d.day = "今天";
				}

				if(isWork()){
					return(
						<li key={key} className={className} data-date={d.ymd}>{d.day}<span className="calendar-day-state">班</span></li>
					)
				}else if(isRest()){
					return(
						<li key={key} className={className} data-date={d.ymd}>{d.day}<span className="calendar-day-state">休</span></li>
					)
				}else{
					return(
						<li key={key} className={className} data-date={d.ymd}>{d.day}</li>
					)
				}

			})
	

			return(
				<ul key={key} className="calendar-week">
	        		{day}
		        </ul>
			)
		});
		if(_selectType == 1){
			return(
				<div id="calendarBody" className="calendar-body" onClick={this.props.handleSelectSingleDay}>
		        	{week}
		        </div>
			)
		}else if(_selectType == 2){
			return(
				<div id="calendarBody" className="calendar-body" onClick={this.props.handleSelectMultipleDay}>
		        	{week}
		        </div>
			)
		}
		
	}
});

var CalendarShow = React.createClass({
	render: function(){
		var _weekStore = this.props.weekStore;
		var _now = this.props.nowDate.ymd;
		var that = this;

		_now = String(_now).split('-');
		if(_now[1]<10){
			_now[1] = '0'+_now[1];
		}
		if(_now[2]<10){
			_now[2] = '0' + _now[2];
		}

		_now = _now[0] + '-' + _now[1] + '-' + _now[2]

		var cx = ReactAddons.classSet;
		var week = _weekStore.map(function(w, key){
			var day = w.map(function(d, key){
				var isWeek = function(){ if(d.date == 0 || d.date == 6){return true}else{return false} };
				var isTimeout = function(){ if(d.state == 3){return true} else{return false} };
				var isSubmit = function(){ if(d.state == 2){return true} else{return false} };
				var isNormal = function(){ if(typeof(d.ymd) == 'undefined') {return false} else if(d.state == 1){return true}}
				
				var className = cx({
					'calendar-day': true,
					'calendar-day-timeout': isTimeout(),
					'calendar-day-nosubmit': isSubmit(),
					'calendar-day-normal': isNormal(),
					'calendar-day-weeken':isWeek(),
				});
				
				if(d.ymd == _now){
					d.day = "今天";
				}

				return(
					<li key={key} className={className} data-date={d.ymd} onClick={that.props.handleChoseDate}>{d.day}</li>
				)

			})
			return(
				<ul key={key} className="calendar-week">
	        		{day}
		        </ul>
			)
		});
		
		return(
			<div id="calendarBody" className="calendar-body">
	        	{week}
	        </div>
		)
		
		
	}
});

var CalendarNormal = React.createClass({
	render: function(){
		var _weekStore = this.props.weekStore;
		var _selectDay = this.props.selectDay;	

		var _now = this.props.nowDate.ymd;
		
		_now = String(_now).split('-');
		if(_now[1]<10){
			_now[1] = '0'+_now[1];
		}
		if(_now[2]<10){
			_now[2] = '0' + _now[2];
		}

		_now = _now[0] + '-' + _now[1] + '-' + _now[2]

		var cx = ReactAddons.classSet;
		var week = _weekStore.map(function(w, key){
			var day = w.map(function(d, key){
				var isWeek = function(){ if(d.date == 0 || d.date == 6){return true}else{return false} };
				var isSelect = function(){ if(_selectDay == d.ymd) {return true}else{return false} }
				var className = cx({
					'calendar-day': true,
					'calendar-day-weeken':isWeek(),
					'calendar-day-select-show':isSelect()
				});
				if(d.ymd == _now){
					d.day = "今天";
				}
				
				return(
					<li key={key} className={className} data-date={d.ymd}>{d.day}</li>
				)

			})
			return(
				<ul key={key} className="calendar-week">
	        		{day}
		        </ul>
			)
		});
		
		return(
			<div id="calendarBody" className="calendar-body"  onClick={this.props.handleSelectDay}>
	        	{week}
	        </div>
		)
		
		
	}
});

module.exports = Calendar;