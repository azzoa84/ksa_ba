function FingerPanel(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.isTitle = false;
	$.dispText = '';
	$.panelHeaderHeight = '45';
	$.clickBtn = null;
	$.border = true;
	$.extObj = null;
	$.dispGrid = null;
	$.children = [];
	$.headerImagePath = null;

	$.click = function(btnId, event) {
		var eventBtn = jQuery(event.target);
		eventBtn.toggleClass("on");
		
		if ('btnFilter' == getRealId(btnId)) {
			if ($.dispGrid && $.dispGrid.setFilterView) {				
				$.dispGrid.setFilterView();
			}
		}
		
		if ('btnExcelDown' == getRealId(btnId)) {
			if ($.dispGrid && $.dispGrid.isExcelDown) {
				$.dispGrid.excelDown($.dispText);
			}
		}
		
		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingerpanel_button_click != undefined) {
				g_container.fingerpanel_button_click(getRealId($.id), getRealId(btnId))
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			g_popupStack.get().obj.fingerpanel_button_click(getRealId($.id), getRealId(btnId));
		}
		else {
			if (g_currentModule != null) {
				if (g_currentModule.fingerpanel_button_click != undefined) {
					g_currentModule.fingerpanel_button_click(getRealId($.id), getRealId(btnId));
				}
			}
		}
	}

	$.mouseDown = function() {
		if (g_currentGrid != null) {
			g_currentGrid.editStop();
		}
	}

	var e = document.createElement('div');
	e.id = $.id;
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.style.backgroundColor = 'transparent';
	e.className = 'FingerPanel';
	
	var h = document.createElement('div');
	h.style.width = $.width + 'px';
	h.style.textAlign = 'left';
	h.style.visibility = 'collapse';
	h.className = 'FingerPanelHeader';
 
	var ht = document.createElement('div');
	ht.style.width = '100%';
	ht.style.zIndex = '0';
	ht.className = 'FingerHeaderTitle';
	h.appendChild(ht);
	
	var hb = document.createElement('div');
	hb.style.width = $.width + 'px';
	hb.style.zIndex = '2';
	hb.style.paddingTop = '5px';
	hb.className = 'FingerPanelHeaderButton';
	h.appendChild(hb);
	
	e.appendChild(h);

	var l = document.createElement('div');
	l.style.position = 'relative';
	l.style.float = 'left';
	l.style.width = $.width + 'px';
	l.className = 'FingerPanelLine';
	
	var li = document.createElement('div');
	li.style.position = 'relative';
	li.style.float = 'left';
	li.style.width = ($.width - 10)+ 'px';
	li.style.left = '5px';
	li.className = 'FingerPanelLineInner';

	l.appendChild(li);
	
	e.appendChild(l);
	
	var b = document.createElement('div');
	b.style.position = 'relative';
	b.style.float = 'left';
	b.style.width = $.width + 'px';
	b.style.height = $.height - $.panelHeaderHeight + 'px';
	b.style.backgroundColor = 'transparent';
	b.className = 'FingerPanelBody';
	
	e.appendChild(b);

	host.appendChild(e);

	e = null;
	h = null;
	b = null;
	l = null;
	li = null;
	
	$.setGrid = function(grid) {
		$.dispGrid = grid;
	};
	
	$.setButtonOnClear = function(action) {
		if (action === undefined) {
			// 패널 버튼 활성화('on') 해제 (전체버튼)
			jQuery($.ids).find('.FingerPanelHeader').find('.FingerPanelHeaderButton').find('div').removeClass('on');
		} else {
			// 지정한 버튼만 활성화('on') 해제
			// filter -> action_filter 클래스
			var button_class = ('action_' + action);
			jQuery($.ids).find('.FingerPanelHeader').find('.FingerPanelHeaderButton').find(('div'+'.'+button_class)).removeClass('on');
		}
	};

	$.setButtonAction = function(id, action, width) {
		var e = jQuery(('#' + $.id + '__' + id));
		
		switch (action) {
			case 'custom':
				e.html('<span>'+e.attr('title')+'</span>');
				e.addClass(('action_custom_base'));
				break;
			case 'add':
			case 'new':
			case 'save':
			case 'temp':
			case 'load':
			case 'modify':
			case 'delete':
			case 'submit':
			case 'cancel':
			case 'preview':
			case 'copy':
				e.addClass(('action_base'));
				break;
				
			case 'print':
			case 'filter':
			case 'search':
			case 'excel_up':
			case 'excel_down':
			case 'upload':
			case 'download':
				e.addClass(('action_base_icon'));
				break;

			default:
				break;
		}
		
		e.addClass(('action_' + action));
		if(width) e.width(width);
	}

	$.addButton = function(id, title, isFirst) {
		var e = document.getElementById($.id);
		var tempSize = getSize(title) + 20;

		var a = document.createElement('div');
		a.id = $.id + '__' + id;
		a.title = title;

		var func = function() { $.click($.id + '__' + id, event) };

		if (a.addEventListener) {
			a.addEventListener("click", func, false);
			a.addEventListener("mousedown", function() { if (g_currentGrid != null) g_currentGrid.editStop(); }, false);
		} else if (a.attachEvent) {
			a.attachEvent("onclick", func);
			a.attachEvent("mousedown", function() { if (g_currentGrid != null) g_currentGrid.editStop(); });
		}
		
		if (isFirst) {
			if (e.childNodes[0].childNodes[1].firstChild) {
				e.childNodes[0].childNodes[1].insertBefore(a, e.childNodes[0].childNodes[1].firstChild);
			} else {
				e.childNodes[0].childNodes[1].appendChild(a);
			}
		} else {
			e.childNodes[0].childNodes[1].appendChild(a);
		}
		a = null;
		e = null;
	}
	
	$.addButtons = function(btnList) {
		if (!btnList || btnList.length == 0)
			return;
		
		for (var i = 0; i < btnList.length; i++) {
			var btnId = btnList[i];
			var action = btnId.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();}).replace('btn_', '');
			
			$.addButton(btnId, '');
			$.setButtonAction(btnId, action);
		}
	}

	$.clearButton = function() {
		var e = document.getElementById($.id);

		while (e.childNodes[0].childNodes[1].hasChildNodes()) {
			e.childNodes[0].childNodes[1].removeChild(e.childNodes[0].childNodes[1].lastChild);
		}

		e = null;
	}
	
	$.showButton = function(isShow) {
		var e = document.getElementById($.id);
		
		var children = e.childNodes[0].childNodes[1].childNodes;
		
		for (var i=0; i < children.length; i++) {
			if (isShow) {
				children[i].style.visibility = 'visible';
			} else {
				children[i].style.visibility = 'hidden';
			}
		}
		
		e = null;
	}
	
	$.disableButton = function(option) {
		var e = document.getElementById($.id);
		
		if (e.childNodes[0].childNodes[1].hasChildNodes()) {
			var buttons = e.childNodes[0].childNodes[1].childNodes;
			
			for (var i = 0; i < buttons.length; i++) {
				if (!option)
					return;
				
				if (option == 'all') {
					buttons[i].style.pointerEvents = 'none';
					buttons[i].style.opacity = '0.4';
				} else {
					for (var j = 0; j < option.length; j++) {
						if (buttons[i].id.search(option[j]) > -1) {
							buttons[i].style.pointerEvents = 'none';
							buttons[i].style.opacity = '0.4';							
						}
					}
				}
			}
		}
		
		e = null;
	}
	
	$.enableButton = function(option) {
		var e = document.getElementById($.id);
		
		if (e.childNodes[0].childNodes[1].hasChildNodes()) {
			var buttons = e.childNodes[0].childNodes[1].childNodes;
			
			for (var i = 0; i < buttons.length; i++) {
				if (!option)
					return;
				
				if (option == 'all') {
					buttons[i].style.pointerEvents = 'all';
					buttons[i].style.opacity = '1';
				} else {
					for (var j = 0; j < option.length; j++) {
						if (buttons[i].id.search(option[j]) > -1) {
							buttons[i].style.pointerEvents = 'all';
							buttons[i].style.opacity = '1';							
						}
					}
				}
			}
		}
		
		e = null;
	}	

	$.setEnable = function(enable) {
		var list = this.children;

		if (!list || list.length == 0)
			return;
		
		for (var i = 0; i < list.length; i++) {
			var m = list[i];
			switch (m.getType()) {
				case 'TextEdit':
				case 'MemoEdit':
				case 'ButtonEdit':
				case 'DateEdit':
				case 'SpinEdit':
				case 'CheckBox':
				case 'RadioBox':
				case 'ComboBox':
				case 'WebEditor':
					m.setEnable(enable);
					break;
		
				default:
					break;
			}
		}
	}
	
	$.setReadOnly = function(readOnly) {
		var list = this.children;
		
		if (!list || list.length == 0)
			return;
		
		for (var i = 0; i < list.length; i++) {
			var m = list[i];
			switch (m.getType()) {
				case 'TextEdit':
				case 'MemoEdit':
				case 'ButtonEdit':
				case 'DateEdit':
				case 'SpinEdit':
				case 'CheckBox':
				case 'RadioBox':
				case 'ComboBox':
				case 'WebEditor':
					m.setReadOnly(readOnly);
					break;
		
				default:
					break;
			}
		}
	}
	
	$.validateControls = function() {
		var list = this.children;
		
		if (!list || list.length == 0)
			return true;
		
		var validList = [];
		for (var i = 0; i < list.length; i++) {
			var m = list[i];
			if (m.allowBlank !== undefined && m.allowBlank === false) {
				validList.push(m);
			}
		}
		return validateControls(validList);
	}	
}

