function FingerScheduler(host, id, type, schedulerInfo, sourceInfo, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.ids = ('#' + $.id);
    $.name = id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    //$.schedulerInfo = schedulerInfo;
    //$.sourceInfo = sourceInfo;
    
    var e = document.createElement('div');
    e.id = $.id;
    e.style.position = 'absolute';
    e.style.width = $.width + 'px';
    e.style.height = $.height + 'px';
    e.style.left = $.x + 'px';
    e.style.top = $.y + 'px';
    e.style.overflow = 'auto';
	
    host.appendChild(e);
    
    var config = getCalendarConfig();
    
    // 스케줄 렌더링
    config.eventRender = function(event, element) {
    	var applyColor = fingerSchedulerColors[event.type] || '#5CB85C';
    	element.css('background-color', applyColor);
    	element.css('border-color', applyColor);
    	element.css('text-align', 'center');
    	element.css('cursor', 'pointer');
    };
    
    // 스케줄 선택
    config.eventClick = function(event, jsEvent, view) {
    	var eventDate = event.start.format();
    	
    	// 스케줄 선택시에도 날짜선택시와 동일하게 백그라운드 색상 변경.
    	jQuery('.fc-current-obj').removeClass('fc-current-obj');
    	jQuery('td[data-date=' + eventDate.substr(0, 10) + ']').addClass('fc-current-obj');
    	
    	var eventObj = {
    		'date': unmask(eventDate),
    		'data': event,
    		'view': view
    	}
		if (g_currentModule != null) {
			if (g_currentModule.fingerscheduler_event_click != undefined) {
				return g_currentModule.fingerscheduler_event_click(getRealId($.id), 'eventClick', eventObj, null);
			}
		}
    };
    
    // 날짜 선택
    config.dayClick = function(date, jsEvent, view) {
    	jQuery('.fc-current-obj').removeClass('fc-current-obj');
    	jQuery(this).addClass('fc-current-obj');
    	
    	var eventObj = {
    		'date': unmask(date.format()),
    		'view': view
    	}
		if (g_currentModule != null) {
			if (g_currentModule.fingerscheduler_event_click != undefined) {
				return g_currentModule.fingerscheduler_event_click(getRealId($.id), 'dayClick', eventObj, null);
			}
		}
    };

    // 뷰 변경 (월간/주간 변경 또는 전월/다음월 변경시 호출)
    config.viewRender = function(view) {
    	if (g_currentModule != null) {
			if (g_currentModule.fingerscheduler_view_display != undefined) {
				return g_currentModule.fingerscheduler_view_display(getRealId($.id), view);
			}
		}
    }
    
    // 캘린더 생성
    $.extObj = jQuery(e).fullCalendar(config);
    // 캘린더 헤더 이벤트버튼 (추가) 삽입
    jQuery(e).on("regSchedule", function (event, action) {
    	var obj = {
    		'action': action
    	}
		if (g_currentModule != null) {
			if (g_currentModule.fingerscheduler_event_reg != undefined) {
				return g_currentModule.fingerscheduler_event_reg(getRealId($.id), obj);
			}
		}
    });
    
    // Ready();
    setTimeout(function() {
		jQuery('.fc-reg-button').click(function() { $.extObj.trigger('regSchedule', 'reg'); });
		jQuery('.fc-mod-button').click(function() { $.extObj.trigger('regSchedule', 'mod'); });
		jQuery('.fc-rem-button').click(function() { $.extObj.trigger('regSchedule', 'rem'); });
    	
    	if (g_currentModule != null) {
    		if (g_currentModule.fingerscheduler_ready != undefined) {
    			return g_currentModule.fingerscheduler_ready(getRealId($.id));
    		}
    	}
    }, 300);
    
    $.showRegButton = function(isShow) {
    	isShow ? jQuery('.fc-reg-button').css("visibility", "visible") : jQuery('.fc-reg-button').css("visibility", "hidden");
    };
    
    $.showModButton = function(isShow) {
    	isShow ? jQuery('.fc-mod-button, .fc-rem-button').css("visibility", "visible") : jQuery('.fc-mod-button, .fc-rem-button').css("visibility", "hidden");
    };
    
    $.changeOptions = function(options) {
    	$.extObj.fullCalendar('option', options);
    };
    
    $.setDefaultView = function(viewName) {
    	$.extObj.fullCalendar('option', {'defaultView': viewName});
    };
    
    $.setAgendaWeek = function(isAgendaWeek) {
    	var header = $.extObj.fullCalendar('option', 'header');
    	header.right = 'today month,agendaWeek';
    	
    	$.extObj.fullCalendar('option', {'header': header});
    	
    	if (isAgendaWeek) {
    		$.extObj.fullCalendar('changeView', 'agendaWeek');
    	}
    };
    
    $.setBasicWeek = function(isBasciWeek) {
    	var header = $.extObj.fullCalendar('option', 'header');
    	header.left = '';
    	header.center = 'prev,title,next';
    	header.right = 'today ';
    	
    	$.extObj.fullCalendar('option', {'header': header});
    	jQuery($.ids).find('.fc-toolbar').find('.fc-right').css('margin-right', '10px');
    	jQuery($.ids).find('.fc-toolbar').find('.fc-center').css('margin-left', '45px').css('margin-right', '0px');
    	
    	if (isBasciWeek) {
    		$.extObj.fullCalendar('changeView', 'basicWeek');
    	}
    };
    
    // 회의실예약 전용
    $.setMeetingRoomWeek = function() {
    	var header = $.extObj.fullCalendar('option', 'header');
    	header.right = 'today month,agendaWeek';
    	
    	$.extObj.fullCalendar('option', 
    			{'header': header,
    			 'allDaySlot': false
    			});
    	$.extObj.fullCalendar('changeView', 'agendaWeek');
    	
    	jQuery($.ids).find('.fc-view-container').addClass('ext_meeting_room');
    	//jQuery($.ids).find('.fc-view-container').find('.fc-body').find('.fc-widget-content').find('.fc-day-grid').css('display', 'none');
    	//jQuery($.ids).find('.fc-view-container').find('.fc-body').find('.fc-widget-content').find('.fc-content').css('display', 'none');
    };
    
    $.setHeight = function(height) {
    	$.extObj.fullCalendar('option', 'height', height);
    };
    
    $.setEventOrder = function(param) {
    	$.extObj.fullCalendar('option', 'eventOrder', param);
    };
}

