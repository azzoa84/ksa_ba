function FingerTab(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.extObj = null;
	$.isCreate = false;
	$.childPanels = null;
	$.currIndex = 0;
	
	var e = document.createElement('div');
	e.id = $.id;
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.className = 'FingerTab';
	host.appendChild(e);

	$.addTab = function(panels) {
		if ($.isCreate) {
			return;
		}
		//console.log('addTab 4');
		
		$.childPanels = panels;

		var settings = {
			view: 'tabview',
			multiview: {
				animate: false,
				keepViews: true
			},
			type: 'clean',
			container: e.id,
			borderless: true,
			cells: [],
			
			tabbar: {
				/*tabOffset:10,*/
				height: 28,
				tabMargin: 5,
				yCount:3,
				on: {
					onChange: function(id) {
						var index = getRealId(id);
						$.currIndex = index;
						
						if (g_container != null && host.id == 'fpView') {
							if (g_container.fingertab_selectionchange != undefined) {
								g_container.fingertab_selectionchange(getRealId($.id), index);
							}
						}
						else if (g_popupStack && g_popupStack.has()) {
							g_popupStack.get().obj.fingertab_selectionchange(getRealId($.id), index);
						}
						else {
							if (g_currentModule != null) {
								if (g_currentModule.fingertab_selectionchange != undefined) {
									g_currentModule.fingertab_selectionchange(getRealId($.id), index);
								}
							}
						}
					},
					onItemClick: function(id, e) {
						if ($.firstTab) {
							if (jQuery(e.target).is($.firstTab)) {
								// 비선택모드인 경우 첫번째 탭을 강제로 비활성화 처리해 논 상태이기에
								// 선택한 탭이 첫번째 탭인 경우 다시 강제 활성화 처리를 해주어야 함
								$.firstTab.addClass('webix_selected');
								$.firstTabView.css('display', 'block');
							}
							$.firstTab = null;
						}
						
						var id = jQuery(e.target).attr('button_id');
						var index = (id ? getRealId(id) : 0);
						$.currIndex = index;
						
						if (g_container != null && host.id == 'fpView') {
							if (g_container.fingertab_click != undefined) {
								g_container.fingertab_click(getRealId($.id), index);
							}
						}
						else if (g_popupStack && g_popupStack.has()) {
							if (g_popupStack.get().obj && g_popupStack.get().obj.fingertab_click != undefined) {
								g_popupStack.get().obj.fingertab_click(getRealId($.id), index);
							}
						}
						else {
							if (g_currentModule != null) {
								if (g_currentModule.fingertab_click != undefined) {
									g_currentModule.fingertab_click(getRealId($.id), index);
								}
							}
						}					
					}
				}
			}
		}
		
		var containWidth = $.width;
		for (var i = 0; i < panels.length; i++) {
			if (!panels[i]['getType'] && panels[i].width) {
				containWidth -= panels[i].width;
			}
		}
		
		var tabWidth = Number(containWidth / panels.length).toFixed(0);
		
		for (var i = 0; i < panels.length; i++) {
			if (panels[i]['getType']) {
				var headerText = panels[i].getText() || 'Tab';
				var tabId = panels[i].id;
			} else {
				var headerText = panels[i].text;
				var tabId = panels[i].body.id;
			}
			
			var newTab = {
				width: panels[i].width || tabWidth,
				autowidth: true,
				header: headerText,
				body: {
					id: ($.id + '__' + i),
					view: 'htmlform',
					content: tabId
				}
			}
			settings.cells.push(newTab);
		}
		
		// 탭 생성
		$.extObj = webix.ui(settings);
		$.isCreate = true;

		/*
		$.extObj.on('removed', function (event) {
			var index = event.args.item;
			
			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingertab_ontabclose != undefined) {
					g_container.fingertab_ontabclose(getRealId($.id), index)
				}
			}
			else {
				if (g_currentModule != null) {
					if (g_currentModule.fingertab_ontabclose != undefined) {
						g_currentModule.fingertab_ontabclose(getRealId($.id), index);
					}
				}
			}
		});
		*/
	};

	$.getIdByIndex = function(index) {
		return $.extObj.getTabbar().config.options[index].id;
	}
	
	$.setEnableTabCloseButton = function(value) {
		$.extObj.jqxTabs({ 'showCloseButtons': value });
	}
	
	$.getTabPanel = function(index) {
		return $.childPanels[index];
	}
	
	$.setActiveTab = function(index) {
		var tabid = $.getIdByIndex(index);
		$.extObj.setValue(tabid);
	}	
	
	$.getActiveTab = function() {
		return $.currIndex;
	}

	$.hideTab = function(index) {
		if (typeof index === 'number') {
			$.extObj.getTabbar().hideOption($.getIdByIndex(index));
		}
	}

	$.showTab = function(index) {
		if (typeof index === 'number') {
			$.extObj.getTabbar().showOption($.getIdByIndex(index));
		}
	}
	
	$.setTabText = function(index, text) {
		var tabs = $.extObj.getTabbar();
		tabs.config.options[index].value = text;
		tabs.refresh();
	}

	$.showTabPage = function(index) {
		if (typeof index === 'number') {
			$.currIndex = index;
			$.extObj.getTabbar().setValue($.getIdByIndex(index));
		}
	}
	
	$.setVisible = function(visible) {
		if (visible) {
			$.extObj.show();
		} else {
			$.extObj.hide();
		}
	}
	
	// 탭 선택하지 않은 상태로 변경
	$.firstTab = null;
	$.firstTabView = null;
	$.setNonActiveMode = function() {		
		var sel = jQuery(this.ids);
		if ($.firstTab == null) {
			$.firstTab = sel.find('.webix_item_tab.webix_selected').removeClass('webix_selected');
			$.firstTabView = sel.find('.webix_multiview').find('.webix_view:visible[role="tabpanel"]');
			$.firstTabView.css('display', 'none');
		}
	}
	
	$.setSize = function(value) {
		$.extObj.define = ('height', value);
		$.extObj.resize();
	}
}

FingerTab.prototype.getType = function() {
	return 'Tab';
}

FingerTab.prototype.setProperty = function(x, y, width, height) {
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