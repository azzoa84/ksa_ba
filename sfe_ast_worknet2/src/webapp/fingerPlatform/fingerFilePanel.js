function FingerFilePanel(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.mode = 'U';
    $.showDelButton = true;
    $.fileList = [];
        
	$.download_click = function(fileId, fileName) {
        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingerfilepanel_download_click != undefined) {
                g_container.fingerfilepanel_download_click(getRealId($.id), fileId, fileName);
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	g_popupStack.get().obj.fingerfilepanel_download_click(getRealId($.id), fileId, fileName);
                
        } else {
            if (g_currentModule != null) {
                if (g_currentModule.fingerfilepanel_download_click != undefined) {
                    g_currentModule.fingerfilepanel_download_click(getRealId($.id), fileId, fileName);
                }
            }
        }
    }    

	$.delete_click = function(fileId, fileName) {
        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingerfilepanel_delete_click != undefined) {
                g_container.fingerfilepanel_delete_click(getRealId($.id), fileId, fileName);
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	g_popupStack.get().obj.fingerfilepanel_delete_click(getRealId($.id), fileId, fileName);
        
        } else {
            if (g_currentModule != null) {
                if (g_currentModule.fingerfilepanel_delete_click != undefined) {
                    g_currentModule.fingerfilepanel_delete_click(getRealId($.id), fileId, fileName);
                }
            }
        }
    }    
	
	$.upload_click = function() {
        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingerfilepanel_upload_click != undefined) {
                g_container.fingerfilepanel_upload_click(getRealId($.id));
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	g_popupStack.get().obj.fingerfilepanel_upload_click(getRealId($.id));
        
        } else {
            if (g_currentModule != null) {
                if (g_currentModule.fingerfilepanel_upload_click != undefined) {
                    g_currentModule.fingerfilepanel_upload_click(getRealId($.id));
                }
            }
        }
    }    


    var div_main = document.createElement('div');
    div_main.id = $.id;
    div_main.style.position = 'absolute';
    div_main.style.float = 'left';
    div_main.style.width = $.width + 'px';
    div_main.style.height = $.height + 'px';
    div_main.style.left = $.x + 'px';
    div_main.style.top = $.y + 'px';
    div_main.style.border = '1px solid #D8D8D8';
    div_main.style.zIndex = '99';
    div_main.className = 'FingerFilePanel';
	
	var div_files = document.createElement('div');
	div_files.style.float = 'left';
	div_files.style.width = ($.width - 70) + 'px';
	div_files.style.height = $.height + 'px';
	div_files.style.marginTop = '0px';
	//div_files.style.backgroundColor = 'blue';
	div_files.style['overflow-x'] = 'hidden';
	div_files.style['overflow-y'] = 'auto';
	div_files.style.lineHeight = '26px';
	//div_files.style.color = '#FFFFFF';
	
	div_main.appendChild(div_files);
	div_files = null;

	var div_upload = document.createElement('div');
	div_upload.style.float = 'right';
	div_upload.style.width = '70px';
	div_upload.style.height = $.height + 'px';
	div_upload.style.marginTop = '0px';
	div_upload.style.backgroundColor = '#D8D8D8';
	div_upload.style.lineHeight = $.height + 'px';
	//div_upload.style.border = '1px solid red';
	//div_upload.style.color = '#FFFFFF';
	div_upload.innerHTML = '<center>업로드</center>';
	div_upload.style.cursor = 'pointer';
	
	if (div_upload.addEventListener) {
		div_upload.addEventListener("click", function() 
												{
													$.upload_click();
												}, false);
	} else if (btn.attachEvent) {
		div_upload.attachEvent("onclick", function() 
											{
												$.upload_click();
											});
	}  
	
	div_main.appendChild(div_upload);
	div_upload = null;
	
	host.appendChild(div_main);
	
    div_main = null;

    $.getFileList = function() {
        return $.fileList;
    }

    $.clear = function() {
        $.fileList.length = 0;

        var e = document.getElementById($.id).childNodes[0];
        while (e.hasChildNodes()) {
            e.removeChild(e.lastChild);
        }

        delete e;
    }
	
    $.removeFile = function(fileId) {
    	var fileObj = $.getFileObj(fileId);
    	var result = removeSysAttachFile({'file_path':(fileObj['server_path'] + fileObj['server_fname'])});
		
		if (result)
		{
			if ($.fileList.indexOf(fileObj) != -1)
				$.fileList.splice($.fileList.indexOf(fileObj), 1);

			var e = document.getElementById($.id).childNodes[0];
			e.removeChild(document.getElementById($.id + '__' + fileId));

			delete e;
		}
		else {
			MessageBoxShow('파일을 삭제하는 도중 오류가 발생 하였습니다.');
			return;
		}
    }
    
    $.getFileObj = function(fileId) {
    	for (var i = 0; i < $.fileList.length; i++) {
    		if (fileId == $.fileList[i]['file_id']) {
    			return $.fileList[i];
    		}
    	}
    };
    
    $.addFiles = function(fileList) {
    	if (!fileList || fileList.length == 0)
    		return;
    	
    	for (var i = 0; i < fileList.length; i++) {
    		$.addFile(fileList[i]);
    	}
    };

    $.addFile = function(fileObj) {
    	if (!fileObj || !fileObj['file_id']) return;
    	
        $.fileList.push(fileObj);
        
        var fileId = fileObj['file_id'];
        var fileName = fileObj['local_fname'];

		var e = document.getElementById($.id).childNodes[0];
	
		var div_file = document.createElement('div');
        div_file.id = $.id + '__' + fileId;
        div_file.style.width = ($.width - 70) + 'px';
        div_file.style.height = '26px';
        div_file.style.marginTop = '0px';
		div_file.style.borderBottom = '1px solid #D8D8D8';

		var div_file_name = document.createElement('div');
		div_file_name.style.float = 'left';
        div_file_name.style.width = ($.width - 120) + 'px';
        div_file_name.style.height = '26px';
        div_file_name.style.marginTop = '0px';
        //div_file_name.style.backgroundColor = 'red';
		//div_file_name.style.color = '#FFFFFF';
		div_file_name.style.lineHeight = '26px';
		div_file_name.style.borderBottom = '1px';
		div_file_name.style.cursor = 'pointer';
        div_file_name.innerHTML = '&nbsp;<u>' + fileName + '</u>';

		if (div_file_name.addEventListener) {
			div_file_name.addEventListener("click", function() 
										{
											$.download_click(fileId, fileName);
										}, false);
		} else if (btn.attachEvent) {
			div_file_name.attachEvent("onclick", function() 
									{
										$.download_click(fileId, fileName);
									});
		}  

		div_file.appendChild(div_file_name);

		var div_file_del = document.createElement('div');
			div_file_del.style.float = 'left';
			div_file_del.style.width = '50px';
			
			if ($.mode == 'U' && $.showDelButton)
				div_file_del.style.visibility = 'visible';
			else
				div_file_del.style.visibility = 'hidden';
				
			div_file_del.style.height = '26px';
			div_file_del.style.marginTop = '0px';
			div_file_del.style.lineHeight = '26px';
			div_file_del.style.cursor = 'pointer';
			div_file_del.innerHTML = '<img src="./fingerPlatform/images/filepanel_delete.png">';

		if (div_file_del.addEventListener) {
			div_file_del.addEventListener("click", function() 
										{
											$.delete_click(fileId, fileName);
										}, false);
		} else if (btn.attachEvent) {
			div_file_del.attachEvent("onclick", function() 
									{
										$.delete_click(fileId, fileName);
									});
		}  

		div_file.appendChild(div_file_del);
			
        e.appendChild(div_file);

        div_file_name = null;
        div_file_del = null;
		
		e = null;
    }
}

