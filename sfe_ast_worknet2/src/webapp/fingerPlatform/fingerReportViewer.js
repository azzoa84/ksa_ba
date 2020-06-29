function FingerReportViewer(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.name = $.id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
	
	var e = document.createElement('div');
    e.id = $.id;
    e.style.position = 'absolute';
    e.style.float = 'left';
    e.style.width = $.width + 'px';
    e.style.height = $.height + 'px';
    e.style.left = $.x + 'px';
    e.style.top = $.y + 'px';
    e.style.backgroundColor = 'transparent';
	
    var temp = jQuery(e).append('<iframe name="' + $.name + '" width="' + $.width + '" height="' + $.height + '" scrolling="no" frameBorder="0" style="overflow:hidden; z-Index:99999; position:absolute; left:' + $.x + 'px; top:' + $.y + 'px;" src="webreport.aspx?p1=Report.mrt"></iframe>');
    //var e = document.getElementsByName($.name)[0];
	 
	 host.appendChild(e);
	
    e.onload = function() {
    
    }

    $.getHTML = function() {
        var e = document.getElementsByName($.name)[0];
        var eDoc = e.contentWindow || e.contentDocument;
        return eDoc.getHTML();
    }

    $.setHTML = function(html) {
        var e = document.getElementsByName($.name)[0];
        var eDoc = e.contentWindow || e.contentDocument;
        eDoc.setHTML(html);
    }

    $.setProperty = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        var e = document.getElementsByName($.name)[0];
        e.style.left = x + 'px';
        e.style.top = y + 'px';
        e.style.width = width + 'px';
        e.style.height = height + 'px';
        delete e;
    }
}