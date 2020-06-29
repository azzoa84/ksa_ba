function fingerMultiScheduler(dispView, id, width, height) {
	var $ = this;
    $.id = dispView.getRealId() + '__' + id;
    $.ids = ('#' + $.id);
    $.name = id;
    $.width = width;
    $.height = height;
    $.dispView = dispView;
    $.startDate = '';
    $.mObjDataHandler = null;
    $.addHandler = function(objDataHandler) { this.mObjDataHandler = objDataHandler; };
    
    var config = getCalendarConfig();
    config.defaultView = 'basicWeek';
    config.header.left = '';
    config.header.right = 'today';
    config.firstDay = 1;
    config.eventOrder = 'eventnumber';
    
    // 스케줄 렌더링
    config.eventRender = function(event, element) {
    	var applyColor = fingerSchedulerColors[event.type] || '#5CB85C';
    	element.css('background-color', applyColor);
    	element.css('border-color', applyColor);
    	element.css('text-align', 'center');
    	element.css('cursor', 'pointer');
    	
    	if (!event.eventnumber) {
    		event.eventnumber = '1';
    	}
    };
    
    // 뷰 변경 (월간/주간 변경 또는 전월/다음월 변경시 호출)
    config.viewRender = function(view) {
    	var realId = jQuery(view.el[0]).parent().parent().attr("id");
    	var arrCalendar = jQuery('.multi-calendar');
    	
    	arrCalendar.each(function(index) {
    		if (index > 0) {
        		jQuery(this).find('.fc-toolbar').remove();
        		jQuery(this).find('.fc-head').remove();
        	}        	
        });
    	
    	if (g_currentModule != null) {
			if (g_currentModule.FingerMultiScheduler_view_display != undefined) {
				return g_currentModule.FingerMultiScheduler_view_display(realId, view);
			}
		}
    };
    
    // 날짜 선택
    config.dayClick = function(date, jsEvent, view) {
    	jQuery('.fc-current-obj').removeClass('fc-current-obj');
    	jQuery('.fc-sat').css('color', '#0054FF');
    	jQuery(this).addClass('fc-current-obj');
    	
    	var eventObj = {
    		'date': unmask(date.format()),
    		'view': view
    	}
		if (g_currentModule != null) {
			if (g_currentModule.fingermultischeduler_event_click != undefined) {
				return g_currentModule.fingermultischeduler_event_click(getRealId($.id), 'dayClick', eventObj, null);
			}
		}
    };
        
    // Ready();
    setTimeout(function() {    	
    	if (g_currentModule != null) {
    		if (g_currentModule.FingerMultiScheduler_ready != undefined) {
    			return g_currentModule.FingerMultiScheduler_ready(getRealId($.id));
    		}
    	}
    }, 300);
    
    $.render = function(cnt, date) {
    	var html = '';
        
        for (var i = 0; i < cnt ;i++) {
        	var className = "multi-calendar";
        	
        	if(i != 0) 			className += " sub_calendar";
        	if(i == (cnt - 1))  className += " last_calendar";
        	
        	html += '<div id="' + $.id + '_' + (i + 1) + '" class="' + className + '"></div>';
        }
        
        $.dispView.setHTML(html);
        
        if (date) {
        	config.defaultDate = date;
        }
        $.extObj = jQuery('.multi-calendar').fullCalendar(config);
            
        var height = 0;
        for (var i = 0; i < cnt ;i++) {
        	
        	if (i > 0) {
        		height = $.height;
        	} else {
        		height = $.height + 72;
        	}
        	
        	jQuery(this.ids + '_' + (i + 1)).fullCalendar('option', 'height', height);
        }
                
        jQuery('.multi-calendar .fc-prev-button').click(function(){
        	jQuery('.sub_calendar').fullCalendar('prev');
        	$.convertDate();
        	$.mObjDataHandler('PREV');
        });

        jQuery('.multi-calendar .fc-next-button').click(function(){
        	jQuery('.sub_calendar').fullCalendar('next');
        	$.convertDate();
        	$.mObjDataHandler('NEXT');
        });
        
        jQuery('.multi-calendar .fc-today-button').click(function(){
        	jQuery('.sub_calendar').fullCalendar('today');
        	$.convertDate();
        	$.mObjDataHandler('TODAY');
        });
    };
    
    $.setHeight = function(height) {
    	$.extObj.fullCalendar('option', 'height', height);
    };
    
    $.convertDate = function() {
    	var currentDate = $.extObj.fullCalendar("getDate");
		var date = new Date(currentDate);
        
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();
        $.startDate = yyyy + "" + (mm[1] ? mm : "0" + mm[0]) + "" + (dd[1] ? dd : "0" + dd[0]);
    }
}

fingerMultiScheduler.prototype.addEventSource = function(arrEvents) {
	for (var i = 0; i < arrEvents.length; i++) {
		var events = arrEvents[i];
		
		for (var j = 0; j < events.length; j++) {
			if (events[j].start && events[j].start.indexOf('-') == -1) {
				var sub8 = events[j].start.substr(0, 8);
				events[j].start = events[j].start.replace(sub8, (sub8.substr(0, 4) + '-' + sub8.substr(4, 2) + '-' + sub8.substr(6, 2)));
			}
			if (events[j].end && events[j].end.indexOf('-') == -1) {
				var sub8 = events[j].end.substr(0, 8);
				events[j].end = events[j].end.replace(sub8, (sub8.substr(0, 4) + '-' + sub8.substr(4, 2) + '-' + sub8.substr(6, 2)));
			}
			if (events[j].end && events[j].start != events[j].end && events[j].end.length == 10) {
				// end 일자에 시간이 없는 경우 캘린더 상에 하루 전일까지만 표시된다.
				// end 일자에 시간이 없는 경우 캘린더 표시를 위해 임의로 하루 늘려줌
				var tmp = getCalcDate(unmask(events[j].end), 1);
				events[j].end = tmp.substr(0, 4) + '-' + tmp.substr(4, 2) + '-' + tmp.substr(6, 2);
			}
		}
		
		if (events[0].index) {
			jQuery(this.ids + '_' + events[0].index).fullCalendar('addEventSource', events);
		} else {
			jQuery(this.ids + '_' + (i + 1)).fullCalendar('addEventSource', events);
		}
	}
}

fingerMultiScheduler.prototype.removeEvents = function(filterFunc) {
	if (filterFunc) {
		this.extObj.fullCalendar('removeEvents', filterFunc);
	} else {
		this.extObj.fullCalendar('removeEvents');
	}
}

fingerMultiScheduler.prototype.changeOptions = function(options) {
	this.extObj.fullCalendar('option', options);
}

fingerMultiScheduler.prototype.getStartDate = function() {
	return this.startDate;
}

fingerMultiScheduler.prototype.setStyle = function(name, objValue) {
	jQuery('.multi-calendar').find(name).css(objValue);
}