FingerPanel.prototype.setHeaderImage = function(imagePath) {
	this.headerImagePath = './fingerPlatform/images/' + imagePath;
}

FingerPanel.prototype.setProperty = function(x, y, width, height, isMain) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	var e = document.getElementById(this.id);
	e.style.left = x + 'px';
	e.style.top = y + 'px';
	
	this.setSize(width, height, isMain);	
	delete e;
}

FingerPanel.prototype.setSize = function(width, height, isMain) {
	var sel = jQuery(this.ids);	
	var panBody = sel.children('.FingerPanelBody');
	
	if (width) {
		this.width = width;
		sel.width(width);
		panBody.width(width);
	}
	if (height) {
		this.height = height;
		sel.height(height);
		panBody.height((height - Number(this.panelHeaderHeight)));
	}
	
	if (isMain) {
		// 메인패널 (최상위 패널)인 경우 탭 컨테이너 사이즈도 변경
		// 탭 컨테이너 사이즈를 변경하는 것으로 끝나는 것이 아니라 상위에 둘러썬 여러 div 값들이 전부 height 를 변경해주어야되어 처리가 어려움
		if (height) { 
			//sel.parent().height(height);
			jQuery(this.ids).parents('#fpViewHost').css('height', (height + 50) + 'px');
			jQuery(this.ids).parentsUntil('#fpView').css('height', height + 'px');
		};
	}
}

