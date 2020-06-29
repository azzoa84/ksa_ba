function FingerTabPage(element, id) {
    var $ = this;
    $.id = element.id;
    $.tabid = id;
    $.pageKey = null;
    
    $.add = function(o) {
        var el = document.getElementById($.id);
        var ol = document.getElementById(o.id);
        el.appendChild(ol);

        el = null;
        ol = null;
    }

    $.addPage = function(page) {
        var el = document.getElementById($.id);
        el.style.width = '820px';
        el.style.height = '710px';

        var e = document.createElement('iframe');
        e.frameBorder = 0;
        e.style.position = 'absolute';
        e.style.overflow = 'hidden';
        e.style.left = '0px';
        e.style.top = '0px';
        e.style.width = '100%'; //el.style.width;
        e.style.height = '100%';  //el.style.height;
        e.setAttribute('id', 'ifrm');
        e.setAttribute('src', page);

        el.appendChild(e);
        el = null;
    }

    $.dispose = function() {
        $.id = null;
        $.tabid = null;
        $.pageKey = null;
        $ = null;
    }
}

function FingerContainerTab(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.extObj = null;
    $.subIndex = 1;
    $.count = 1;
    $.enableCloseTabButton = false;
    $.tabSizeCorrection = false;
    $.childTabs = new Object();
    $.zIndex = 2147483645;

    var e = document.createElement('div');
    e.id = $.id;
    //e.style.position = 'absolute';
    e.style.float = 'left';
    e.style.width = $.width + 'px';
    e.style.height = $.height + 'px';
    e.style.left = $.x + 'px';
    e.style.top = $.y + 'px';
    e.className = 'FingerContainerTab';

    host.appendChild(e);

    $.extObj = new dhtmlXTabBar($.id, "top");
    $.extObj.enableTabCloseButton(true);
    $.extObj.setSkin('dhx_terrace');
    $.extObj.setImagePath(g_dhtmlxRoot + '/imgs/');
    //$.extObj.setMargin("20");
    $.extObj.setOffset("20");
    $.extObj.enableAutoSize(false, true);
    //$.extObj.enableScrollerTab();

    $.extObj.attachEvent("onSelect", function(id, last_id) {
        var tabPage = $.getFingerTabPage(id);
        var fpViewHost = document.getElementById('fpViewHost');

        // 업무화면 높이 지정
        if (tabPage != undefined) {
            var e = document.getElementById(tabPage.id);

            var fingerPanelIndex = 0;
            if (e.childNodes[fingerPanelIndex].tagName.toLowerCase() != 'iframe') {
            	var viewH = (e.childNodes[fingerPanelIndex].style.height.replace('px', '') * 1) + 100;
                fpViewHost.style.height = (viewH) + 'px';
            }
            else {
                fingerPanelIndex = 1;
                fpViewHost.style.height = (e.childNodes[fingerPanelIndex].style.height.replace('px', '') * 1) + 100 + 'px';
            }
        }
        else {
            // 탭 높이 구하기
            fpViewHost.style.height = '860px';
        }

        // 닫기 버튼 활성 & 비활성화   
        var temp = document.getElementById($.id);
        var currentTabElement = null;


        for (var i in temp.childNodes[0].childNodes[0].childNodes[0].childNodes) {
            if (temp.childNodes[0].childNodes[0].childNodes[0].childNodes[i].getAttribute != undefined) {
                var tabElement = temp.childNodes[0].childNodes[0].childNodes[0].childNodes[i];
                var tabid = tabElement.getAttribute('tab_id');

                if (tabElement.childNodes.length == 5) {
                    if (tabid != null && tabid == id) {
			if(i != 0)
                            tabElement.childNodes[4].style.display = 'block';

                    }
                    else {
                        tabElement.childNodes[4].style.display = 'none';
                    }
                }                
            }
        }

        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingertab_selectionchange != undefined) {
                if (last_id != null)
                    g_container.fingertab_selectionchange(getRealId($.id), id)
            }
        }
        else if (g_currentPopup != null) {
            if (g_currentPopup.fingertab_selectionchange != undefined) {
                if (last_id != null)
                    g_currentPopup.fingertab_selectionchange(getRealId($.id), id);
            }
        }
        
        // (17.05.08) Container Tab 변경시 화면에 이벤트 전달
        if (g_currentModule != null) {
            if (g_currentModule.reactive_after != undefined) {
                if (last_id != null)
                    g_currentModule.reactive_after();
            }
        }

        return true;
    });
    
    $.closeTabEventHandler = function(id) {
        var result = false;
        
        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingertab_ontabclose != undefined) {
                result = g_container.fingertab_ontabclose(getRealId($.id), id)
            }
        } 
        else if (g_currentPopup != null) {
            if (g_currentModule.fingertab_ontabclose != undefined) {
                result = g_currentModule.fingertab_ontabclose(getRealId($.id), id);
            }        
        }
        else {
            if (g_currentModule != null) {
                if (g_currentModule.fingertab_ontabclose != undefined) {
                    result = g_currentModule.fingertab_ontabclose(getRealId($.id), id);
                }
            }
        }

        if (result == true) {
            var tabpage = $.childTabs[id];
            tabpage.dispose();
            tabpage = null;
            delete $.childTabs[id];

            // tabid 딸대 $.length 로 따서 오류가 발생한다...수정 방안 모색할것.
            $.count = $.count - 1;
            
            // 2017.01.25 탭 종료시 로딩 메시지 숨김 (김영도)
            hideToast();
        }

        try {
            return result;
        } finally {
            result = null;
        }
    }
    $.extObj.attachEvent("onTabClose", $.closeTabEventHandler);    

    $.setEnableTabCloseButton = function(value) {
        $.extObj.enableTabCloseButton(value);
        $.enableCloseTabButton = value;
    }

    $.addTab = function(id, text) {
        var tabid = $.id + '_a' + $.subIndex;
        var on = '';

        if ($.existChildTab(tabid) == false) {
            if ($.tabSizeCorrection == false) {
                $.tabSizeCorrection = true;
                var tabElement = document.getElementById($.id);
                var tabHeight = parseInt(tabElement.style.height);
                tabElement.style.height = '23px';
                tabHeight = null;
                tabElement = null;
            }
            
            var tabWidth = 0;
            if (id == 'home') { tabWidth = getSize(text) + 35; }
            else { tabWidth = getSize(text) + 60; }

            if ($.count == 1) {
                $.extObj.addTab(tabid, text, tabWidth);
                $.extObj.setTabActive(tabid);
                on = '_on';
            }
            else {
                $.extObj.addTab(tabid, text, tabWidth);
            }

            // tabid 로 얻어서 노드 제거
            /*
            var temp = document.getElementById($.id);
            var tabIndex = $.count - 1;
            $.zIndex = $.zIndex - 1;

            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].style.backgroundColor = 'Transparent';
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].style.backgroundImage = '';
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].style.zIndex = $.zIndex;
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].setAttribute('zindex_origin', $.zIndex);

            if (tabIndex != 0)
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[0].style.color = 'white';

            // 기본 탭엘리먼트 하위 요소들 숨김
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[1].style.visibility = 'hidden';
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[1].style.backgroundColor = 'Blue';
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[1].style.backgroundImage = '';

            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[2].style.backgroundColor = 'Blue';
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[2].style.backgroundImage = '';
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[2].style.visibility = 'hidden';

            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[3].style.backgroundColor = 'Blue';
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[3].style.backgroundImage = '';
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[3].style.visibility = 'hidden';

            // 커스텀 탭을 만들기 위한 새 요소 추가
            var e1 = document.createElement('div');
            e1.id = 'customTab';
            e1.style.position = 'absolute';
            e1.style.left = '0px';
            e1.style.top = '0px';
            e1.style.width = temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].style.width;
            e1.style.height = '23px';  //temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].style.height;
            e1.style.backgroundColor = 'Transparent';

            var tabWidth = parseInt(temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].style.width);

            var e2 = document.createElement('div');
            e2.style.left = '-10px';
            e2.style.top = '0px';
            e2.style.width = '24px';
            e2.className = 'container_tab_left';

            if (on == '')
            e2.style.backgroundPosition = '0px 0px';
            else
            e2.style.backgroundPosition = '-48px 0px';

            var e3 = document.createElement('div');
            e3.style.position = 'absolute';
            e3.style.left = '14px';
            e3.style.backgroundColor = 'Transparent';
            if (id == 'home')
            e3.style.width = tabWidth - 26 - 6 + 'px';
            else
            e3.style.width = tabWidth - 26 + 'px';

            e3.className = 'container_tab' + on + '_center';
            //e3.style.backgroundImage = 'url("../fingerPlatform/images/container_tab' + on + '_center.png")';
            //e3.style.backgroundRepeat = 'repeat-x';

            var e4 = document.createElement('div');
            e4.style.position = 'absolute';

            if (id == 'home')
            e4.style.left = tabWidth - 15 - 6 + 'px';
            else
            e4.style.left = tabWidth - 15 + 'px';

            e4.style.width = '24px';
            e4.className = 'container_tab_right';
            //e4.style.backgroundImage = 'url("../fingerPlatform/images/container_tab.png");'

            if (on == '')
            e4.style.backgroundPosition = '-25px 0px';
            else
            e4.style.backgroundPosition = '-75px 0px';

            e1.appendChild(e2);
            e1.appendChild(e3);
            e1.appendChild(e4);

            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].appendChild(e1);
            
            // 닫기 버튼의 위치 조정
            if ($.enableCloseTabButton == true) {
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[4].style.left = tabWidth - 25 + 'px';
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[4].style.top = '8px';

                if ($.count == 1) {
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[4].setAttribute('src', g_scriptPath + '/images/transparent.png');
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[4].className = 'container_tab_on_close';
            }
            else {
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[4].setAttribute('src', g_scriptPath + '/images/transparent.png');
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[4].className = 'container_tab_close';
            }
            }

            if (id == 'home') {
            temp.childNodes[0].childNodes[0].childNodes[0].childNodes[tabIndex].childNodes[4].style.visibility = 'hidden';
            }
            */

            $.extObj.setContentHTML(tabid, '<div id="' + $.id + '__tabpage__' + $.subIndex + '" class="FingerTabPage"></div>');

            var tabpage = document.getElementById($.id + '__tabpage__' + $.subIndex);
            tabpage.style.width = $.width + 'px';
            tabpage.style.height = 'auto';

            // 레이아웃을 사용하지 않는대신, 그 역할을 해줄수 있는 기본 컨트롤을 삽입한다.
            /*
            var defLayout = document.createElement('div');
            defLayout.id = $.id + '__tabpage__' + $.subIndex + '__defLayout';
            defLayout.style.position = 'relative';
            defLayout.style.cssFloat = 'left';
            defLayout.style.height = 'auto';
            tabpage.appendChild(defLayout);
            */

            if (id == 'home') {
                tabpage.style.height = $.height + 'px';
                $.extObj.cells(tabid).autoSize();

                // home은 닫을 수 없도록 처리한다.
                var tab = document.getElementById($.id);
                tab.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[4].style.display = 'none';
            }

            $.subIndex = $.subIndex + 1;
            $.count = $.count + 1;

            var result = new FingerTabPage(tabpage, tabid);
            result.pageKey = id;
            $.childTabs[tabid] = result;

            try {
                return result;
            } finally {
                result = null;
            }
        }
    }

    $.getTabPanel = function(index) {

    }

    $.getFingerTabPage = function(tabid) {
        return $.childTabs[tabid];
    }

    $.existChildTab = function(tabid) {
        for (key in $.childPages) {
            if (key == tabid) {
                return true;
            }
        }

        return false;
    }

    $.getActiveTab = function() {
        return getRealId($.extObj.getActiveTab());
    }
}

FingerContainerTab.prototype.getTabCount = function() {
    return this.extObj.getAllTabs().length;
}

