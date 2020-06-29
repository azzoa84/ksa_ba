function FingerTree(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.treeData = null;
	$.treeCoreData = null;
	$.treeMode = 'basic';

	var e = document.createElement('div');
	e.id = $.id;
	e.style.position = 'absolute';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.style.overflow = 'auto';

	host.appendChild(e);
	
	// 기본 트리 세팅
	// 체크박스트리로 변경시 showCheckbox() 사용
	var settings = {
		'core': {
			'themes': {
				'name': 'proton',
				'responsive': false
			},
			'multiple': false,
			'animation': 100
		},
		'types': {},
		'events': {},
		
		'plugins': ["search", "checkbox", "sort"],
		
		'search': {
			"case_insensitive": true,
			"show_only_matches" : true
		},
		
		'checkbox': {
			"visible": false,
			"three_state": false, // 부모노드 체크시, 자식노드 전체 체크
			"keep_selected_style" : true
		},
		
		'sort': function(a, b) {
			var a1 = this.get_node(a) ? this.get_node(a).original : null;
			var b1 = this.get_node(b) ? this.get_node(b).original : null;
			
			if (a1 && b1 && a1.sort !== undefined && b1.sort !== undefined && a1.sort != null && b1.sort != null) {
				return (a1.sort > b1.sort) ? 1 : ((a1.sort < b1.sort) ? -1 : 0);
			} else {
				return 0;
			}
		}
	};
	
	$.showCheckbox = function(type) {	// type=false : 부모노드 체크시 자식노드 체크, type=true : 부모노드 체크시 자식노드 체크X
		try {
			if ($.treeMode == 'checkbox') {
				$.extObj.jstree("show_checkboxes");
			} 
			else {
				settings.core.multiple = true;
				settings.checkbox.visible = true;
				settings.checkbox.three_state = !type ? true : false;
				settings.checkbox.keep_selected_style = false;
				
				$.extObj.jstree("destroy");
				$.extObj = jQuery(e).jstree(settings);
				$.bindTreeEvents();
				
				$.treeMode = 'checkbox';
				
				if ($.treeCoreData && $.treeCoreData.length > 0) {
					$.extObj.jstree(true).settings.core.data = $.treeCoreData;
					$.extObj.jstree(true).refresh(false, true);
				}
			}
		} catch (err) {
			console.log('FingerTree showCheckbox() : ' + err.message);
		}
	};

	$.hideCheckbox = function() {
		if ($.treeMode == 'checkbox') {
			this.extObj.jstree("hide_checkboxes");
		}
		else {
			console.log('FingerTree hideCheckbox() : 체크박스 트리가 아닙니다.');
			return;
		}
	};
	
	/**
	 * 트리 데이터 로드 
	 */
	$.load = function(data, colId, parentColId, valueColId, icoId, sortId) {
		$.treeData = [];
		
		var tree = [];
		var icon_dir = "./fingerPlatform/images/jstree/";
		
		if (data.length)
		{
			for (var i = 0; i < data.length; i++)
			{
				$.treeData[i] = {};
				$.treeData[i]['nkeyid'] = data[i][colId];
				
				for (var j in data[i]) {
					$.treeData[i][j] = data[i][j];
				}

				var ico = (icon_dir + 'tree_ico' + (data[i][icoId] || '1') + '.png');
				var parent = (data[i][parentColId] || '#');
				
				tree.push({'id':data[i][colId], 'text':data[i][valueColId], "icon": ico, 'parent':parent, 'sort':data[i][sortId], 'state':{'opened':false, 'selected': false}});
			}
		}
		
		$.treeCoreData = tree;
		$.extObj.jstree(true).settings.core.data = tree;
		$.extObj.jstree(true).refresh();
	}

	$.dispose = function() {
	}	
	
	$.bindTreeEvents = function() {
		$.extObj.bind("refresh.jstree", function(event) {
			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingertree_refresh != undefined) {
					g_container.fingertree_refresh(getRealId($.id));
				}
			}
			else if (g_popupStack && g_popupStack.has()) {
				g_popupStack.get().obj.fingertree_refresh(getRealId($.id));
			}
			else {
				if (g_currentModule != null) {
					if (g_currentModule.fingertree_refresh != undefined) {
						g_currentModule.fingertree_refresh(getRealId($.id));
					}
				}
			}
		});
		
		$.extObj.bind("select_node.jstree deselect_node.jstree", function(event, data) {
			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingertree_select != undefined) {
					g_container.fingertree_select(getRealId($.id), data.node);
				}
			}
			else if (g_popupStack && g_popupStack.has()) {
				g_popupStack.get().obj.fingertree_select(getRealId($.id), data.node);
			}
			else {
				if (g_currentModule != null) {
					if (g_currentModule.fingertree_select != undefined) {
						g_currentModule.fingertree_select(getRealId($.id), data.node);
					}
				}
			}
		});

		$.extObj.bind("dblclick.jstree", function(event) {
			var node = jQuery(event.target).closest("li");
			var id = node.attr("id");
			
			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingertree_dblclick != undefined) {
					g_container.fingertree_dblclick(getRealId($.id), id);
				}
			}
			else if (g_popupStack && g_popupStack.has()) {
				g_popupStack.get().obj.fingertree_dblclick(getRealId($.id), id);
			}
			else {
				if (g_currentModule != null) {
					if (g_currentModule.fingertree_dblclick != undefined) {
						g_currentModule.fingertree_dblclick(getRealId($.id), id);
					}
				}
			}
		});
	};
	
	// 트리 생성
	$.extObj = jQuery(e).jstree(settings);
	// 이벤트 연결
	$.bindTreeEvents();
}

