var StoreCalendar = {
	getInitialState: function(){
		return(
			{
				toDay:{yyyy: '', mm: '', dd: '', ymd: '', md: ''},// 今日的日期对象 yyyy: 年 mm：月，dd：日 ymd：年月日（2016-01-20）md：月日（01-20）
				eachMonths: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],// 平年
				eachMonthsLeap: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],// 闰年
				monthEn: ['January ', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'],
				weeksArray:[] // 存储当前月份的日期
			}
			
		)
	}
}

module.exports = StoreCalendar;