FingerPanel.prototype.setBottomLine = function(value) {
	/*
	var e = document.getElementById(this.id);

	if (value == true)
		e.childNodes[0].style.borderBottom = '1px solid #e5e5e5';
	else
		e.childNodes[0].style.borderBottom = 'none';

	delete e;
	*/
}

FingerPanel.prototype.setBorder = function(value) {
	var e = document.getElementById(this.id);

	if (value == true) {
		this.border = true;
		
		if (this.isTitle) {
			e.childNodes[1].style.border = 'none';
			e.childNodes[2].style.border = '1px solid #e5e5e5';			
		} else {
			e.style.border = '1px solid #e5e5e5';
			e.childNodes[1].style.border = 'none';		
		}
	}
	else {
		this.border = false;
		
		if (this.isTitle) {
			e.childNodes[1].style.border = 'none';
			e.childNodes[2].style.border = 'none';		
		} else {
			e.style.border = 'none';
			e.childNodes[1].style.border = 'none';
		}
	}

	delete e;
}

FingerPanel.prototype.setPanelHeaderWidth = function(value) {
	/*
	var e = document.getElementById(this.id);

	e.childNodes[0].childNodes[0].style.width = value;

	delete e;
	*/
}

FingerPanel.prototype.setPadding = function(top, right, bottom, left) {
	var e = document.getElementById(this.id);

	e.style.paddingTop = top + 'px';
	e.style.paddingRight = right + 'px';
	e.style.paddingBottom = bottom + 'px';
	e.style.paddingLeft = left +'px';

	e.childNodes[0].style.paddingTop = top + 'px';
	e.childNodes[0].style.paddingRight = right + 'px';
	e.childNodes[0].style.paddingBottom = bottom + 'px';
	e.childNodes[0].style.paddingLeft = left + 'px';
	
	delete e;
}

