function FingerPopup(host, id, x, y, width, height, controlText, header, argument, procedureName, paramInfo) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.title = '';
    $.obj = null;

    // openModel 하고 바로 제거
    $.controlText = controlText;
    $.header = header;
    $.argument = argument;
    $.procedureName = procedureName;
    $.paramInfo = paramInfo;
    
    $._bizComponentID = "";
    $._popupTitle = "";
    $._formType = "";
    $.PopupEvent = [];  // List<String> 배열 표현 방법..
    $.SelectList = [];  //
    $.WhereList = [];   //

    $.GetBizComponentID = function() {
        return this._bizComponentID;
    }
    $.SetBizComponentID = function(value) {
        this._bizComponentID = value;
    }

    $.GetPopupTitle = function() {
        return this._popupTitle;
    }
    $.SetPopupTitle = function(value) {
        this._popupTitle = value;
    }

    $.GetFormType = function() {
        return this._formType;
    }
    $.SetFormType = function(value) {
        this._formType = value;
    }

    $.GetPopupEvent = function() {
        return this.PopupEvent;   // ??
    }
    $.SetPopupEvent = function(value) {
        this.PopupEvent = value;  // ??
    }

    $.GetSelectList = function() {
        return this.SelectList;   // ??
    }
    $.SetSelectList = function(value) {
        this.SelectList = value;  // ??
    }

    $.GetWhereList = function() {
        return this.WhereList;    // ??
    }
    $.SetWhereList = function(value) {
        this.WhereList = value;   // ??
    }
    
    var e = document.createElement('div');
    e.setAttribute('id', $.id);
    e.style.position = 'absolute';
    e.style.float = 'left';    
    e.style.width = '100%';
    e.style.height = '100%';
    e.style.left = $.x + 'px';
    e.style.top = $.y + 'px';
    //e.style.backgroundColor = 'green';
    
    var view = document.getElementById('fpView');
    view.appendChild(e);
    e = null;

    var dhxWins = new dhtmlXWindows();
    $.extObj = dhxWins.createWindow($.id, 0, 0, $.width, $.height);

    var pos = getCenterOnScreen($.width, $.height);
    $.extObj.setPosition(pos[0], pos[1]);
    $.extObj.setModal(true);
    $.extObj.button('minmax1').hide();
    $.extObj.button('minmax2').hide();
    $.extObj.button('park').hide();
    $.extObj.style.zIndex = 18000;

    var c = document.createElement('div');
    c.id = 'popupHost_' + $.id;
    c.style.width = '100%';
    c.style.height = '100%';
    //c.style.backgroundColor = 'red';
    

    $.extObj.attachObject(c);

    $.extObj.button('close').attachEvent("onClick", function(win, button) {
    	if ($.obj && $.obj.fingerpopup_click_x_button != undefined) {
    		// 'X' 버튼 클릭시 해당 팝업에 이벤트 호출
    		$.obj.fingerpopup_click_x_button();
    	}
    	
    	$.extObj.close();
    	return true;
    });
    $.extObj.attachEvent("onClose", function(win) {
        $.obj = null;
        g_popupStack.pop();
        //console.log('pop after length : ' + g_popupStack.stack.length);

        if (g_main != null && host.id == 'fpView') {
            if (g_main.fingerpopup_close != undefined) {
                g_main.fingerpopup_close(getRealId($.id));
            }
        }
        else if (g_currentModule != null) {
            if (g_currentModule.fingerpopup_close != undefined) {
                g_currentModule.fingerpopup_close(getRealId($.id));
            }
        }
        return true;
    });

    c = null;
    
    // 팝업 사이즈 지정
    $.setSize = function(w, h) {
    	$.width = w;
    	$.height = h;
    	$.extObj.setDimension(w, h);
    };
    
    $.getSize = function() {
    	return $.extObj.getDimension();
    };
    
    // 팝업을 정중앙으로
    $.setPositionCenter = function() {
    	var pos = getCenterOnScreen($.width, $.height);
    	$.extObj.setPosition(pos[0], pos[1]);
    };

    $.openModel = function(obj, parent) {
        // obj에 init, start 호출
        var host = document.getElementById('popupHost_' + $.id);
        $.obj = obj;
		obj.p_controlText = $.controlText;
        obj.p_header = $.header;
        obj.p_argument = $.argument;
        obj.p_procedureName = $.procedureName;
        obj.p_paramInfo = $.paramInfo;
        
        // 팝업 모듈에서 실제 팝업 객체로의 접근을 위해
        obj.p_self_popup = $;
        
        obj.init(host);
        obj.start();
        if (obj.update != undefined)
            obj.update();

        $.controlText = null;
        $.header = null;
        $.argument = null;
        $.procedureName = null;
        $.paramInfo = null;
		
		if (parent) {
			parent.popObj = obj;
		}
		
        host = null;
    }
	
    $.setText = function(text) {
        $.extObj.setText(text);
    }      
}  