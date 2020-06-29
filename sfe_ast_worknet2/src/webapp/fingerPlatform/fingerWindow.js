function FingerWindow(host, id, x, y, width, height, title, content, type, callback) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.title = title;
    $.extObj = null;

    $.button1Click = function() {
        g_main.msgShare = true;
        $.extObj.close();
        callback();
    }

    $.button2Click = function() {
        g_main.msgShare = false;
        $.extObj.close();
        callback();
    }

    $.button3Click = function() {
        g_main.msgShare = 'cancel';
        $.extObj.close();
        callback();
    }

    $.createControl = function() {
        var layout = document.createElement('div');
        layout.setAttribute('id', $.id);
        layout.style.position = 'absolute';
        layout.style.float = 'left';
        layout.style.width = $.width + 'px';
        layout.style.height = $.height + 'px';
        layout.style.left = $.x + 'px';
        layout.style.top = $.y + 'px';
        layout.style.padding = '20px';

        var text = document.createElement('div');
        text.style.width = $.width - 40 + 'px';
        text.style.height = $.height - 110 + 'px';
        text.innerHTML = '<span>' + content + '</span>';

        var div = document.createElement('div');
        div.style.width = $.width - 40 + 'px';
        div.style.textAlign = 'center';

        var button1 = document.createElement('input');
        button1.setAttribute('type', 'button');
        button1.style.width = '50px';
        button1.style.height = '20px';
        button1.style.margin = '5px';
        button1.value = '확인';
        button1.className = 'PopupButton';

        var button2 = document.createElement('input');
        button2.setAttribute('type', 'button');
        button2.style.width = '50px';
        button2.style.height = '20px';
        button2.style.margin = '5px';
        button2.className = 'PopupButton';

        var button3 = document.createElement('input');
        button3.setAttribute('type', 'button');
        button3.style.width = '50px';
        button3.style.height = '20px';
        button3.style.margin = '5px';
        button3.value = '취소';
        button3.className = 'PopupButton';

        if (type == 'ok') {
            div.appendChild(button1);
        }
        else if (type == 'yesNo') {
            div.appendChild(button1);
            button1.value = '예';
            div.appendChild(button2);
            button2.value = '아니오';
        }
        else if (type == 'yesNoCancel') {
            div.appendChild(button1);
            button1.value = '예';
            div.appendChild(button2);
            button2.value = '아니오';
            div.appendChild(button3);
            button3.value = '취소';
        }

        layout.appendChild(text);
        layout.appendChild(div);

        if (button1.addEventListener) {
            button1.addEventListener("click", $.button1Click, false);
        } else if (button1.attachEvent) {
            button1.attachEvent("onclick", $.button1Click);
        }

        if (button2.addEventListener) {
            button2.addEventListener("click", $.button2Click, false);
        } else if (button2.attachEvent) {
            button2.attachEvent("onclick", $.button2Click);
        }

        if (button3.addEventListener) {
            button3.addEventListener("click", $.button3Click, false);
        } else if (button2.attachEvent) {
            button3.attachEvent("onclick", $.button3Click);
        }

        var dhxWins = new dhtmlXWindows();
        $.extObj = dhxWins.createWindow($.id, 0, 0, width, height);
        var pos = getCenterOnScreen(width, height);
        $.extObj.setPosition(pos[0], pos[1]);

        $.extObj.setModal(true);
        $.extObj.button('minmax1').hide();
        $.extObj.button('minmax2').hide();
        $.extObj.button('park').hide();
        $.extObj.setText($.title);
        $.extObj.attachObject(layout);
    }
    
    $.setTitle = function(title) {
        this.title = title;
    }

    $.show = function() {
        $.createControl();        
    }
}
    