FingerPanel.prototype.getType = function() {
	return 'Panel';
}

FingerPanel.prototype.clear = function() {
	var list = this.children;
	
	if (!list || list.length == 0)
		return;
	
	for (var i = 0; i < list.length; i++) {
		var m = list[i];
		switch (m.getType()) {
			case 'TextEdit':
			case 'MemoEdit':
			case 'ButtonEdit':
				if (m['defaultValue'] !== undefined && m['defaultValue'] != null) {
					m.setText(m['defaultValue']);
				} else {
					m.setText('');
				}
				break;
			
			case 'DateEdit':
			case 'SpinEdit':
			case 'CheckBox':
			case 'RadioBox':
			case 'ComboBox':
			case 'WebEditor':
				if (m['defaultValue'] !== undefined && m['defaultValue'] != null) {
					m.setValue(m['defaultValue']);
				} else {
					m.setValue('');
				}
				break;
	
			default:
				break;
		}
	}
}

FingerPanel.prototype.relocateChildIndex = function(startIndex) {
	var tabIndex = startIndex || 1;
	var list = this.children;
	
	if (!list || list.length == 0)
		return;
	
	list.sort(function (a, b) {
		if (a.y > b.y) {
			return 1;
		}
		if (a.y < b.y) {
			return -1;
		}
		if (a.y === b.y) {
			if (a.x > b.x) {
				return 1;
			}
			if (a.x < b.x) {
				return -1;
			}
		}
		return 0;
	});
	
	for (var i = 0; i < list.length; i++) {
		var m = list[i];
		switch (m.getType()) {
			case 'TextEdit':
			case 'MemoEdit':
			case 'ButtonEdit':
			case 'DateEdit':
			case 'SpinEdit':
			case 'CheckBox':
			case 'RadioBox':
			case 'ComboBox':
				if (m['setTabIndex']) {
					m.setTabIndex(tabIndex);
				}
				break;
	
			default:
				break;
		}
		tabIndex++;
	}
}

FingerPanel.prototype.add = function(item) {
	this.children.push(item);
	
	var e = document.getElementById(this.id);
	var d = document.getElementById(item.id);
	e.childNodes[2].appendChild(d);

	delete d;
	delete e;
}

FingerPanel.prototype.addOnHeader = function(item) {
	var e = document.getElementById(this.id);
	var d = document.getElementById(item.id);
	
	e.childNodes[0].childNodes[1].appendChild(d);

	delete d;
	delete e;
}

FingerPanel.prototype.remove = function(item) {
	var e = document.getElementById(this.id);
	var d = document.getElementById(item.id);
	e.childNodes[1].removeChild(d);
	
	delete d;
	delete e;
}

FingerPanel.prototype.addFrame = function(item) {
	var e = document.getElementById(this.id);
	var d = document.getElementsByName(item.name)[0];
	e.childNodes[1].appendChild(d);

	delete d;
	delete e;
}

FingerPanel.prototype.get = function(index) {
	var e = document.getElementById(this.id);
	var result = e.childNodes[1].childNodes[index].id;   

	delete e;

	try {
		return result;
	} finally {
		result = null;
	}
}

/**
 * 그리드에서 접근하는 경우 isGridAccess 값이 true
 */