FingerFilePanel.prototype.setProperty = function(x, y, width, height) {
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

FingerFilePanel.prototype.setHTML = function(text) {
    this.text = text;

    var e = document.getElementById(this.id);
    e.innerHTML = text;
    delete e;
}

FingerFilePanel.prototype.getHTML = function() {
    var e = document.getElementById(this.id);
    var result = e.innerHTML;

    try {
        return result;
    } finally {
        result = null;
    }
}

FingerFilePanel.prototype.getType = function() {
    return 'FilePanel';
}

FingerFilePanel.prototype.setBorder = function(value) {
    var e = document.getElementById(this.id);

    if (value == true) {
        this.border = true;
        e.style.border = '1px solid #D8D8D8';
    }
    else {
        this.border = false;
        e.style.border = 'none';
    }

    delete e;
}

FingerFilePanel.prototype.getMode = function() {
	return this.mode;
}

FingerFilePanel.prototype.setMode = function(mode, showDelButton) {
    var e = document.getElementById(this.id);
	this.mode = mode;
	this.showDelButton = (showDelButton === undefined ? true : showDelButton);
	
	if (mode == 'U') 
	{
		e.childNodes[1].style.visibility = 'visible';
			
		//	e.childNodes[0].style['overflow-y'] = 'hidden';
		if (showDelButton === undefined || showDelButton) {
			for(var i=0; i<e.childNodes[0].childNodes.length; i++)
			{
				
				e.childNodes[0].childNodes[i].childNodes[1].style.visibility = 'visible';
				e.childNodes[0].childNodes[i].childNodes[1].style.width = '40px';
				e.childNodes[0].style.width = (this.width - 70) + 'px';
				//e.childNodes[0].childNodes[i].style.width = (this.width - 80) + 'px';
			}			
		}
		//e.childNodes[0].style['overflow-y'] = 'auto';
	}
    else
	{
		e.childNodes[1].style.visibility = 'hidden';
		//	e.childNodes[0].style['overflow-y'] = 'hidden';
		for(var i=0; i<e.childNodes[0].childNodes.length; i++)
		{
			e.childNodes[0].childNodes[i].childNodes[1].style.visibility = 'hidden';
			e.childNodes[0].childNodes[i].childNodes[1].style.width = '0px';
			e.childNodes[0].style.width = this.width + 'px';
			e.childNodes[0].childNodes[i].style.width = this.width + 'px';
			//e.childNodes[0].childNodes[i].childNodes[0].style.width = this.width + 'px';
		}
		//e.childNodes[0].style['overflow-y'] = 'auto';
    }
	

		
    delete e;
}



FingerFilePanel.prototype.setHorizontalScroll = function(value) {
    var e = document.getElementById(this.id);

    if (value == true) {
        e.style['overflow-x'] = 'scroll';
    }
    else {
        e.style['overflow-x'] = 'hidden';
    }

    delete e;
}

FingerFilePanel.prototype.setVerticalScroll = function(value) {
    var e = document.getElementById(this.id);

    if (value == true) {
        e.style['overflow-y'] = 'scroll';
    }
    else {
        e.style['overflow-y'] = 'hidden';
    }

    delete e;
}


FingerFilePanel.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';

    delete e;
}

FingerFilePanel.prototype.getRealId = function() {
    return this.id;
}
