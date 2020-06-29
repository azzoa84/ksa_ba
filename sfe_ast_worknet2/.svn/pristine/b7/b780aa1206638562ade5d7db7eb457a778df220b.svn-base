function FingerLayout(host, id, type, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.type = type;
      
    var e = document.createElement('div');
    e.id = $.id;
    e.style.position = 'relative';
    e.style.float = 'left';
    e.style.width = $.width-10 + 'px';
    e.style.height = $.height-15 + 'px';
    e.style.left = $.x + 'px';
    e.style.top = $.y + 'px';
  
    host.appendChild(e);

    $.extObj = new dhtmlXLayoutObject($.id, $.type);

    $.extObj.attachEvent("onPanelResizeFinish", function() {
        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingerlayout_panelresizefinish != undefined) {
                g_container.fingerlayout_panelresizefinish(getRealId($.id))
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	g_popupStack.get().obj.fingerlayout_panelresizefinish(getRealId($.id));
        }
        else {
            if (g_currentModule != null) {
                if (g_currentModule.fingerlayout_panelresizefinish != undefined) {
                    g_currentModule.fingerlayout_panelresizefinish(getRealId($.id));
                }
            }
        }
    });

    $.extObj.attachEvent("onResizeFinish", function() {
        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingerlayout_resizefinish != undefined) {
                g_container.fingerlayout_resizefinish(getRealId($.id))
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	g_popupStack.get().obj.fingerlayout_resizefinish(getRealId($.id));
        }
        else {
            if (currentModule != null) {
                if (currentModule.fingerlayout_resizefinish != undefined) {
                    currentModule.fingerlayout_resizefinish(getRealId($.id));
                }
            }
        }
    });

    $.setProperty = function(x, y, width, height) {
        var obj = document.getElementById($.id);
        
        obj.style.left = x + 'px';
        obj.style.top = y + 'px';

        obj = null;       
    }    

    $.add = function(cell, objId) {
        var obj = document.getElementById(objId.id);
        $.extObj.cells(cell).attachObject(obj);
        obj = null;
    }

    $.setCellSize = function(cell, width, height, fix_w, fix_h) {    
        $.extObj.cells(cell).hideHeader();
    
        if (height != 0) 
            $.extObj.cells(cell).setHeight(Number(height));        
        
        if (width != 0)
            $.extObj.cells(cell).setWidth(Number(width));

        $.extObj.cells(cell).fixSize(fix_w, fix_h);
    }

    $.setHeight = function(cell, height) {
        $.extObj.cells(cell).hideHeader();
        
        if(height != 0)
            $.extObj.cells(cell).setHeight(Number(height));    
    }

    $.setWidth = function(cell, width) {
        $.extObj.cells(cell).hideHeader();

        if (width != 0)
            $.extObj.cells(cell).setWidth(Number(width));
    }

    $.progressOn = function(cell) {
        if(cell != null)
            $.extObj.cells(cell).progressOn();
        else
            $.extObj.progressOn();
    }

    $.progressOff = function(cell) {
        if(cell != null)
            $.extObj.cells(cell).progressOff();
        else
            $.extObj.progressOff();
    }

    $.getType = function() {
        return 'Layout';
    }
}
    