FingerPanel.prototype.setText = function(text, isGridAccess) {
	if (text == null || text == '') {
		//e.childNodes[1].style.border = 'none';
		return;
	}
	this.isTitle = true;
	
	if (!isGridAccess) {
		this.dispText = text;
	}

	var title = null;

	if (this.headerImagePath == null) {
		title = '<h3><i></i>' + text + '</h3>';
	}
	else {
		title = '<img src="' + this.headerImagePath + '" style="width:33px; height:33px; display:inline-block; vertical-align:middle;"/><span style="display:inline-block; vertical-align:middle;"><font style="font: 15px Nanum Gothic; font-weight:bold; color:#454544">&nbsp;' + text + '</font></span>';
	}

	var e = document.getElementById(this.id);

	e.childNodes[0].style.height = '45px';
	e.childNodes[0].style.visibility = 'visible';

	if (this.border) {
		e.childNodes[0].style.border = '1px solid #e5e5e5';
		e.childNodes[0].style.borderBottom= 'none';
		e.childNodes[1].style.height = '2px';
		e.childNodes[1].style.border = '1px solid #e5e5e5';	
		e.childNodes[1].style.borderBottom = 'none';
		e.childNodes[2].style.border = '1px solid #e5e5e5';
		e.childNodes[1].childNodes[0].style.borderTop = '1px solid #e5e5e5';
	}
	else {
		e.childNodes[2].style.border = 'none';
	}

	e.childNodes[0].childNodes[0].style.paddingLeft = '5px';
	e.childNodes[0].childNodes[0].style.height = '35px';
	e.childNodes[0].childNodes[0].style.top = '7px';
	e.childNodes[0].childNodes[0].innerHTML = title;

	delete title;
	delete e;
}

FingerPanel.prototype.hideText = function() {
	var e = document.getElementById(this.id);
	
	e.childNodes[0].style.display = 'none';
	e.childNodes[1].style.border = 'none';
	e.childNodes[2].style.border = 'none';

	delete e;
}

FingerPanel.prototype.getText = function() {
	return this.dispText;
}

FingerPanel.prototype.setPanelHeaderVisible = function(visible) {
	var e = document.getElementById(this.id);

	if (visible == true)
		e.childNodes[0].style.visibility = 'visible';
	else
		e.childNodes[0].style.visibility = 'collapse';

	delete e;
}

FingerPanel.prototype.setVisible = function(visible) {
	var e = document.getElementById(this.id);

	if (visible == true)
		e.style.display = 'block';
	else
		e.style.display = 'none';

	delete e;
}

FingerPanel.prototype.setPanelHeaderBackgroundColor = function(color) {
	/*
	var e = document.getElementById(this.id);

	e.childNodes[0].childNodes[0].style.backgroundColor = color;

	delete e;
	*/
}

FingerPanel.prototype.setPanelHeaderColor = function(color) {
	var e = document.getElementById(this.id);

	e.childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.color = color;

	delete e;
}

FingerPanel.prototype.setBackgroundColor = function(color) {
	var e = document.getElementById(this.id);

	e.childNodes[1].style.backgroundColor = color;

	delete e;
}

FingerPanel.prototype.setExpander = function(value) {
	var e = document.getElementById(this.id);
	
	if (value) {
		e.childNodes[1].style.visibility = 'visible';
	}
	else {
		e.childNodes[1].style.visibility = 'collapse';
	}

	delete e;
}

FingerPanel.prototype.setTitleType = function(value) {
	var selector = jQuery(this.ids);

	if (value == 'SMALL') {
		selector.find('.FingerHeaderTitle').find('h3').css('font-size', '15px');
		selector.find('.FingerHeaderTitle').find('h3').find('i').css('height', '17px');
	}
	else {
		selector.find('.FingerHeaderTitle').find('h3').css('font-size', '18px');
		selector.find('.FingerHeaderTitle').find('h3').find('i').css('height', '21px');
	}
}

FingerPanel.prototype.isEmphasis = function(value) {
	var e = document.getElementById(this.id);
	
	if (value) {
		e.style.borderStyle = 'solid';
		e.style.borderWidth = '1px';
		e.style.borderColor = '#808080';
		e.style.backgroundColor = '#EFEFEF';
		e.style.borderRadius = '4px';
	}
}

FingerPanel.prototype.setScroll = function(value) {
	var selector = jQuery(this.ids);

	if (value) {
		selector.children('.FingerPanelBody').css('overflow', 'auto');
	}
}

FingerPanel.prototype.getPanelId = function() {
	return this.ids;
}