FingerScheduler.prototype.getType = function() {
	return 'Scheduler';
}

FingerScheduler.prototype.addEventSource = function(events) {
	for (var i = 0; i < events.length; i++) {
		if (events[i].start && events[i].start.indexOf('-') == -1) {
			var sub8 = events[i].start.substr(0, 8);
			events[i].start = events[i].start.replace(sub8, (sub8.substr(0, 4) + '-' + sub8.substr(4, 2) + '-' + sub8.substr(6, 2)));
		}
		if (events[i].end && events[i].end.indexOf('-') == -1) {
			var sub8 = events[i].end.substr(0, 8);
			events[i].end = events[i].end.replace(sub8, (sub8.substr(0, 4) + '-' + sub8.substr(4, 2) + '-' + sub8.substr(6, 2)));
		}
		if (events[i].end && events[i].start != events[i].end && events[i].end.length == 10) {
			// end 일자에 시간이 없는 경우 캘린더 상에 하루 전일까지만 표시된다.
			// end 일자에 시간이 없는 경우 캘린더 표시를 위해 임의로 하루 늘려줌
			var tmp = getCalcDate(unmask(events[i].end), 1);
			events[i].end = tmp.substr(0, 4) + '-' + tmp.substr(4, 2) + '-' + tmp.substr(6, 2);
		}
	}
	this.extObj.fullCalendar('addEventSource', events);
}

FingerScheduler.prototype.removeEvents = function(filterFunc) {
	if (filterFunc) {
		this.extObj.fullCalendar('removeEvents', filterFunc);
	} else {
		this.extObj.fullCalendar('removeEvents');
	}
}

FingerScheduler.prototype.setProperty = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    var e = document.getElementById(this.id);
    e.style.left = x + 'px';
    e.style.top = y + 'px';
    e.style.width = width + 'px';
    e.style.height = height + 'px';
    delete e;
}

FingerScheduler.prototype.getId = function()
{
	return this.ids;
}

FingerScheduler.prototype.setStyle = function(name, objValue) {
	jQuery(this.ids).find(name).css(objValue);
}