FingerTree.prototype.getType = function() {
	return 'Tree';
}

FingerTree.prototype.clearAll = function() {
	this.extObj.jstree(true).settings.core.data = null;
	this.extObj.jstree(true).refresh();
}

FingerTree.prototype.setProperty = function(x, y, width, height) {
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

FingerTree.prototype.setBorder = function(value) {
	var e = document.getElementById(this.id);

	if (value == true) {
		this.border = true;
		e.style.border = '1px solid gray';
	}
	else {
		this.border = false;
		e.style.border = 'none';
	}

	delete e;
}

FingerTree.prototype.getParentNodeId = function(id) {
	return this.extObj.jstree(true).get_parent(id);
}

FingerTree.prototype.getParentNodeText = function(id) {
	return this.extObj.jstree(true).get_text(this.extObj.jstree(true).get_parent(id));
}

FingerTree.prototype.getSelectedNodeId = function() {
	return this.extObj.jstree(true).get_selected().length ? this.extObj.jstree(true).get_selected()[this.extObj.jstree(true).get_selected().length - 1] : '';
}

FingerTree.prototype.getSelectedNodeText = function() {
	return this.extObj.jstree(true).get_selected().length ? this.extObj.jstree(true).get_text(this.extObj.jstree(true).get_selected()[this.extObj.jstree(true).get_selected().length - 1]) : '';
}

FingerTree.prototype.getUserData = function(id, key) {
	for (var i = 0; i < this.treeData.length; i++) {
		if (this.treeData[i]['nkeyid'] == id) {
			if (key) {
				return this.treeData[i][key];
			} else {
				return this.treeData[i];
			}
		}
	}
}

FingerTree.prototype.setUserData = function(id, key, value) {
	for (var i = 0; i < this.treeData.length; i++) {
		if (this.treeData[i]['nkeyid'] == id) {
			this.treeData[i][key] = value;
			break;
		}
	}
}

FingerTree.prototype.setFocusNode = function(id) {
	this.extObj.jstree("select_node", id);
}

FingerTree.prototype.setAllCheck = function() {
	this.extObj.jstree("check_all");
}

FingerTree.prototype.setAllNoneCheck = function() {
	this.extObj.jstree(true).deselect_all();
}

FingerTree.prototype.setCheck = function(id, isNone) {
	isNone ? this.extObj.jstree("deselect_node", id) : this.extObj.jstree("select_node", id);
}

FingerTree.prototype.setCheckItems = function(items, value) {
	var sp = (value ? value : '|');
	var nodes = items.split(sp);
	
	for (var i in nodes) {
		this.setCheck(nodes[i]);
	}
}

FingerTree.prototype.openNode = function(id) {
	this.extObj.jstree("open_node", id);
}

FingerTree.prototype.getCheckItems = function() {
	// 체크된 노드의 DataSet으로 반환
	var checkList = this.extObj.jstree('get_checked');
	var resultSet = [];
	
	for (var i = 0; i < checkList.length; i++) {
		resultSet.push( this.getUserDataAll(checkList[i]) );
	}
	return resultSet;
}

FingerTree.prototype.getAllChecked = function() {
	// 체크된 id값을 배열로 반환 -> ['id1', 'id2'] 
	return this.extObj.jstree('get_checked');
}

FingerTree.prototype.getTextAllChecked = function() {
	var checkList = this.extObj.jstree('get_checked');
	var resultSet = [];
	
	for (var i = 0; i < checkList.length; i++) {
		resultSet.push( this.getUserData(checkList[i], 'name') );
	}
	return resultSet;
}

FingerTree.prototype.findItem = function(searchStr) {
	this.extObj.jstree('search', searchStr);
}

FingerTree.prototype.expandAll = function(startNodeId) {
	if (startNodeId) {
		this.extObj.jstree("open_all", startNodeId);
	} else {
		this.extObj.jstree("open_all");
	}
}

FingerTree.prototype.collapseAll = function(startNodeId) {
	if (startNodeId) {
		this.extObj.jstree("close_all", startNodeId);
	} else {
		this.extObj.jstree("close_all");
	}
}