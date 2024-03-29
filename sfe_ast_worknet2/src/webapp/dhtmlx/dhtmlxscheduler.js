/*
Copyright Dinamenta UAB. http://www.dhtmlx.com

To use this component please contact sales@dhtmlx.com to obtain license
*/
window.dhtmlx || (dhtmlx = function (a) {
    for (var e in a) dhtmlx[e] = a[e];
    return dhtmlx
});
dhtmlx.extend_api = function (a, e, b) {
    var c = window[a];
    if (c) window[a] = function (b) {
        if (b && typeof b == "object" && !b.tagName) {
            var a = c.apply(this, e._init ? e._init(b) : arguments),
                g;
            for (g in dhtmlx) if (e[g]) this[e[g]](dhtmlx[g]);
            for (g in b) if (e[g]) this[e[g]](b[g]);
            else g.indexOf("on") == 0 && this.attachEvent(g, b[g])
        } else a = c.apply(this, arguments);
        e._patch && e._patch(this);
        return a || this
    }, window[a].prototype = c.prototype, b && dhtmlXHeir(window[a].prototype, b)
};
dhtmlxAjax = {
    get: function (a, e) {
        var b = new dtmlXMLLoaderObject(!0);
        b.async = arguments.length < 3;
        b.waitCall = e;
        b.loadXML(a);
        return b
    },
    post: function (a, e, b) {
        var c = new dtmlXMLLoaderObject(!0);
        c.async = arguments.length < 4;
        c.waitCall = b;
        c.loadXML(a, !0, e);
        return c
    },
    getSync: function (a) {
        return this.get(a, null, !0)
    },
    postSync: function (a, e) {
        return this.post(a, e, null, !0)
    }
};

function dtmlXMLLoaderObject(a, e, b, c) {
    this.xmlDoc = "";
    this.async = typeof b != "undefined" ? b : !0;
    this.onloadAction = a || null;
    this.mainObject = e || null;
    this.waitCall = null;
    this.rSeed = c || !1;
    return this
}
dtmlXMLLoaderObject.count = 0;
dtmlXMLLoaderObject.prototype.waitLoadFunction = function (a) {
    var e = !0;
    return this.check = function () {
        if (a && a.onloadAction != null && (!a.xmlDoc.readyState || a.xmlDoc.readyState == 4) && e) {
            e = !1;
            dtmlXMLLoaderObject.count++;
            if (typeof a.onloadAction == "function") a.onloadAction(a.mainObject, null, null, null, a);
            if (a.waitCall) a.waitCall.call(this, a), a.waitCall = null
        }
    }
};
dtmlXMLLoaderObject.prototype.getXMLTopNode = function (a, e) {
    if (this.xmlDoc.responseXML) {
        var b = this.xmlDoc.responseXML.getElementsByTagName(a);
        b.length == 0 && a.indexOf(":") != -1 && (b = this.xmlDoc.responseXML.getElementsByTagName(a.split(":")[1]));
        var c = b[0]
    } else c = this.xmlDoc.documentElement;
    if (c) return this._retry = !1, c;
    if (!this._retry) return this._retry = !0, e = this.xmlDoc, this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/, ""), !0), this.getXMLTopNode(a, e);
    dhtmlxError.throwError("LoadXML", "Incorrect XML", [e || this.xmlDoc, this.mainObject]);
    return document.createElement("DIV")
};
dtmlXMLLoaderObject.prototype.loadXMLString = function (a, e) {
    if (_isIE) this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), this.xmlDoc.async = this.async, this.xmlDoc.onreadystatechange = function () {}, this.xmlDoc.loadXML(a);
    else {
        var b = new DOMParser;
        this.xmlDoc = b.parseFromString(a, "text/xml")
    }
    if (!e) {
        if (this.onloadAction) this.onloadAction(this.mainObject, null, null, null, this);
        if (this.waitCall) this.waitCall(), this.waitCall = null
    }
};
dtmlXMLLoaderObject.prototype.loadXML = function (a, e, b, c) {
    this.rSeed && (a += (a.indexOf("?") != -1 ? "&" : "?") + "a_dhx_rSeed=" + (new Date).valueOf());
    this.filePath = a;
    this.xmlDoc = !_isIE && window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    if (this.async) this.xmlDoc.onreadystatechange = new this.waitLoadFunction(this);
    this.xmlDoc.open(e ? "POST" : "GET", a, this.async);
    c ? (this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 (" + navigator.userAgent + ")"), this.xmlDoc.setRequestHeader("Content-type", "text/xml")) : e && this.xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    this.xmlDoc.send(b);
    this.async || (new this.waitLoadFunction(this))()
};
dtmlXMLLoaderObject.prototype.destructor = function () {
    return this.setXSLParamValue = this.getXMLTopNode = this.xmlNodeToJSON = this.doSerialization = this.loadXMLString = this.loadXML = this.doXSLTransToString = this.doXSLTransToObject = this.doXPathOpera = this.doXPath = this.xmlDoc = this.mainObject = this.onloadAction = this.filePath = this.rSeed = this.async = this._retry = this._getAllNamedChilds = this._filterXPath = null
};
dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function (a) {
    for (var e = {}, b = 0; b < a.attributes.length; b++) e[a.attributes[b].name] = a.attributes[b].value;
    e._tagvalue = a.firstChild ? a.firstChild.nodeValue : "";
    for (b = 0; b < a.childNodes.length; b++) {
        var c = a.childNodes[b].tagName;
        c && (e[c] || (e[c] = []), e[c].push(this.xmlNodeToJSON(a.childNodes[b])))
    }
    return e
};

function callerFunction(a, e) {
    return this.handler = function (b) {
        if (!b) b = window.event;
        a(b, e);
        return !0
    }
}
function getAbsoluteLeft(a) {
    return getOffset(a).left
}

function getAbsoluteTop(a) {
    return getOffset(a).top
}
function getOffsetSum(a) {
    for (var e = 0, b = 0; a;) e += parseInt(a.offsetTop), b += parseInt(a.offsetLeft), a = a.offsetParent;
    return {
        top: e,
        left: b
    }
}

function getOffsetRect(a) {
    var e = a.getBoundingClientRect(),
        b = document.body,
        c = document.documentElement,
        d = window.pageYOffset || c.scrollTop || b.scrollTop,
        h = window.pageXOffset || c.scrollLeft || b.scrollLeft,
        g = c.clientTop || b.clientTop || 0,
        f = c.clientLeft || b.clientLeft || 0,
        j = e.top + d - g,
        i = e.left + h - f;
    return {
        top: Math.round(j),
        left: Math.round(i)
    }
}
function getOffset(a) {
    return a.getBoundingClientRect ? getOffsetRect(a) : getOffsetSum(a)
}

function convertStringToBoolean(a) {
    typeof a == "string" && (a = a.toLowerCase());
    switch (a) {
    case "1":
    case "true":
    case "yes":
    case "y":
    case 1:
    case !0:
        return !0;
    default:
        return !1
    }
}
function getUrlSymbol(a) {
    return a.indexOf("?") != -1 ? "&" : "?"
}
function dhtmlDragAndDropObject() {
    if (window.dhtmlDragAndDrop) return window.dhtmlDragAndDrop;
    this.dragStartObject = this.dragStartNode = this.dragNode = this.lastLanding = 0;
    this.tempDOMM = this.tempDOMU = null;
    this.waitDrag = 0;
    window.dhtmlDragAndDrop = this;
    return this
}
dhtmlDragAndDropObject.prototype.removeDraggableItem = function (a) {
    a.onmousedown = null;
    a.dragStarter = null;
    a.dragLanding = null
};
dhtmlDragAndDropObject.prototype.addDraggableItem = function (a, e) {
    a.onmousedown = this.preCreateDragCopy;
    a.dragStarter = e;
    this.addDragLanding(a, e)
};
dhtmlDragAndDropObject.prototype.addDragLanding = function (a, e) {
    a.dragLanding = e
};
dhtmlDragAndDropObject.prototype.preCreateDragCopy = function (a) {
    if (!((a || window.event) && (a || event).button == 2)) {
        if (window.dhtmlDragAndDrop.waitDrag) return window.dhtmlDragAndDrop.waitDrag = 0, document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU, document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM, !1;
        window.dhtmlDragAndDrop.dragNode && window.dhtmlDragAndDrop.stopDrag(a);
        window.dhtmlDragAndDrop.waitDrag = 1;
        window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup;
        window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove;
        window.dhtmlDragAndDrop.dragStartNode = this;
        window.dhtmlDragAndDrop.dragStartObject = this.dragStarter;
        document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy;
        document.body.onmousemove = window.dhtmlDragAndDrop.callDrag;
        window.dhtmlDragAndDrop.downtime = (new Date).valueOf();
        a && a.preventDefault && a.preventDefault();
		console.log("---");
        return !1
    }
};
dhtmlDragAndDropObject.prototype.callDrag = function (a) {
    if (!a) a = window.event;
    dragger = window.dhtmlDragAndDrop;
    if (!((new Date).valueOf() - dragger.downtime < 100)) {
        if (!dragger.dragNode) if (dragger.waitDrag) {
            dragger.dragNode = dragger.dragStartObject._createDragNode(dragger.dragStartNode, a);
            if (!dragger.dragNode) return dragger.stopDrag();
            dragger.dragNode.onselectstart = function () {
                return !1
            };
            dragger.gldragNode = dragger.dragNode;
            document.body.appendChild(dragger.dragNode);
            document.body.onmouseup = dragger.stopDrag;
            dragger.waitDrag = 0;
            dragger.dragNode.pWindow = window;
            dragger.initFrameRoute()
        } else return dragger.stopDrag(a, !0);
        if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode) {
            var e = dragger.gldragNode;
            if (dragger.gldragNode.old) e = dragger.gldragNode.old;
            e.parentNode.removeChild(e);
            var b = dragger.dragNode.pWindow;
            e.pWindow && e.pWindow.dhtmlDragAndDrop.lastLanding && e.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(e.pWindow.dhtmlDragAndDrop.lastLanding);
            if (_isIE) {
                var c = document.createElement("Div");
                c.innerHTML = dragger.dragNode.outerHTML;
                dragger.dragNode = c.childNodes[0]
            } else dragger.dragNode = dragger.dragNode.cloneNode(!0);
            dragger.dragNode.pWindow = window;
            dragger.gldragNode.old = dragger.dragNode;
            document.body.appendChild(dragger.dragNode);
            b.dhtmlDragAndDrop.dragNode = dragger.dragNode
        }
        dragger.dragNode.style.left = a.clientX + 15 + (dragger.fx ? dragger.fx * -1 : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px";
        dragger.dragNode.style.top = a.clientY + 3 + (dragger.fy ? dragger.fy * -1 : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px";
        var d = a.srcElement ? a.srcElement : a.target;
        dragger.checkLanding(d, a)
    }
};
dhtmlDragAndDropObject.prototype.calculateFramePosition = function (a) {
    if (window.name) {
        for (var e = parent.frames[window.name].frameElement.offsetParent, b = 0, c = 0; e;) b += e.offsetLeft, c += e.offsetTop, e = e.offsetParent;
        if (parent.dhtmlDragAndDrop) {
            var d = parent.dhtmlDragAndDrop.calculateFramePosition(1);
            b += d.split("_")[0] * 1;
            c += d.split("_")[1] * 1
        }
        if (a) return b + "_" + c;
        else this.fx = b;
        this.fy = c
    }
    return "0_0"
};
dhtmlDragAndDropObject.prototype.checkLanding = function (a, e) {
    a && a.dragLanding ? (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding), this.lastLanding = a, this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, e.clientX, e.clientY, e), this.lastLanding_scr = _isIE ? e.srcElement : e.target) : a && a.tagName != "BODY" ? this.checkLanding(a.parentNode, e) : (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding, e.clientX, e.clientY, e), this.lastLanding = 0, this._onNotFound && this._onNotFound())
};
dhtmlDragAndDropObject.prototype.stopDrag = function (a, e) {
    dragger = window.dhtmlDragAndDrop;
    if (!e) {
        dragger.stopFrameRoute();
        var b = dragger.lastLanding;
        dragger.lastLanding = null;
        b && b.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, b, _isIE ? event.srcElement : a.target)
    }
    dragger.lastLanding = null;
    dragger.dragNode && dragger.dragNode.parentNode == document.body && dragger.dragNode.parentNode.removeChild(dragger.dragNode);
    dragger.dragNode = 0;
    dragger.gldragNode = 0;
    dragger.fx = 0;
    dragger.fy = 0;
    dragger.dragStartNode = 0;
    dragger.dragStartObject = 0;
    document.body.onmouseup = dragger.tempDOMU;
    document.body.onmousemove = dragger.tempDOMM;
    dragger.tempDOMU = null;
    dragger.tempDOMM = null;
    dragger.waitDrag = 0
};
dhtmlDragAndDropObject.prototype.stopFrameRoute = function (a) {
    a && window.dhtmlDragAndDrop.stopDrag(1, 1);
    for (var e = 0; e < window.frames.length; e++) try {
        window.frames[e] != a && window.frames[e].dhtmlDragAndDrop && window.frames[e].dhtmlDragAndDrop.stopFrameRoute(window)
    } catch (b) {}
    try {
        parent.dhtmlDragAndDrop && parent != window && parent != a && parent.dhtmlDragAndDrop.stopFrameRoute(window)
    } catch (c) {}
};
dhtmlDragAndDropObject.prototype.initFrameRoute = function (a, e) {
    if (a) window.dhtmlDragAndDrop.preCreateDragCopy(), window.dhtmlDragAndDrop.dragStartNode = a.dhtmlDragAndDrop.dragStartNode, window.dhtmlDragAndDrop.dragStartObject = a.dhtmlDragAndDrop.dragStartObject, window.dhtmlDragAndDrop.dragNode = a.dhtmlDragAndDrop.dragNode, window.dhtmlDragAndDrop.gldragNode = a.dhtmlDragAndDrop.dragNode, window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag, window.waitDrag = 0, !_isIE && e && (!_isFF || _FFrv < 1.8) && window.dhtmlDragAndDrop.calculateFramePosition();
    try {
        parent.dhtmlDragAndDrop && parent != window && parent != a && parent.dhtmlDragAndDrop.initFrameRoute(window)
    } catch (b) {}
    for (var c = 0; c < window.frames.length; c++) try {
        window.frames[c] != a && window.frames[c].dhtmlDragAndDrop && window.frames[c].dhtmlDragAndDrop.initFrameRoute(window, !a || e ? 1 : 0)
    } catch (d) {}
};
_OperaRv = _KHTMLrv = _FFrv = _isChrome = _isMacOS = _isKHTML = _isOpera = _isIE = _isFF = !1;
navigator.userAgent.indexOf("Macintosh") != -1 && (_isMacOS = !0);
navigator.userAgent.toLowerCase().indexOf("chrome") > -1 && (_isChrome = !0);
if (navigator.userAgent.indexOf("Safari") != -1 || navigator.userAgent.indexOf("Konqueror") != -1) _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5)), _KHTMLrv > 525 ? (_isFF = !0, _FFrv = 1.9) : _isKHTML = !0;
else if (navigator.userAgent.indexOf("Opera") != -1) _isOpera = !0, _OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3));
else if (navigator.appName.indexOf("Microsoft") != -1) {
    if (_isIE = !0, (navigator.appVersion.indexOf("MSIE 8.0") != -1 || navigator.appVersion.indexOf("MSIE 9.0") != -1 || navigator.appVersion.indexOf("MSIE 10.0") != -1) && document.compatMode != "BackCompat") _isIE = 8
} else _isFF = !0, _FFrv = parseFloat(navigator.userAgent.split("rv:")[1]);
dtmlXMLLoaderObject.prototype.doXPath = function (a, e, b, c) {
    if (_isKHTML || !_isIE && !window.XPathResult) return this.doXPathOpera(a, e);
    if (_isIE) return e || (e = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), e || dhtmlxError.throwError("LoadXML", "Incorrect XML", [e || this.xmlDoc, this.mainObject]), b != null && e.setProperty("SelectionNamespaces", "xmlns:xsl='" + b + "'"), c == "single" ? e.selectSingleNode(a) : e.selectNodes(a) || [];
    else {
        var d = e;
        e || (e = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML);
        e || dhtmlxError.throwError("LoadXML", "Incorrect XML", [e || this.xmlDoc, this.mainObject]);
        e.nodeName.indexOf("document") != -1 ? d = e : (d = e, e = e.ownerDocument);
        var h = XPathResult.ANY_TYPE;
        if (c == "single") h = XPathResult.FIRST_ORDERED_NODE_TYPE;
        var g = [],
            f = e.evaluate(a, d, function () {
                return b
            }, h, null);
        if (h == XPathResult.FIRST_ORDERED_NODE_TYPE) return f.singleNodeValue;
        for (var j = f.iterateNext(); j;) g[g.length] = j, j = f.iterateNext();
        return g
    }
};

function y() {
    if (!this.catches) this.catches = [];
    return this
}
y.prototype.catchError = function (a, e) {
    this.catches[a] = e
};
y.prototype.throwError = function (a, e, b) {
    if (this.catches[a]) return this.catches[a](a, e, b);
    if (this.catches.ALL) return this.catches.ALL(a, e, b);
    alert("Error type: " + a + "\nDescription: " + e);
    return null
};
window.dhtmlxError = new y;
dtmlXMLLoaderObject.prototype.doXPathOpera = function (a, e) {
    var b = a.replace(/[\/]+/gi, "/").split("/"),
        c = null,
        d = 1;
    if (!b.length) return [];
    if (b[0] == ".") c = [e];
    else if (b[0] == "") c = (this.xmlDoc.responseXML || this.xmlDoc).getElementsByTagName(b[d].replace(/\[[^\]]*\]/g, "")), d++;
    else return [];
    for (; d < b.length; d++) c = this._getAllNamedChilds(c, b[d]);
    b[d - 1].indexOf("[") != -1 && (c = this._filterXPath(c, b[d - 1]));
    return c
};
dtmlXMLLoaderObject.prototype._filterXPath = function (a, e) {
    for (var b = [], e = e.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, ""), c = 0; c < a.length; c++) a[c].getAttribute(e) && (b[b.length] = a[c]);
    return b
};
dtmlXMLLoaderObject.prototype._getAllNamedChilds = function (a, e) {
    var b = [];
    _isKHTML && (e = e.toUpperCase());
    for (var c = 0; c < a.length; c++) for (var d = 0; d < a[c].childNodes.length; d++) _isKHTML ? a[c].childNodes[d].tagName && a[c].childNodes[d].tagName.toUpperCase() == e && (b[b.length] = a[c].childNodes[d]) : a[c].childNodes[d].tagName == e && (b[b.length] = a[c].childNodes[d]);
    return b
};

function dhtmlXHeir(a, e) {
    for (var b in e) typeof e[b] == "function" && (a[b] = e[b]);
    return a
}

function dhtmlxEvent(a, e, b) {
    a.addEventListener ? a.addEventListener(e, b, !1) : a.attachEvent && a.attachEvent("on" + e, b)
}
dtmlXMLLoaderObject.prototype.xslDoc = null;
dtmlXMLLoaderObject.prototype.setXSLParamValue = function (a, e, b) {
    if (!b) b = this.xslDoc;
    if (b.responseXML) b = b.responseXML;
    var c = this.doXPath("/xsl:stylesheet/xsl:variable[@name='" + a + "']", b, "http://www.w3.org/1999/XSL/Transform", "single");
    if (c != null) c.firstChild.nodeValue = e
};
dtmlXMLLoaderObject.prototype.doXSLTransToObject = function (a, e) {
    if (!a) a = this.xslDoc;
    if (a.responseXML) a = a.responseXML;
    if (!e) e = this.xmlDoc;
    if (e.responseXML) e = e.responseXML;
    if (_isIE) {
        c = new ActiveXObject("Msxml2.DOMDocument.3.0");
        try {
            e.transformNodeToObject(a, c)
        } catch (b) {
            c = e.transformNode(a)
        }
    } else {
        if (!this.XSLProcessor) this.XSLProcessor = new XSLTProcessor, this.XSLProcessor.importStylesheet(a);
        var c = this.XSLProcessor.transformToDocument(e)
    }
    return c
};
dtmlXMLLoaderObject.prototype.doXSLTransToString = function (a, e) {
    var b = this.doXSLTransToObject(a, e);
    return typeof b == "string" ? b : this.doSerialization(b)
};
dtmlXMLLoaderObject.prototype.doSerialization = function (a) {
    if (!a) a = this.xmlDoc;
    if (a.responseXML) a = a.responseXML;
    if (_isIE) return a.xml;
    else {
        var e = new XMLSerializer;
        return e.serializeToString(a)
    }
};
dhtmlxEventable = function (a) {
    a.attachEvent = function (a, b, c) {
        a = "ev_" + a.toLowerCase();
        this[a] || (this[a] = new this.eventCatcher(c || this));
        return a + ":" + this[a].addEvent(b)
    };
    a.callEvent = function (a, b) {
        a = "ev_" + a.toLowerCase();
        return this[a] ? this[a].apply(this, b) : !0
    };
    a.checkEvent = function (a) {
        return !!this["ev_" + a.toLowerCase()]
    };
    a.eventCatcher = function (a) {
        var b = [],
            c = function () {
                for (var c = !0, h = 0; h < b.length; h++) if (b[h] != null) var g = b[h].apply(a, arguments),
                    c = c && g;
                return c
            };
        c.addEvent = function (a) {
            typeof a != "function" && (a = eval(a));
            return a ? b.push(a) - 1 : !1
        };
        c.removeEvent = function (a) {
            b[a] = null
        };
        return c
    };
    a.detachEvent = function (a) {
        if (a != !1) {
            var b = a.split(":");
            this[b[0]].removeEvent(b[1])
        }
    };
    a.detachAllEvents = function () {
        for (var a in this) a.indexOf("ev_") == 0 && delete this[a]
    };
    a = null
};
if (!window.dhtmlx) window.dhtmlx = {};
(function () {
    function a(a, c) {
        var d = a.callback;
        b(!1);
        a.box.parentNode.removeChild(a.box);
        l = a.box = null;
        d && d(c)
    }
    function e(b) {
        if (l) {
            var b = b || event,
                c = b.which || event.keyCode;
            dhtmlx.message.keyboard && ((c == 13 || c == 32) && a(l, !0), c == 27 && a(l, !1));
            b.preventDefault && b.preventDefault();
            return !(b.cancelBubble = !0)
        }
    }
    function b(a) {
        if (!b.cover) b.cover = document.createElement("DIV"), b.cover.onkeydown = e, b.cover.className = "dhx_modal_cover", document.body.appendChild(b.cover);
        var c = document.body.scrollHeight;
        b.cover.style.display = a ? "inline-block" : "none"
    }
    function c(b, a) {
        var c = "dhtmlx_" + b.toLowerCase().replace(/ /g, "_") + "_button";
        return "<div class='dhtmlx_popup_button " + c + "' result='" + a + "' ><div>" + b + "</div></div>"
    }
    function d(b) {
        if (!m.area) m.area = document.createElement("DIV"), m.area.className = "dhtmlx_message_area", m.area.style[m.position] = "5px", document.body.appendChild(m.area);
        m.hide(b.id);
        var a = document.createElement("DIV");
        a.innerHTML = "<div>" + b.text + "</div>";
        a.className = "dhtmlx-info dhtmlx-" + b.type;
        a.onclick = function () {
            m.hide(b.id);
            b = null
        };
        m.position == "bottom" && m.area.firstChild ? m.area.insertBefore(a, m.area.firstChild) : m.area.appendChild(a);
        b.expire > 0 && (m.timers[b.id] = window.setTimeout(function () {
            m.hide(b.id)
        }, b.expire));
        m.pull[b.id] = a;
        a = null;
        return b.id
    }
    function h(b, d, h) {
        var g = document.createElement("DIV");
        g.className = " dhtmlx_modal_box dhtmlx-" + b.type;
        g.setAttribute("dhxbox", 1);
        var f = "";
        if (b.width) g.style.width = b.width;
        if (b.height) g.style.height = b.height;
        b.title && (f += '<div class="dhtmlx_popup_title">' + b.title + "</div>");
        f += '<div class="dhtmlx_popup_text"><span>' + (b.content ? "" : b.text) + '</span></div><div  class="dhtmlx_popup_controls">';
        d && (f += c(b.ok || "OK", !0));
        h && (f += c(b.cancel || "Cancel", !1));
        if (b.buttons) for (var e = 0; e < b.buttons.length; e++) f += c(b.buttons[e], e);
        f += "</div>";
        g.innerHTML = f;
        if (b.content) {
            var j = b.content;
            typeof j == "string" && (j = document.getElementById(j));
            if (j.style.display == "none") j.style.display = "";
            g.childNodes[b.title ? 1 : 0].appendChild(j)
        }
        g.onclick = function (c) {
            var c = c || event,
                d = c.target || c.srcElement;
            if (!d.className) d = d.parentNode;
            d.className.split(" ")[0] == "dhtmlx_popup_button" && (result = d.getAttribute("result"), result = result == "true" || (result == "false" ? !1 : result), a(b, result))
        };
        b.box = g;
        if (d || h) l = b;
        return g
    }
    function g(a, c, d) {
        var g = a.tagName ? a : h(a, c, d);
        a.hidden || b(!0);
        document.body.appendChild(g);
        var f = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - g.offsetWidth) / 2)),
            j = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - g.offsetHeight) / 2));
        g.style.top = a.position == "top" ? "-3px" : j + "px";
        g.style.left = f + "px";
        g.onkeydown = e;
        g.focus();
        a.hidden && dhtmlx.modalbox.hide(g);
        return g
    }
    function f(b) {
        return g(b, !0, !1)
    }
    function j(b) {
        return g(b, !0, !0)
    }
    function i(b) {
        return g(b)
    }
    function n(b, a, c) {
        typeof b != "object" && (typeof a == "function" && (c = a, a = ""), b = {
            text: b,
            type: a,
            callback: c
        });
        return b
    }
    function k(b, a, c, d) {
        typeof b != "object" && (b = {
            text: b,
            type: a,
            expire: c,
            id: d
        });
        b.id = b.id || m.uid();
        b.expire = b.expire || m.expire;
        return b
    }
    var l = null;
    document.attachEvent ? document.attachEvent("onkeydown", e) : document.addEventListener("keydown", e, !0);
    dhtmlx.alert = function () {
        text = n.apply(this, arguments);
        text.type = text.type || "confirm";
        return f(text)
    };
    dhtmlx.confirm = function () {
        text = n.apply(this, arguments);
        text.type = text.type || "alert";
        return j(text)
    };
    dhtmlx.modalbox = function () {
        text = n.apply(this, arguments);
        text.type = text.type || "alert";
        return i(text)
    };
    dhtmlx.modalbox.hide = function (a) {
        for (; a && a.getAttribute && !a.getAttribute("dhxbox");) a = a.parentNode;
        a && (a.parentNode.removeChild(a), b(!1))
    };
    var m = dhtmlx.message = function (b, a, c, h) {
            b = k.apply(this, arguments);
            b.type = b.type || "info";
            var g = b.type.split("-")[0];
            switch (g) {
            case "alert":
                return f(b);
            case "confirm":
                return j(b);
            case "modalbox":
                return i(b);
            default:
                return d(b)
            }
        };
    m.seed = (new Date).valueOf();
    m.uid = function () {
        return m.seed++
    };
    m.expire = 4E3;
    m.keyboard = !0;
    m.position = "top";
    m.pull = {};
    m.timers = {};
    m.hideAll = function () {
        for (var b in m.pull) m.hide(b)
    };
    m.hide = function (b) {
        var a = m.pull[b];
        a && a.parentNode && (window.setTimeout(function () {
            a.parentNode.removeChild(a);
            a = null
        }, 2E3), a.className += " hidden", m.timers[b] && window.clearTimeout(m.timers[b]), delete m.pull[b])
    }
})();

function dataProcessor(a) {
    this.serverProcessor = a;
    this.action_param = "!nativeeditor_status";
    this.object = null;
    this.updatedRows = [];
    this.autoUpdate = !0;
    this.updateMode = "cell";
    this._tMode = "GET";
    this.post_delim = "_";
    this._waitMode = 0;
    this._in_progress = {};
    this._invalid = {};
    this.mandatoryFields = [];
    this.messages = [];
    this.styles = {
        updated: "font-weight:bold;",
        inserted: "font-weight:bold;",
        deleted: "text-decoration : line-through;",
        invalid: "background-color:FFE0E0;",
        invalid_cell: "border-bottom:2px solid red;",
        error: "color:red;",
        clear: "font-weight:normal;text-decoration:none;"
    };
    this.enableUTFencoding(!0);
    dhtmlxEventable(this);
    return this
}
dataProcessor.prototype = {
    setTransactionMode: function (a, e) {
        this._tMode = a;
        this._tSend = e
    },
    escape: function (a) {
        return this._utf ? encodeURIComponent(a) : escape(a)
    },
    enableUTFencoding: function (a) {
        this._utf = convertStringToBoolean(a)
    },
    setDataColumns: function (a) {
        this._columns = typeof a == "string" ? a.split(",") : a
    },
    getSyncState: function () {
        return !this.updatedRows.length
    },
    enableDataNames: function (a) {
        this._endnm = convertStringToBoolean(a)
    },
    enablePartialDataSend: function (a) {
        this._changed = convertStringToBoolean(a)
    },
    setUpdateMode: function (a, e) {
        this.autoUpdate = a == "cell";
        this.updateMode = a;
        this.dnd = e
    },
    ignore: function (a, e) {
        this._silent_mode = !0;
        a.call(e || window);
        this._silent_mode = !1
    },
    setUpdated: function (a, e, b) {
        if (!this._silent_mode) {
            var c = this.findRow(a),
                b = b || "updated",
                d = this.obj.getUserData(a, this.action_param);
            d && b == "updated" && (b = d);
            e ? (this.set_invalid(a, !1), this.updatedRows[c] = a, this.obj.setUserData(a, this.action_param, b), this._in_progress[a] && (this._in_progress[a] = "wait")) : this.is_invalid(a) || (this.updatedRows.splice(c, 1), this.obj.setUserData(a, this.action_param, ""));
            e || this._clearUpdateFlag(a);
            this.markRow(a, e, b);
            e && this.autoUpdate && this.sendData(a)
        }
    },
    _clearUpdateFlag: function () {},
    markRow: function (a, e, b) {
        var c = "",
            d = this.is_invalid(a);
        d && (c = this.styles[d], e = !0);
        if (this.callEvent("onRowMark", [a, e, b, d]) && (c = this.styles[e ? b : "clear"] + c, this.obj[this._methods[0]](a, c), d && d.details)) {
            c += this.styles[d + "_cell"];
            for (var h = 0; h < d.details.length; h++) if (d.details[h]) this.obj[this._methods[1]](a, h, c)
        }
    },
    getState: function (a) {
        return this.obj.getUserData(a, this.action_param)
    },
    is_invalid: function (a) {
        return this._invalid[a]
    },
    set_invalid: function (a, e, b) {
        b && (e = {
            value: e,
            details: b,
            toString: function () {
                return this.value.toString()
            }
        });
        this._invalid[a] = e
    },
    checkBeforeUpdate: function () {
        return !0
    },
    sendData: function (a) {
        if (!this._waitMode || !(this.obj.mytype == "tree" || this.obj._h2)) {
            this.obj.editStop && this.obj.editStop();
            if (typeof a == "undefined" || this._tSend) return this.sendAllData();
            if (this._in_progress[a]) return !1;
            this.messages = [];
            if (!this.checkBeforeUpdate(a) && this.callEvent("onValidatationError", [a, this.messages])) return !1;
            this._beforeSendData(this._getRowData(a), a)
        }
    },
    _beforeSendData: function (a, e) {
        if (!this.callEvent("onBeforeUpdate", [e, this.getState(e), a])) return !1;
        this._sendData(a, e)
    },
    serialize: function (a, e) {
        if (typeof a == "string") return a;
        if (typeof e != "undefined") return this.serialize_one(a, "");
        else {
            var b = [],
                c = [],
                d;
            for (d in a) a.hasOwnProperty(d) && (b.push(this.serialize_one(a[d], d + this.post_delim)), c.push(d));
            b.push("ids=" + this.escape(c.join(",")));
            dhtmlx.security_key && b.push("dhx_security=" + dhtmlx.security_key);
            return b.join("&")
        }
    },
    serialize_one: function (a, e) {
        if (typeof a == "string") return a;
        var b = [],
            c;
        for (c in a) a.hasOwnProperty(c) && b.push(this.escape((e || "") + c) + "=" + this.escape(a[c]));
        return b.join("&")
    },
    _sendData: function (a, e) {
        if (a) {
            if (!this.callEvent("onBeforeDataSending", e ? [e, this.getState(e), a] : [null, null, a])) return !1;
            e && (this._in_progress[e] = (new Date).valueOf());
            var b = new dtmlXMLLoaderObject(this.afterUpdate, this, !0),
                c = this.serverProcessor + (this._user ? getUrlSymbol(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.obj.getUserData(0, "version")].join("&") : "");
            this._tMode != "POST" ? b.loadXML(c + (c.indexOf("?") != -1 ? "&" : "?") + this.serialize(a, e)) : b.loadXML(c, !0, this.serialize(a, e));
            this._waitMode++
        }
    },
    sendAllData: function () {
        if (this.updatedRows.length) {
            this.messages = [];
            for (var a = !0, e = 0; e < this.updatedRows.length; e++) a &= this.checkBeforeUpdate(this.updatedRows[e]);
            if (!a && !this.callEvent("onValidatationError", ["", this.messages])) return !1;
            if (this._tSend) this._sendData(this._getAllData());
            else for (e = 0; e < this.updatedRows.length; e++) if (!this._in_progress[this.updatedRows[e]] && !this.is_invalid(this.updatedRows[e]) && (this._beforeSendData(this._getRowData(this.updatedRows[e]), this.updatedRows[e]), this._waitMode && (this.obj.mytype == "tree" || this.obj._h2))) break
        }
    },
    _getAllData: function () {
        for (var a = {}, e = !1, b = 0; b < this.updatedRows.length; b++) {
            var c = this.updatedRows[b];
            !this._in_progress[c] && !this.is_invalid(c) && this.callEvent("onBeforeUpdate", [c, this.getState(c)]) && (a[c] = this._getRowData(c, c + this.post_delim), e = !0, this._in_progress[c] = (new Date).valueOf())
        }
        return e ? a : null
    },
    setVerificator: function (a, e) {
        this.mandatoryFields[a] = e ||
        function (b) {
            return b != ""
        }
    },
    clearVerificator: function (a) {
        this.mandatoryFields[a] = !1
    },
    findRow: function (a) {
        for (var e = 0, e = 0; e < this.updatedRows.length; e++) if (a == this.updatedRows[e]) break;
        return e
    },
    defineAction: function (a, e) {
        if (!this._uActions) this._uActions = [];
        this._uActions[a] = e
    },
    afterUpdateCallback: function (a, e, b, c) {
        var d = a,
            h = b != "error" && b != "invalid";
        h || this.set_invalid(a, b);
        if (this._uActions && this._uActions[b] && !this._uActions[b](c)) return delete this._in_progress[d];
        this._in_progress[d] != "wait" && this.setUpdated(a, !1);
        var g = a;
        switch (b) {
        case "update":
        case "updated":
        case "inserted":
        case "insert":
            e != a && (this.obj[this._methods[2]](a, e), a = e);
            break;
        case "delete":
        case "deleted":
            return this.obj.setUserData(a, this.action_param, "true_deleted"), this.obj[this._methods[3]](a), delete this._in_progress[d], this.callEvent("onAfterUpdate", [a, b, e, c])
        }
        this._in_progress[d] != "wait" ? (h && this.obj.setUserData(a, this.action_param, ""), delete this._in_progress[d]) : (delete this._in_progress[d], this.setUpdated(e, !0, this.obj.getUserData(a, this.action_param)));
        this.callEvent("onAfterUpdate", [a, b, e, c])
    },
    afterUpdate: function (a, e, b, c, d) {
        d.getXMLTopNode("data");
        if (d.xmlDoc.responseXML) {
            for (var h = d.doXPath("//data/action"), g = 0; g < h.length; g++) {
                var f = h[g],
                    j = f.getAttribute("type"),
                    i = f.getAttribute("sid"),
                    n = f.getAttribute("tid");
                a.afterUpdateCallback(i, n, j, f)
            }
            a.finalizeUpdate()
        }
    },
    finalizeUpdate: function () {
        this._waitMode && this._waitMode--;
        (this.obj.mytype == "tree" || this.obj._h2) && this.updatedRows.length && this.sendData();
        this.callEvent("onAfterUpdateFinish", []);
        this.updatedRows.length || this.callEvent("onFullSync", [])
    },
    init: function (a) {
        this.obj = a;
        this.obj._dp_init && this.obj._dp_init(this)
    },
    setOnAfterUpdate: function (a) {
        this.attachEvent("onAfterUpdate", a)
    },
    enableDebug: function () {},
    setOnBeforeUpdateHandler: function (a) {
        this.attachEvent("onBeforeDataSending", a)
    },
    setAutoUpdate: function (a, e) {
        a = a || 2E3;
        this._user = e || (new Date).valueOf();
        this._need_update = !1;
        this._loader = null;
        this._update_busy = !1;
        this.attachEvent("onAfterUpdate", function (b, a, h, g) {
            this.afterAutoUpdate(b, a, h, g)
        });
        this.attachEvent("onFullSync", function () {
            this.fullSync()
        });
        var b = this;
        window.setInterval(function () {
            b.loadUpdate()
        }, a)
    },
    afterAutoUpdate: function (a, e) {
        return e == "collision" ? (this._need_update = !0, !1) : !0
    },
    fullSync: function () {
        if (this._need_update == !0) this._need_update = !1, this.loadUpdate();
        return !0
    },
    getUpdates: function (a, e) {
        if (this._update_busy) return !1;
        else this._update_busy = !0;
        this._loader = this._loader || new dtmlXMLLoaderObject(!0);
        this._loader.async = !0;
        this._loader.waitCall = e;
        this._loader.loadXML(a)
    },
    _v: function (a) {
        return a.firstChild ? a.firstChild.nodeValue : ""
    },
    _a: function (a) {
        for (var e = [], b = 0; b < a.length; b++) e[b] = this._v(a[b]);
        return e
    },
    loadUpdate: function () {
        var a = this,
            e = this.obj.getUserData(0, "version"),
            b = this.serverProcessor + getUrlSymbol(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + e].join("&"),
            b = b.replace("editing=true&", "");
        this.getUpdates(b, function () {
            var b = a._loader.doXPath("//userdata");
            a.obj.setUserData(0, "version", a._v(b[0]));
            var d = a._loader.doXPath("//update");
            if (d.length) {
                a._silent_mode = !0;
                for (var h = 0; h < d.length; h++) {
                    var g = d[h].getAttribute("status"),
                        f = d[h].getAttribute("id"),
                        e = d[h].getAttribute("parent");
                    switch (g) {
                    case "inserted":
                        a.callEvent("insertCallback", [d[h], f, e]);
                        break;
                    case "updated":
                        a.callEvent("updateCallback", [d[h], f, e]);
                        break;
                    case "deleted":
                        a.callEvent("deleteCallback", [d[h], f, e])
                    }
                }
                a._silent_mode = !1
            }
            a._update_busy = !1;
            a = null
        })
    }
};
if (window.dhtmlXGridObject) dhtmlXGridObject.prototype._init_point_connector = dhtmlXGridObject.prototype._init_point, dhtmlXGridObject.prototype._init_point = function () {
    var a = function (b) {
            b = b.replace(/(\?|\&)connector[^\f]*/g, "");
            return b + (b.indexOf("?") != -1 ? "&" : "?") + "connector=true" + (this.hdr.rows.length > 0 ? "&dhx_no_header=1" : "")
        },
        e = function (b) {
            return a.call(this, b) + (this._connector_sorting || "") + (this._connector_filter || "")
        },
        b = function (b, a, c) {
            this._connector_sorting = "&dhx_sort[" + a + "]=" + c;
            return e.call(this, b)
        },
        c = function (b, a, c) {
            for (var f = 0; f < a.length; f++) a[f] = "dhx_filter[" + a[f] + "]=" + encodeURIComponent(c[f]);
            this._connector_filter = "&" + a.join("&");
            return e.call(this, b)
        };
    this.attachEvent("onCollectValues", function (b) {
        return this._con_f_used[b] ? typeof this._con_f_used[b] == "object" ? this._con_f_used[b] : !1 : !0
    });
    this.attachEvent("onDynXLS", function () {
        this.xmlFileUrl = e.call(this, this.xmlFileUrl);
        return !0
    });
    this.attachEvent("onBeforeSorting", function (a, c, g) {
        if (c == "connector") {
            var f = this;
            this.clearAndLoad(b.call(this, this.xmlFileUrl, a, g), function () {
                f.setSortImgState(!0, a, g)
            });
            return !1
        }
        return !0
    });
    this.attachEvent("onFilterStart", function (b, a) {
        return this._con_f_used.length ? (this.clearAndLoad(c.call(this, this.xmlFileUrl, b, a)), !1) : !0
    });
    this.attachEvent("onXLE", function () {});
    this._init_point_connector && this._init_point_connector()
}, dhtmlXGridObject.prototype._con_f_used = [], dhtmlXGridObject.prototype._in_header_connector_text_filter = function (a, e) {
    this._con_f_used[e] || (this._con_f_used[e] = 1);
    return this._in_header_text_filter(a, e)
}, dhtmlXGridObject.prototype._in_header_connector_select_filter = function (a, e) {
    this._con_f_used[e] || (this._con_f_used[e] = 2);
    return this._in_header_select_filter(a, e)
}, dhtmlXGridObject.prototype.load_connector = dhtmlXGridObject.prototype.load, dhtmlXGridObject.prototype.load = function (a, e, b) {
    if (!this._colls_loaded && this.cellType) {
        for (var c = [], d = 0; d < this.cellType.length; d++)(this.cellType[d].indexOf("co") == 0 || this._con_f_used[d] == 2) && c.push(d);
        c.length && (arguments[0] += (arguments[0].indexOf("?") != -1 ? "&" : "?") + "connector=true&dhx_colls=" + c.join(","))
    }
    return this.load_connector.apply(this, arguments)
}, dhtmlXGridObject.prototype._parseHead_connector = dhtmlXGridObject.prototype._parseHead, dhtmlXGridObject.prototype._parseHead = function (a, e, b) {
    this._parseHead_connector.apply(this, arguments);
    if (!this._colls_loaded) {
        for (var c = this.xmlLoader.doXPath("./coll_options", arguments[0]), d = 0; d < c.length; d++) {
            var h = c[d].getAttribute("for"),
                g = [],
                f = null;
            this.cellType[h] == "combo" && (f = this.getColumnCombo(h));
            this.cellType[h].indexOf("co") == 0 && (f = this.getCombo(h));
            for (var j = this.xmlLoader.doXPath("./item", c[d]), i = 0; i < j.length; i++) {
                var n = j[i].getAttribute("value");
                if (f) {
                    var k = j[i].getAttribute("label") || n;
                    f.addOption ? f.addOption([
                        [n, k]
                    ]) : f.put(n, k);
                    g[g.length] = k
                } else g[g.length] = n
            }
            this._con_f_used[h * 1] && (this._con_f_used[h * 1] = g)
        }
        this._colls_loaded = !0
    }
};
if (window.dataProcessor) dataProcessor.prototype.init_original = dataProcessor.prototype.init, dataProcessor.prototype.init = function (a) {
    this.init_original(a);
    a._dataprocessor = this;
    this.setTransactionMode("POST", !0);
    this.serverProcessor += (this.serverProcessor.indexOf("?") != -1 ? "&" : "?") + "editing=true"
};
dhtmlxError.catchError("LoadXML", function (a, e, b) {
    b[0].status != 0 && alert(b[0].responseText)
});
window.jQuery &&
function (a) {
    var e = 0,
        b = [];
    a.fn.dhx_scheduler = function (c) {
        if (typeof c === "string") if (b[c]) return b[c].apply(this, []);
        else a.error("Method " + c + " does not exist on jQuery.dhx_scheduler");
        else {
            var d = [];
            this.each(function () {
                if (this && this.getAttribute) if (this.getAttribute("dhxscheduler")) d.push(window[this.getAttribute("dhxscheduler")]);
                else {
                    var b = "scheduler";
                    e && (b = "scheduler" + (e + 1), window[b] = Scheduler.getSchedulerInstance());
                    var a = window[b];
                    this.setAttribute("dhxscheduler", b);
                    for (var f in c) f != "data" && (a.config[f] = c[f]);
                    if (!this.getElementsByTagName("div").length) this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', this.className += " dhx_cal_container";
                    a.init(this, a.config.date, a.config.mode);
                    c.data && a.parse(c.data);
                    d.push(a);
                    e++
                }
            });
            return d.length === 1 ? d[0] : d
        }
    }
}(jQuery);
window.Scheduler = {
    _seed: 0
};
Scheduler.plugin = function (a) {
    this._schedulerPlugins.push(a);
    a(window.scheduler)
};
Scheduler._schedulerPlugins = [];
Scheduler.getSchedulerInstance = function () {
    var a = {
        version: "4.0.1"
    };
    dhtmlxEventable(a);
    a.init = function (b, c, d) {
        c = c || a._currentDate();
        d = d || "week";
        this._skin_init && a._skin_init();
        a.date.init();
        this._obj = typeof b == "string" ? document.getElementById(b) : b;
        this._els = [];
        this._scroll = !0;
        this._quirks = _isIE && document.compatMode == "BackCompat";
        this._quirks7 = _isIE && navigator.appVersion.indexOf("MSIE 8") == -1;
        this.get_elements();
        this.init_templates();
        this.set_actions();
        (function () {
            function b() {
                return {
                    w: window.innerWidth || document.documentElement.clientWidth,
                    h: window.innerHeight || document.documentElement.clientHeight
                }
            }
            function c(b, a) {
                return b.w == a.w && b.h == a.h
            }
            var d = b();
            dhtmlxEvent(window, "resize", function () {
                var e = b();
                if (!c(d, e)) window.clearTimeout(a._resize_timer), a._resize_timer = window.setTimeout(function () {
                    a.callEvent("onSchedulerResize", []) && (a.update_view(), a.callEvent("onAfterSchedulerResize", []))
                }, 100);
                d = e
            })
        })();
        this._init_touch_events();
        this.set_sizes();
        a.callEvent("onSchedulerReady", []);
        this.setCurrentView(c, d)
    };
    a.xy = {
        min_event_height: 40,
        scale_width: 50,
        scroll_width: 18,
        scale_height: 20,
        month_scale_height: 20,
        menu_width: 25,
        margin_top: 0,
        margin_left: 0,
        editor_width: 140
    };
    a.keys = {
        edit_save: 13,
        edit_cancel: 27
    };
    a.set_sizes = function () {
        var b = this._x = this._obj.clientWidth - this.xy.margin_left,
            a = this._y = this._obj.clientHeight - this.xy.margin_top,
            d = this._table_view ? 0 : this.xy.scale_width + this.xy.scroll_width,
            h = this._table_view ? -1 : this.xy.scale_width;
        this.set_xy(this._els.dhx_cal_navline[0], b, this.xy.nav_height, 0, 0);
        this.set_xy(this._els.dhx_cal_header[0], b - d, this.xy.scale_height, h, this.xy.nav_height + (this._quirks ? -1 : 1));
        var g = this._els.dhx_cal_navline[0].offsetHeight;
        if (g > 0) this.xy.nav_height = g;
        var f = this.xy.scale_height + this.xy.nav_height + (this._quirks ? -2 : 0);
        this.set_xy(this._els.dhx_cal_data[0], b, a - (f + 2), 0, f + 2)
    };
    a.set_xy = function (b, a, d, h, g) {
        b.style.width = Math.max(0, a) + "px";
        b.style.height = Math.max(0, d) + "px";
        if (arguments.length > 3) b.style.left = h + "px", b.style.top = g + "px"
    };
    a.get_elements = function () {
        for (var b = this._obj.getElementsByTagName("DIV"), c = 0; c < b.length; c++) {
            var d = b[c].className;
            d && (d = d.split(" ")[0]);
            this._els[d] || (this._els[d] = []);
            this._els[d].push(b[c]);
            var h = a.locale.labels[b[c].getAttribute("name") || d];
            if (h) b[c].innerHTML = h
        }
    };
    a.set_actions = function () {
        for (var b in this._els) if (this._click[b]) for (var c = 0; c < this._els[b].length; c++) this._els[b][c].onclick = a._click[b];
        this._obj.onselectstart = function () {
            return !1
        };
        this._obj.onmousemove = function (b) {
            a._temp_touch_block || a._on_mouse_move(b || event)
        };
        this._obj.onmousedown = function (b) {
            a._ignore_next_click || a._on_mouse_down(b || event)
        };
        this._obj.onmouseup = function (b) {
            a._ignore_next_click || a._on_mouse_up(b || event)
        };
        this._obj.ondblclick = function (b) {
            a._on_dbl_click(b || event)
        };
        this._obj.oncontextmenu = function (b) {
            var c = b || event,
                g = c.target || c.srcElement,
                f = a.callEvent("onContextMenu", [a._locate_event(g), c]);
            return f
        }
    };
    a.select = function (b) {
        if (this._select_id != b) this.editStop(!1), this.unselect(), this._select_id = b, this.updateEvent(b)
    };
    a.unselect = function (b) {
        if (!(b && b != this._select_id)) {
            var a = this._select_id;
            this._select_id = null;
            a && this.updateEvent(a)
        }
    };
    a.getState = function () {
        return {
            mode: this._mode,
            date: this._date,
            min_date: this._min_date,
            max_date: this._max_date,
            editor_id: this._edit_id,
            lightbox_id: this._lightbox_id,
            new_event: this._new_event,
            select_id: this._select_id,
            expanded: this.expanded,
            drag_id: this._drag_id,
            drag_mode: this._drag_mode
        }
    };
    a._click = {
        dhx_cal_data: function (b) {
            if (a._ignore_next_click) return b.preventDefault && b.preventDefault(), b.cancelBubble = !0, a._ignore_next_click = !1;
            var c = b ? b.target : event.srcElement,
                d = a._locate_event(c),
                b = b || event;
            if (d) {
                if (!a.callEvent("onClick", [d, b]) || a.config.readonly) return
            } else a.callEvent("onEmptyClick", [a.getActionData(b).date, b]);
            if (d && a.config.select) {
                a.select(d);
                var h = c.className;
                if (h.indexOf("_icon") != -1) a._click.buttons[h.split(" ")[1].replace("icon_", "")](d)
            } else a._close_not_saved()
        },
        dhx_cal_prev_button: function () {
            a._click.dhx_cal_next_button(0, -1)
        },
        dhx_cal_next_button: function (b, c) {
            a.setCurrentView(a.date.add(a.date[a._mode + "_start"](a._date), c || 1, a._mode))
        },
        dhx_cal_today_button: function () {
            a.callEvent("onBeforeTodayDisplayed", []) && a.setCurrentView(a._currentDate())
        },
        dhx_cal_tab: function () {
            var b = this.getAttribute("name"),
                c = b.substring(0, b.search("_tab"));
            a.setCurrentView(a._date, c)
        },
        buttons: {
            "delete": function (b) {
                var c = a.locale.labels.confirm_deleting;
                a._dhtmlx_confirm(c, a.locale.labels.title_confirm_deleting, function () {
                    a.deleteEvent(b)
                })
            },
            edit: function (b) {
                a.edit(b)
            },
            save: function () {
                a.editStop(!0)
            },
            details: function (b) {
                a.showLightbox(b)
            },
            cancel: function () {
                a.editStop(!1)
            }
        }
    };
    a._dhtmlx_confirm = function (b, a, d) {
        if (!b) return d();
        var h = {
            text: b
        };
        if (a) h.title = a;
        if (d) h.callback = function (b) {
            b && d()
        };
        dhtmlx.confirm(h)
    };
    a.addEventNow = function (b, c, d) {
        var h = {};
        b && b.constructor.toString().match(/object/i) !== null && (h = b, b = null);
        var g = (this.config.event_duration || this.config.time_step) * 6E4;
        b || (b = h.start_date || Math.round(a._currentDate().valueOf() / g) * g);
        var f = new Date(b);
        if (!c) {
            var e = this.config.first_hour;
            e > f.getHours() && (f.setHours(e), b = f.valueOf());
            c = b.valueOf() + g
        }
        var i = new Date(c);
        f.valueOf() == i.valueOf() && i.setTime(i.valueOf() + g);
        h.start_date = h.start_date || f;
        h.end_date = h.end_date || i;
        h.text = h.text || this.locale.labels.new_event;
        h.id = this._drag_id = this.uid();
        this._drag_mode = "new-size";
        this._loading = !0;
        this.addEvent(h);
        this.callEvent("onEventCreated", [this._drag_id, d]);
        this._loading = !1;
        this._drag_event = {};
        this._on_mouse_up(d)
    };
    a._on_dbl_click = function (b, c) {
        c = c || b.target || b.srcElement;
        if (!this.config.readonly && c.className) {
            var d = c.className.split(" ")[0];
            switch (d) {
            case "dhx_scale_holder":
            case "dhx_scale_holder_now":
            case "dhx_month_body":
            case "dhx_wa_day_data":
            case "dhx_marked_timespan":
                if (!a.config.dblclick_create) break;
                this.addEventNow(this.getActionData(b).date, null, b);
                break;
            case "dhx_cal_event":
            case "dhx_wa_ev_body":
            case "dhx_agenda_line":
            case "dhx_grid_event":
            case "dhx_cal_event_line":
            case "dhx_cal_event_clear":
                var h = this._locate_event(c);
                if (!this.callEvent("onDblClick", [h, b])) break;
                this.config.details_on_dblclick || this._table_view || !this.getEvent(h)._timed || !this.config.select ? this.showLightbox(h) : this.edit(h);
                break;
            case "dhx_time_block":
            case "dhx_cal_container":
                break;
            default:
                var g = this["dblclick_" + d];
                if (g) g.call(this, b);
                else if (c.parentNode && c != this) return a._on_dbl_click(b, c.parentNode)
            }
        }
    };
    a._mouse_coords = function (b) {
        var c, d = document.body,
            h = document.documentElement;
        c = !_isIE && (b.pageX || b.pageY) ? {
            x: b.pageX,
            y: b.pageY
        } : {
            x: b.clientX + (d.scrollLeft || h.scrollLeft || 0) - d.clientLeft,
            y: b.clientY + (d.scrollTop || h.scrollTop || 0) - d.clientTop
        };
        c.x -= getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width);
        c.y -= getAbsoluteTop(this._obj) + this.xy.nav_height + (this._dy_shift || 0) + this.xy.scale_height - this._els.dhx_cal_data[0].scrollTop;
        c.ev = b;
        var g = this["mouse_" + this._mode];
        if (g) return g.call(this, c);
        if (this._cols) {
            var f = c.x / this._cols[0];
            if (this._ignores) for (var e = 0; e <= f; e++) this._ignores[e] && f++
        }
        if (this._table_view) {
            if (!this._cols || !this._colsS) return c;
            for (var i = 0, i = 1; i < this._colsS.heights.length; i++) if (this._colsS.heights[i] > c.y) break;
            c.y = Math.ceil((Math.max(0, f) + Math.max(0, i - 1) * 7) * 1440 / this.config.time_step);
            if (a._drag_mode || this._mode == "month") c.y = (Math.max(0, Math.ceil(f) - 1) + Math.max(0, i - 1) * 7) * 1440 / this.config.time_step;
            if (this._drag_mode == "move" && a._ignores_detected && a.config.preserve_length && (c._ignores = !0, !this._drag_event._event_length)) this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, {
                x_step: 1,
                x_unit: "day"
            });
            c.x = 0
        } else {
            if (!this._cols) return c;
            c.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(f) - 1));
            c.y = Math.max(0, Math.ceil(c.y * 60 / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step)
        }
        return c
    };
    a._close_not_saved = function () {
        if ((new Date).valueOf() - (a._new_event || 0) > 500 && a._edit_id) {
            var b = a.locale.labels.confirm_closing;
            a._dhtmlx_confirm(b, a.locale.labels.title_confirm_closing, function () {
                a.editStop(a.config.positive_closing)
            })
        }
    };
    a._correct_shift = function (b, c) {
        return b -= ((new Date(a._min_date)).getTimezoneOffset() - (new Date(b)).getTimezoneOffset()) * 6E4 * (c ? -1 : 1)
    };
    a._on_mouse_move = function (b) {
        if (this._drag_mode) {
            var c = this._mouse_coords(b);
            if (!this._drag_pos || c.force_redraw || this._drag_pos.x != c.x || this._drag_pos.y != c.y) {
                var d, h;
                this._edit_id != this._drag_id && this._close_not_saved();
                this._drag_pos = c;
                if (this._drag_mode == "create") {
                    this._close_not_saved();
                    this._loading = !0;
                    d = this._get_date_from_pos(c).valueOf();
                    if (!this._drag_start) {
                        var g = this.callEvent("onBeforeEventCreated", [b, this._drag_id]);
                        if (!g) return;
                        this._drag_start = d;
                        return
                    }
                    h = d;
                    var f = new Date(this._drag_start),
                        e = new Date(h);
                    if ((this._mode == "day" || this._mode == "week") && f.getHours() == e.getHours() && f.getMinutes() == e.getMinutes()) e = new Date(this._drag_start + 1E3);
                    this._drag_id = this.uid();
                    this.addEvent(f, e, this.locale.labels.new_event, this._drag_id, c.fields);
                    this.callEvent("onEventCreated", [this._drag_id, b]);
                    this._loading = !1;
                    this._drag_mode = "new-size"
                }
                var i = this.getEvent(this._drag_id);
                if (this._drag_mode == "move") if (d = this._min_date.valueOf() + (c.y * this.config.time_step + c.x * 1440 - (a._move_pos_shift || 0)) * 6E4, !c.custom && this._table_view && (d += this.date.time_part(i.start_date) * 1E3), d = this._correct_shift(d), c._ignores && this.config.preserve_length && this._table_view) {
                    if (this.matrix) var n = this.matrix[this._mode];
                    n = n || {
                        x_step: 1,
                        x_unit: "day"
                    };
                    h = d * 1 + this._get_fictional_event_length(d, this._drag_event._event_length, n)
                } else h = i.end_date.valueOf() - (i.start_date.valueOf() - d);
                else {
                    d = i.start_date.valueOf();
                    h = i.end_date.valueOf();
                    if (this._table_view) {
                        var k = this._min_date.valueOf() + c.y * this.config.time_step * 6E4 + (c.custom ? 0 : 864E5);
                        this._mode == "month" && (k = this._correct_shift(k, !1));
                        c.resize_from_start ? d = k : h = k
                    } else if (h = this.date.date_part(new Date(i.end_date)).valueOf() + c.y * this.config.time_step * 6E4, this._els.dhx_cal_data[0].style.cursor = "s-resize", this._mode == "week" || this._mode == "day") h = this._correct_shift(h);
                    if (this._drag_mode == "new-size") if (h <= this._drag_start) {
                        var l = c.shift || (this._table_view && !c.custom ? 864E5 : 0);
                        d = h - (c.shift ? 0 : l);
                        h = this._drag_start + (l || this.config.time_step * 6E4)
                    } else d = this._drag_start;
                    else h <= d && (h = d + this.config.time_step * 6E4)
                }
                var m = new Date(h - 1),
                    o = new Date(d);
                if (this._table_view || m.getDate() == o.getDate() && m.getHours() < this.config.last_hour || a._allow_dnd) if (i.start_date = o, i.end_date = new Date(h), this.config.update_render) {
                    var r = a._els.dhx_cal_data[0].scrollTop;
                    this.update_view();
                    a._els.dhx_cal_data[0].scrollTop = r
                } else this.updateEvent(this._drag_id);
                this._table_view && this.for_rendered(this._drag_id, function (b) {
                    b.className += " dhx_in_move"
                })
            }
        } else if (a.checkEvent("onMouseMove")) {
            var p = this._locate_event(b.target || b.srcElement);
            this.callEvent("onMouseMove", [p, b])
        }
    };
    a._on_mouse_down = function (b, c) {
        if (b.button != 2 && !this.config.readonly && !this._drag_mode) {
            var c = c || b.target || b.srcElement,
                d = c.className && c.className.split(" ")[0];
            switch (d) {
            case "dhx_cal_event_line":
            case "dhx_cal_event_clear":
                if (this._table_view) this._drag_mode = "move";
                break;
            case "dhx_event_move":
            case "dhx_wa_ev_body":
                this._drag_mode = "move";
                break;
            case "dhx_event_resize":
                this._drag_mode = "resize";
                break;
            case "dhx_scale_holder":
            case "dhx_scale_holder_now":
            case "dhx_month_body":
            case "dhx_matrix_cell":
            case "dhx_marked_timespan":
                this._drag_mode = "create";
                this.unselect(this._select_id);
                break;
            case "":
                if (c.parentNode) return a._on_mouse_down(b, c.parentNode);
            default:
                if (a.checkEvent("onMouseDown") && a.callEvent("onMouseDown", [d]) && c.parentNode && c != this) return a._on_mouse_down(b, c.parentNode);
                this._drag_id = this._drag_mode = null
            }
            if (this._drag_mode) {
                var h = this._locate_event(c);
				!this.config["drag_" + this._drag_mode] || !this.callEvent("onBeforeDrag", [this.getEvent(h)]) ? this._drag_mode = this._drag_id = 0 : (this._drag_id = h, this._drag_event = a._lame_clone(this.getEvent(this._drag_id) || {}))
            }
            this._drag_start = null
        }
    };
    a._on_mouse_up = function (b) {
        if (!b || !(b.button == 2 && a.config.touch)) {
            if (this._drag_mode && this._drag_id) {
                this._els.dhx_cal_data[0].style.cursor = "default";
                var c = this.getEvent(this._drag_id);
                if (this._drag_event._dhx_changed || !this._drag_event.start_date || c.start_date.valueOf() != this._drag_event.start_date.valueOf() || c.end_date.valueOf() != this._drag_event.end_date.valueOf()) {
                    var d = this._drag_mode == "new-size";
                    if (this.callEvent("onBeforeEventChanged", [c, b, d, this._drag_event])) {
                        var h = this._drag_id;
                        this._drag_id = this._drag_mode = null;
                        if (d && this.config.edit_on_create) {
                            this.unselect();
                            this._new_event = new Date;
                            if (this._table_view || this.config.details_on_create || !this.config.select) return this.showLightbox(h);
                            this._drag_pos = !0;
                            this._select_id = this._edit_id = h
                        } else this._new_event || this.callEvent(d ? "onEventAdded" : "onEventChanged", [h, this.getEvent(h)])
                    } else d ? this.deleteEvent(c.id, !0) : (this._drag_event._dhx_changed = !1, a._lame_copy(c, this._drag_event), this.updateEvent(c.id))
                }
                this._drag_pos && this.render_view_data()
            }
            this._drag_pos = this._drag_mode = this._drag_id = null
        }
    };
    a.update_view = function () {
        this._reset_scale();
        if (this._load_mode && this._load()) return this._render_wait = !0;
        this.render_view_data()
    };
    a.isViewExists = function (b) {
        return !!(a[b + "_view"] || a.date[b + "_start"] && a.templates[b + "_date"] && a.templates[b + "_scale_date"])
    };
    a.updateView = function (b, a) {
        var b = b || this._date,
            a = a || this._mode,
            d = "dhx_cal_data";
        this._mode ? this._obj.className = this._obj.className.replace("dhx_scheduler_" + this._mode, "dhx_scheduler_" + a) : this._obj.className += " dhx_scheduler_" + a;
        var h = this._mode == a && this.config.preserve_scroll ? this._els[d][0].scrollTop : !1;
        if (this[this._mode + "_view"] && a && this._mode != a) this[this._mode + "_view"](!1);
        this._close_not_saved();
        var g = "dhx_multi_day";
        this._els[g] && (this._els[g][0].parentNode.removeChild(this._els[g][0]), this._els[g] = null);
        this._mode = a;
        this._date = b;
        this._table_view = this._mode == "month";
        var f = this._els.dhx_cal_tab;
        if (f) for (var e = 0; e < f.length; e++) {
            var i = f[e].className,
                i = i.replace(/ active/g, "");
            f[e].getAttribute("name") == this._mode + "_tab" && (i += " active");
            f[e].className = i
        }
        var n = this[this._mode + "_view"];
        n ? n(!0) : this.update_view();
        if (typeof h == "number") this._els[d][0].scrollTop = h
    };
    a.setCurrentView = function (b, a) {
        if (this.callEvent("onBeforeViewChange", [this._mode, this._date, a || this._mode, b || this._date])) this.updateView(b, a), this.callEvent("onViewChange", [this._mode, this._date])
    };
    a._render_x_header = function (b, a, d, h) {
        var g = document.createElement("DIV");
        g.className = "dhx_scale_bar";
        this.templates[this._mode + "_scalex_class"] && (g.className += " " + this.templates[this._mode + "_scalex_class"](d));
        var f = this._cols[b] - 1;
        this._mode == "month" && b === 0 && this.config.left_border && (g.className += " dhx_scale_bar_border", a += 1);
        this.set_xy(g, f, this.xy.scale_height - 2, a, 0);
        g.innerHTML = this.templates[this._mode + "_scale_date"](d, this._mode);
        h.appendChild(g)
    };
    a._reset_scale = function () {
        if (this.templates[this._mode + "_date"]) {
            var b = this._els.dhx_cal_header[0],
                c = this._els.dhx_cal_data[0],
                d = this.config;
            b.innerHTML = "";
            c.scrollTop = 0;
            c.innerHTML = "";
            var h = (d.readonly || !d.drag_resize ? " dhx_resize_denied" : "") + (d.readonly || !d.drag_move ? " dhx_move_denied" : "");
            if (h) c.className = "dhx_cal_data" + h;
            this._scales = {};
            this._cols = [];
            this._colsS = {
                height: 0
            };
            this._dy_shift = 0;
            this.set_sizes();
            var g = parseInt(b.style.width, 10),
                f = 0,
                e, i, n, k;
            i = this.date[this._mode + "_start"](new Date(this._date.valueOf()));
            e = n = this._table_view ? a.date.week_start(i) : i;
            k = this.date.date_part(a._currentDate());
            var l = a.date.add(i, 1, this._mode),
                m = 7;
            if (!this._table_view) {
                var o = this.date["get_" + this._mode + "_end"];
                o && (l = o(i));
                m = Math.round((l.valueOf() - i.valueOf()) / 864E5)
            }
            this._min_date = e;
            this._els.dhx_cal_date[0].innerHTML = this.templates[this._mode + "_date"](i, l, this._mode);
            this._process_ignores(n, m, "day", 1);
            for (var r = m - this._ignores_detected, p = 0; p < m; p++) {
                this._ignores[p] ? (this._cols[p] = 0, r++) : (this._cols[p] = Math.floor(g / (r - p)), this._render_x_header(p, f, e, b));
                if (!this._table_view) {
                    var q = document.createElement("DIV"),
                        s = "dhx_scale_holder";
                    e.valueOf() == k.valueOf() && (s = "dhx_scale_holder_now");
                    q.className = s + " " + this.templates.week_date_class(e, k);
                    this.set_xy(q, this._cols[p] - 1, d.hour_size_px * (d.last_hour - d.first_hour), f + this.xy.scale_width + 1, 0);
                    c.appendChild(q);
                    this.callEvent("onScaleAdd", [q, e])
                }
                e = this.date.add(e, 1, "day");
                g -= this._cols[p];
                f += this._cols[p];
                this._colsS[p] = (this._cols[p - 1] || 0) + (this._colsS[p - 1] || (this._table_view ? 0 : this.xy.scale_width + 2));
                this._colsS.col_length = m + 1
            }
            this._max_date = e;
            this._colsS[m] = this._cols[m - 1] + this._colsS[m - 1];
            if (this._table_view) this._reset_month_scale(c, i, n);
            else if (this._reset_hours_scale(c, i, n), d.multi_day) {
                var t = "dhx_multi_day";
                this._els[t] && (this._els[t][0].parentNode.removeChild(this._els[t][0]), this._els[t] = null);
                var u = this._els.dhx_cal_navline[0],
                    w = u.offsetHeight + this._els.dhx_cal_header[0].offsetHeight + 1,
                    v = document.createElement("DIV");
                v.className = t;
                v.style.visibility = "hidden";
                this.set_xy(v, this._colsS[this._colsS.col_length - 1] + this.xy.scroll_width, 0, 0, w);
                c.parentNode.insertBefore(v, c);
                var x = v.cloneNode(!0);
                x.className = t + "_icon";
                x.style.visibility = "hidden";
                this.set_xy(x, this.xy.scale_width, 0, 0, w);
                v.appendChild(x);
                this._els[t] = [v, x];
                this._els[t][0].onclick = this._click.dhx_cal_data
            }
        }
    };
    a._reset_hours_scale = function (b) {
        var c = document.createElement("DIV");
        c.className = "dhx_scale_holder";
        for (var d = new Date(1980, 1, 1, this.config.first_hour, 0, 0), h = this.config.first_hour * 1; h < this.config.last_hour; h++) {
            var g = document.createElement("DIV");
            g.className = "dhx_scale_hour";
            g.style.height = this.config.hour_size_px - (this._quirks ? 0 : 1) + "px";
            var e = this.xy.scale_width;
            this.config.left_border && (e -= 1, g.className += " dhx_scale_hour_border");
            g.style.width = e + "px";
            g.innerHTML = a.templates.hour_scale(d);
            c.appendChild(g);
            d = this.date.add(d, 1, "hour")
        }
        b.appendChild(c);
        if (this.config.scroll_hour) b.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour)
    };
    a._currentDate = function () {
        return a.config.now_date ? new Date(a.config.now_date) : new Date
    };
    a._process_ignores = function (b, c, d, h, g) {
        this._ignores = [];
        this._ignores_detected = 0;
        var e = a["ignore_" + this._mode];
        if (e) for (var j = new Date(b), i = 0; i < c; i++) e(j) && (this._ignores_detected += 1, this._ignores[i] = !0, g && c++), j = a.date.add(j, h, d)
    };
    a._reset_month_scale = function (b, c, d) {
        var h = a.date.add(c, 1, "month"),
            g = a._currentDate();
        this.date.date_part(g);
        this.date.date_part(d);
        var e = Math.ceil(Math.round((h.valueOf() - d.valueOf()) / 864E5) / 7),
            j = [],
            i = Math.floor(b.clientHeight / e) - 22;
        this._colsS.height = i + 22;
        for (var n = this._colsS.heights = [], k = 0; k <= 7; k++) {
            var l = (this._cols[k] || 0) - 1;
            k === 0 && this.config.left_border && (l -= 1);
            j[k] = " style='height:" + i + "px; width:" + l + "px;' "
        }
        var m = 0;
        this._min_date = d;
        for (var o = "<table cellpadding='0' cellspacing='0'>", r = [], k = 0; k < e; k++) {
            o += "<tr>";
            for (var p = 0; p < 7; p++) {
                o += "<td";
                var q = "";
                d < c ? q = "dhx_before" : d >= h ? q = "dhx_after" : d.valueOf() == g.valueOf() && (q = "dhx_now");
                o += " class='" + q + " " + this.templates.month_date_class(d, g) + "' >";
                var s = "dhx_month_body",
                    t = "dhx_month_head";
                p === 0 && this.config.left_border && (s += " dhx_month_body_border", t += " dhx_month_head_border");
                !this._ignores_detected || !this._ignores[p] ? (o += "<div class='" + t + "'>" + this.templates.month_day(d) + "</div>", o += "<div class='" + s + "' " + j[p] + "></div></td>") : o += "<div></div><div></div>";
                r.push(d);
                d = this.date.add(d, 1, "day")
            }
            o += "</tr>";
            n[k] = m;
            m += this._colsS.height
        }
        o += "</table>";
        this._max_date = d;
        b.innerHTML = o;
        this._scales = {};
        for (var u = b.getElementsByTagName("div"), k = 0; k < r.length; k++) {
            var w = u[k * 2 + 1],
                v = r[k];
            this._scales[+v] = w
        }
        for (k = 0; k < r.length; k++) v = r[k], this.callEvent("onScaleAdd", [this._scales[+v], v]);
        return d
    };
    a.getLabel = function (b, a) {
        for (var d = this.config.lightbox.sections, h = 0; h < d.length; h++) if (d[h].map_to == b) for (var g = d[h].options, e = 0; e < g.length; e++) if (g[e].key == a) return g[e].label;
        return ""
    };
    a.updateCollection = function (b, c) {
        var d = a.serverList(b);
        if (!d) return !1;
        d.splice(0, d.length);
        d.push.apply(d, c || []);
        a.callEvent("onOptionsLoad", []);
        a.resetLightbox();
        return !0
    };
    a._lame_clone = function (b, c) {
        var d, h, g, c = c || [];
        for (d = 0; d < c.length; d += 2) if (b === c[d]) return c[d + 1];
        if (b && typeof b == "object") {
            g = {};
            h = [Array, Date, Number, String, Boolean];
            for (d = 0; d < h.length; d++) b instanceof h[d] && (g = d ? new h[d](b) : new h[d]);
            c.push(b, g);
            for (d in b) Object.prototype.hasOwnProperty.apply(b, [d]) && (g[d] = a._lame_clone(b[d], c))
        }
        return g || b
    };
    a._lame_copy = function (b, a) {
        for (var d in a) a.hasOwnProperty(d) && (b[d] = a[d]);
        return b
    };
    a._get_date_from_pos = function (b) {
        var a = this._min_date.valueOf() + (b.y * this.config.time_step + (this._table_view ? 0 : b.x) * 1440) * 6E4;
        return new Date(this._correct_shift(a))
    };
    a.getActionData = function (b) {
        var a = this._mouse_coords(b);
        return {
            date: this._get_date_from_pos(a),
            section: a.section
        }
    };
    a._focus = function (b, a) {
        b && b.focus && (this.config.touch ? window.setTimeout(function () {
            b.focus()
        }, 100) : (a && b.select && b.select(), b.focus()))
    };
    a._get_real_event_length = function (b, c, d) {
        var h = c - b,
            g = d._start_correction + d._end_correction || 0,
            e = this["ignore_" + this._mode],
            j = 0;
        if (d.render) var j = this._get_date_index(d, b),
            i = this._get_date_index(d, c);
        else i = Math.round(h / 60 / 60 / 1E3 / 24);
        for (; j < i;) {
            var n = a.date.add(c, -d.x_step, d.x_unit);
            h -= e && e(c) ? c - n : g;
            c = n;
            i--
        }
        return h
    };
    a._get_fictional_event_length = function (b, c, d, h) {
        var e = new Date(b),
            f = h ? -1 : 1;
        if (d._start_correction || d._end_correction) {
            var j = h ? e.getHours() * 60 + e.getMinutes() - (d.first_hour || 0) * 60 : (d.last_hour || 0) * 60 - (e.getHours() * 60 + e.getMinutes()),
                i = (d.last_hour - d.first_hour) * 60,
                n = Math.ceil((c / 6E4 - j) / i);
            c += n * (1440 - i) * 6E4
        }
        var k = new Date(b * 1 + c * f),
            l = this["ignore_" + this._mode],
            m = 0;
        if (d.render) var m = this._get_date_index(d, e),
            o = this._get_date_index(d, k);
        else o = Math.round(c / 60 / 60 / 1E3 / 24);
        for (; m * f <= o * f;) {
            var r = a.date.add(e, d.x_step * f, d.x_unit);
            l && l(e) && (c += (r - e) * f, o += f);
            e = r;
            m += f
        }
        return c
    };
    a.date = {
        init: function () {
            for (var b = a.locale.date.month_short, c = a.locale.date.month_short_hash = {}, d = 0; d < b.length; d++) c[b[d]] = d;
            b = a.locale.date.month_full;
            c = a.locale.date.month_full_hash = {};
            for (d = 0; d < b.length; d++) c[b[d]] = d
        },
        date_part: function (b) {
            b.setHours(0);
            b.setMinutes(0);
            b.setSeconds(0);
            b.setMilliseconds(0);
            b.getHours() != 0 && b.setTime(b.getTime() + 36E5 * (24 - b.getHours()));
            return b
        },
        time_part: function (b) {
            return (b.valueOf() / 1E3 - b.getTimezoneOffset() * 60) % 86400
        },
        week_start: function (b) {
            var c = b.getDay();
            a.config.start_on_monday && (c === 0 ? c = 6 : c--);
            return this.date_part(this.add(b, -1 * c, "day"))
        },
        month_start: function (b) {
            b.setDate(1);
            return this.date_part(b)
        },
        year_start: function (b) {
            b.setMonth(0);
            return this.month_start(b)
        },
        day_start: function (b) {
            return this.date_part(b)
        },
        add: function (b, c, d) {
            var h = new Date(b.valueOf());
            switch (d) {
            case "week":
                c *= 7;
            case "day":
                h.setDate(h.getDate() + c);
                !b.getHours() && h.getHours() && h.setTime(h.getTime() + 36E5 * (24 - h.getHours()));
                break;
            case "month":
                h.setMonth(h.getMonth() + c);
                break;
            case "year":
                h.setYear(h.getFullYear() + c);
                break;
            case "hour":
                h.setHours(h.getHours() + c);
                break;
            case "minute":
                h.setMinutes(h.getMinutes() + c);
                break;
            default:
                return a.date["add_" + d](b, c, d)
            }
            return h
        },
        to_fixed: function (b) {
            return b < 10 ? "0" + b : b
        },
        copy: function (b) {
            return new Date(b.valueOf())
        },
        date_to_str: function (b, a) {
            b = b.replace(/%[a-zA-Z]/g, function (b) {
                switch (b) {
                case "%d":
                    return '"+scheduler.date.to_fixed(date.getDate())+"';
                case "%m":
                    return '"+scheduler.date.to_fixed((date.getMonth()+1))+"';
                case "%j":
                    return '"+date.getDate()+"';
                case "%n":
                    return '"+(date.getMonth()+1)+"';
                case "%y":
                    return '"+scheduler.date.to_fixed(date.getFullYear()%100)+"';
                case "%Y":
                    return '"+date.getFullYear()+"';
                case "%D":
                    return '"+scheduler.locale.date.day_short[date.getDay()]+"';
                case "%l":
                    return '"+scheduler.locale.date.day_full[date.getDay()]+"';
                case "%M":
                    return '"+scheduler.locale.date.month_short[date.getMonth()]+"';
                case "%F":
                    return '"+scheduler.locale.date.month_full[date.getMonth()]+"';
                case "%h":
                    return '"+scheduler.date.to_fixed((date.getHours()+11)%12+1)+"';
                case "%g":
                    return '"+((date.getHours()+11)%12+1)+"';
                case "%G":
                    return '"+date.getHours()+"';
                case "%H":
                    return '"+scheduler.date.to_fixed(date.getHours())+"';
                case "%i":
                    return '"+scheduler.date.to_fixed(date.getMinutes())+"';
                case "%a":
                    return '"+(date.getHours()>11?"pm":"am")+"';
                case "%A":
                    return '"+(date.getHours()>11?"PM":"AM")+"';
                case "%s":
                    return '"+scheduler.date.to_fixed(date.getSeconds())+"';
                case "%W":
                    return '"+scheduler.date.to_fixed(scheduler.date.getISOWeek(date))+"';
                default:
                    return b
                }
            });
            a && (b = b.replace(/date\.get/g, "date.getUTC"));
            return new Function("date", 'return "' + b + '";')
        },
        str_to_date: function (b, a) {
            for (var d = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);", h = b.match(/%[a-zA-Z]/g), e = 0; e < h.length; e++) switch (h[e]) {
            case "%j":
            case "%d":
                d += "set[2]=temp[" + e + "]||1;";
                break;
            case "%n":
            case "%m":
                d += "set[1]=(temp[" + e + "]||1)-1;";
                break;
            case "%y":
                d += "set[0]=temp[" + e + "]*1+(temp[" + e + "]>50?1900:2000);";
                break;
            case "%g":
            case "%G":
            case "%h":
            case "%H":
                d += "set[3]=temp[" + e + "]||0;";
                break;
            case "%i":
                d += "set[4]=temp[" + e + "]||0;";
                break;
            case "%Y":
                d += "set[0]=temp[" + e + "]||0;";
                break;
            case "%a":
            case "%A":
                d += "set[3]=set[3]%12+((temp[" + e + "]||'').toLowerCase()=='am'?0:12);";
                break;
            case "%s":
                d += "set[5]=temp[" + e + "]||0;";
                break;
            case "%M":
                d += "set[1]=scheduler.locale.date.month_short_hash[temp[" + e + "]]||0;";
                break;
            case "%F":
                d += "set[1]=scheduler.locale.date.month_full_hash[temp[" + e + "]]||0;"
            }
            var f = "set[0],set[1],set[2],set[3],set[4],set[5]";
            a && (f = " Date.UTC(" + f + ")");
            return new Function("date", "var set=[0,0,1,0,0,0]; " + d + " return new Date(" + f + ");")
        },
        getISOWeek: function (b) {
            if (!b) return !1;
            var a = b.getDay();
            a === 0 && (a = 7);
            var d = new Date(b.valueOf());
            d.setDate(b.getDate() + (4 - a));
            var h = d.getFullYear(),
                e = Math.round((d.getTime() - (new Date(h, 0, 1)).getTime()) / 864E5),
                f = 1 + Math.floor(e / 7);
            return f
        },
        getUTCISOWeek: function (b) {
            return this.getISOWeek(this.convert_to_utc(b))
        },
        convert_to_utc: function (b) {
            return new Date(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate(), b.getUTCHours(), b.getUTCMinutes(), b.getUTCSeconds())
        }
    };
    a.locale = {
        date: {
            month_full: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            month_short: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            day_full: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            day_short: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
        },
        labels: {
            dhx_cal_today_button: "Today",
            day_tab: "Day",
            week_tab: "Week",
            month_tab: "Month",
            new_event: "New event",
            icon_save: "Save",
            icon_cancel: "Cancel",
            icon_details: "Details",
            icon_edit: "Edit",
            icon_delete: "Delete",
            confirm_closing: "",
            confirm_deleting: "Event will be deleted permanently, are you sure?",
            section_description: "Description",
            section_time: "Time period",
            full_day: "Full day",
            confirm_recurring: "Do you want to edit the whole set of repeated events?",
            section_recurring: "Repeat event",
            button_recurring: "Disabled",
            button_recurring_open: "Enabled",
            button_edit_series: "Edit series",
            button_edit_occurrence: "Edit occurrence",
            agenda_tab: "Agenda",
            date: "Date",
            description: "Description",
            year_tab: "Year",
            week_agenda_tab: "Agenda",
            grid_tab: "Grid",
            drag_to_create: "Drag to create",
            drag_to_move: "Drag to move"
        }
    };
    a.config = {
        default_date: "%j %M %Y",
        month_date: "%F %Y",
        load_date: "%Y-%m-%d",
        week_date: "%l",
        day_date: "%D, %F %j",
        hour_date: "%H:%i",
        month_day: "%d",
        xml_date: "%m/%d/%Y %H:%i",
        api_date: "%d-%m-%Y %H:%i",
        preserve_length: !0,
        time_step: 5,
        start_on_monday: 1,
        first_hour: 0,
        last_hour: 24,
        readonly: !1,
        drag_resize: 1,
        drag_move: 1,
        drag_create: 1,
        dblclick_create: 1,
        edit_on_create: 1,
        details_on_create: 0,
        cascade_event_display: !1,
        cascade_event_count: 4,
        cascade_event_margin: 30,
        multi_day: !0,
        multi_day_height_limit: 0,
        drag_lightbox: !0,
        preserve_scroll: !0,
        select: !0,
        server_utc: !1,
        touch: !0,
        touch_tip: !0,
        touch_drag: 500,
        quick_info_detached: !0,
        positive_closing: !1,
        icons_edit: ["icon_save", "icon_cancel"],
        icons_select: ["icon_details", "icon_edit", "icon_delete"],
        buttons_left: ["dhx_save_btn", "dhx_cancel_btn"],
        buttons_right: ["dhx_delete_btn"],
        lightbox: {
            sections: [{
                name: "description",
                height: 200,
                map_to: "text",
                type: "textarea",
                focus: !0
            }, {
                name: "time",
                height: 72,
                type: "time",
                map_to: "auto"
            }]
        },
        highlight_displayed_event: !0,
        left_border: !1
    };
    a.templates = {};
    a.init_templates = function () {
        var b = a.locale.labels;
        b.dhx_save_btn = b.icon_save;
        b.dhx_cancel_btn = b.icon_cancel;
        b.dhx_delete_btn = b.icon_delete;
        var c = a.date.date_to_str,
            d = a.config,
            h = function (b, a) {
                for (var c in a) b[c] || (b[c] = a[c])
            };
        h(a.templates, {
            day_date: c(d.default_date),
            month_date: c(d.month_date),
            week_date: function (b, c) {
                return a.templates.day_date(b) + " &ndash; " + a.templates.day_date(a.date.add(c, -1, "day"))
            },
            day_scale_date: c(d.default_date),
            month_scale_date: c(d.week_date),
            week_scale_date: c(d.day_date),
            hour_scale: c(d.hour_date),
            time_picker: c(d.hour_date),
            event_date: c(d.hour_date),
            month_day: c(d.month_day),
            xml_date: a.date.str_to_date(d.xml_date, d.server_utc),
            load_format: c(d.load_date, d.server_utc),
            xml_format: c(d.xml_date, d.server_utc),
            api_date: a.date.str_to_date(d.api_date),
            event_header: function (b, c) {
                return a.templates.event_date(b) + " - " + a.templates.event_date(c)
            },
            event_text: function (b, a, c) {
                return c.text
            },
            event_class: function () {
                return ""
            },
            month_date_class: function () {
                return ""
            },
            week_date_class: function () {
                return ""
            },
            event_bar_date: function (b) {
                return a.templates.event_date(b) + " "
            },
            event_bar_text: function (b, a, c) {
                return c.text
            },
            month_events_link: function (b, a) {
                return "<a>View more(" + a + " events)</a>"
            }
        });
        this.callEvent("onTemplatesReady", [])
    };
    a.uid = function () {
        if (!this._seed) this._seed = (new Date).valueOf();
        return this._seed++
    };
    a._events = {};
    a.clearAll = function () {
        this._events = {};
        this._loaded = {};
        this.clear_view();
        this.callEvent("onClearAll", [])
    };
    a.addEvent = function (b, c, d, h, e) {
        if (!arguments.length) return this.addEventNow();
        var f = b;
        if (arguments.length != 1) f = e || {}, f.start_date = b, f.end_date = c, f.text = d, f.id = h;
        f.id = f.id || a.uid();
        f.text = f.text || "";
        if (typeof f.start_date == "string") f.start_date = this.templates.api_date(f.start_date);
        if (typeof f.end_date == "string") f.end_date = this.templates.api_date(f.end_date);
        var j = (this.config.event_duration || this.config.time_step) * 6E4;
        f.start_date.valueOf() == f.end_date.valueOf() && f.end_date.setTime(f.end_date.valueOf() + j);
        f._timed = this.isOneDayEvent(f);
        var i = !this._events[f.id];
        this._events[f.id] = f;
        this.event_updated(f);
        this._loading || this.callEvent(i ? "onEventAdded" : "onEventChanged", [f.id, f]);
        return f.id
    };
    a.deleteEvent = function (b, a) {
        var d = this._events[b];
        if (a || this.callEvent("onBeforeEventDelete", [b, d]) && this.callEvent("onConfirmedBeforeEventDelete", [b, d])) d && (delete this._events[b], this.unselect(b), this.event_updated(d)), this.callEvent("onEventDeleted", [b, d])
    };
    a.getEvent = function (b) {
        return this._events[b]
    };
    a.setEvent = function (b, a) {
        if (!a.id) a.id = b;
        this._events[b] = a
    };
    a.for_rendered = function (b, a) {
        for (var d = this._rendered.length - 1; d >= 0; d--) this._rendered[d].getAttribute("event_id") == b && a(this._rendered[d], d)
    };
    a.changeEventId = function (b, a) {
        if (b != a) {
            var d = this._events[b];
            if (d) d.id = a, this._events[a] = d, delete this._events[b];
            this.for_rendered(b, function (b) {
                b.setAttribute("event_id", a)
            });
            if (this._select_id == b) this._select_id = a;
            if (this._edit_id == b) this._edit_id = a;
            this.callEvent("onEventIdChange", [b, a])
        }
    };
    (function () {
        for (var b = "text,Text,start_date,StartDate,end_date,EndDate".split(","), c = function (b) {
                return function (c) {
                    return a.getEvent(c)[b]
                }
            }, d = function (b) {
                return function (c, d) {
                    var h = a.getEvent(c);
                    h[b] = d;
                    h._changed = !0;
                    h._timed = this.isOneDayEvent(h);
                    a.event_updated(h, !0)
                }
            }, h = 0; h < b.length; h += 2) a["getEvent" + b[h + 1]] = c(b[h]), a["setEvent" + b[h + 1]] = d(b[h])
    })();
    a.event_updated = function (b) {
        this.is_visible_events(b) ? this.render_view_data() : this.clear_event(b.id)
    };
    a.is_visible_events = function (b) {
        return b.start_date < this._max_date && this._min_date < b.end_date
    };
    a.isOneDayEvent = function (b) {
        var a = b.end_date.getDate() - b.start_date.getDate();
        return a ? (a < 0 && (a = Math.ceil((b.end_date.valueOf() - b.start_date.valueOf()) / 864E5)), a == 1 && !b.end_date.getHours() && !b.end_date.getMinutes() && (b.start_date.getHours() || b.start_date.getMinutes())) : b.start_date.getMonth() == b.end_date.getMonth() && b.start_date.getFullYear() == b.end_date.getFullYear()
    };
    a.get_visible_events = function (b) {
        var a = [],
            d;
        for (d in this._events) this.is_visible_events(this._events[d]) && (!b || this._events[d]._timed) && this.filter_event(d, this._events[d]) && a.push(this._events[d]);
        return a
    };
    a.filter_event = function (b, a) {
        var d = this["filter_" + this._mode];
        return d ? d(b, a) : !0
    };
    a._is_main_area_event = function (b) {
        return !!b._timed
    };
    a.render_view_data = function (b, a) {
        if (!b) {
            if (this._not_render) {
                this._render_wait = !0;
                return
            }
            this._render_wait = !1;
            this.clear_view();
            b = this.get_visible_events(!(this._table_view || this.config.multi_day))
        }
        for (var d = 0, h = b.length; d < h; d++) this._recalculate_timed(b[d]);
        if (this.config.multi_day && !this._table_view) {
            for (var e = [], f = [], d = 0; d < b.length; d++) this._is_main_area_event(b[d]) ? e.push(b[d]) : f.push(b[d]);
            this._rendered_location = this._els.dhx_multi_day[0];
            this._table_view = !0;
            this.render_data(f, a);
            this._table_view = !1;
            this._rendered_location = this._els.dhx_cal_data[0];
            this._table_view = !1;
            this.render_data(e, a)
        } else this._rendered_location = this._els.dhx_cal_data[0], this.render_data(b, a)
    };
    a._view_month_day = function (b) {
        var c = a.getActionData(b).date;
        a.callEvent("onViewMoreClick", [c]) && a.setCurrentView(c, "day")
    };
    a._render_month_link = function (b) {
        for (var c = this._rendered_location, d = this._lame_clone(b), h = b._sday; h < b._eday; h++) {
            d._sday = h;
            d._eday = h + 1;
            var e = a.date,
                f = a._min_date,
                f = e.add(f, d._sweek, "week"),
                f = e.add(f, d._sday, "day"),
                j = a.getEvents(f, e.add(f, 1, "day")).length,
                i = this._get_event_bar_pos(d),
                n = i.x2 - i.x,
                k = document.createElement("div");
            k.onclick = function (b) {
                a._view_month_day(b || event)
            };
            k.className = "dhx_month_link";
            k.style.top = i.y + "px";
            k.style.left = i.x + "px";
            k.style.width = n + "px";
            k.innerHTML = a.templates.month_events_link(f, j);
            this._rendered.push(k);
            c.appendChild(k)
        }
    };
    a._recalculate_timed = function (b) {
        if (b) {
            var c = typeof b != "object" ? this._events[b] : b;
            if (c) c._timed = a.isOneDayEvent(c)
        }
    };
    a.attachEvent("onEventChanged", a._recalculate_timed);
    a.attachEvent("onEventAdded", a._recalculate_timed);
    a.render_data = function (b, c) {
        for (var b = this._pre_render_events(b, c), d = 0; d < b.length; d++) if (this._table_view) if (a._mode != "month") this.render_event_bar(b[d]);
        else {
            var h = a.config.max_month_events;
            h !== h * 1 || b[d]._sorder < h ? this.render_event_bar(b[d]) : h !== void 0 && b[d]._sorder == h && a._render_month_link(b[d])
        } else this.render_event(b[d])
    };
    a._pre_render_events = function (b, c) {
        var d = this.xy.bar_height,
            h = this._colsS.heights,
            e = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0],
            f = this._els.dhx_cal_data[0],
            b = this._table_view ? this._pre_render_events_table(b, c) : this._pre_render_events_line(b, c);
        if (this._table_view) if (c) this._colsS.heights = h;
        else {
            var j = f.firstChild;
            if (j.rows) {
                for (var i = 0; i < j.rows.length; i++) {
                    e[i]++;
                    if (e[i] * d > this._colsS.height - 22) {
                        var n = j.rows[i].cells,
                            k = this._colsS.height - 22;
                        this.config.max_month_events * 1 !== this.config.max_month_events || e[i] <= this.config.max_month_events ? k = e[i] * d : (this.config.max_month_events + 1) * d > this._colsS.height - 22 && (k = (this.config.max_month_events + 1) * d);
                        for (var l = 0; l < n.length; l++) n[l].childNodes[1].style.height = k + "px";
                        e[i] = (e[i - 1] || 0) + n[0].offsetHeight
                    }
                    e[i] = (e[i - 1] || 0) + j.rows[i].cells[0].offsetHeight
                }
                e.unshift(0);
                if (j.parentNode.offsetHeight < j.parentNode.scrollHeight && !j._h_fix && a.xy.scroll_width) {
                    for (i = 0; i < j.rows.length; i++) {
                        for (var m = 6; this._ignores[m];) m--;
                        var o = j.rows[i].cells[m].childNodes[0],
                            r = o.offsetWidth - a.xy.scroll_width + "px";
                        o.style.width = r;
                        o.nextSibling.style.width = r
                    }
                    j._h_fix = !0
                }
            } else if (!b.length && this._els.dhx_multi_day[0].style.visibility == "visible" && (e[0] = -1), b.length || e[0] == -1) {
                var p = j.parentNode.childNodes,
                    q = (e[0] + 1) * d + 1,
                    s = q,
                    t = q + "px";
                this.config.multi_day_height_limit && (s = Math.min(q, this.config.multi_day_height_limit), t = s + "px");
                f.style.top = this._els.dhx_cal_navline[0].offsetHeight + this._els.dhx_cal_header[0].offsetHeight + s + "px";
                f.style.height = this._obj.offsetHeight - parseInt(f.style.top, 10) - (this.xy.margin_top || 0) + "px";
                var u = this._els.dhx_multi_day[0];
                u.style.height = t;
                u.style.visibility = e[0] == -1 ? "hidden" : "visible";
                var w = this._els.dhx_multi_day[1];
                w.style.height = t;
                w.style.visibility = e[0] == -1 ? "hidden" : "visible";
                w.className = e[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small";
                this._dy_shift = (e[0] + 1) * d;
                e[0] = 0;
                if (s != q) f.style.top = parseInt(f.style.top) + 2 + "px", u.style.overflowY = "auto", u.style.width = parseInt(u.style.width) - 2 + "px", w.style.position = "fixed", w.style.top = "", w.style.left = ""
            }
        }
        return b
    };
    a._get_event_sday = function (b) {
        return Math.floor((b.start_date.valueOf() - this._min_date.valueOf()) / 864E5)
    };
    a._get_event_mapped_end_date = function (b) {
        var a = b.end_date;
        if (this.config.separate_short_events) {
            var d = (b.end_date - b.start_date) / 6E4;
            d < this._min_mapped_duration && (a = this.date.add(a, this._min_mapped_duration - d, "minute"))
        }
        return a
    };
    a._pre_render_events_line = function (b, a) {
        b.sort(function (b, a) {
            return b.start_date.valueOf() == a.start_date.valueOf() ? b.id > a.id ? 1 : -1 : b.start_date > a.start_date ? 1 : -1
        });
        var d = [],
            h = [];
        this._min_mapped_duration = Math.ceil(this.xy.min_event_height * 60 / this.config.hour_size_px);
        for (var e = 0; e < b.length; e++) {
            var f = b[e],
                j = f.start_date,
                i = f.end_date,
                n = j.getHours(),
                k = i.getHours();
            f._sday = this._get_event_sday(f);
            if (this._ignores[f._sday]) b.splice(e, 1), e--;
            else {
                d[f._sday] || (d[f._sday] = []);
                if (!a) {
                    f._inner = !1;
                    for (var l = d[f._sday]; l.length;) {
                        var m = l[l.length - 1],
                            o = this._get_event_mapped_end_date(m);
                        if (o.valueOf() <= f.start_date.valueOf()) l.splice(l.length - 1, 1);
                        else break
                    }
                    for (var r = !1, p = 0; p < l.length; p++) if (m = l[p], o = this._get_event_mapped_end_date(m), o.valueOf() <= f.start_date.valueOf()) {
                        r = !0;
                        f._sorder = m._sorder;
                        l.splice(p, 1);
                        f._inner = !0;
                        break
                    }
                    if (l.length) l[l.length - 1]._inner = !0;
                    if (!r) if (l.length) if (l.length <= l[l.length - 1]._sorder) {
                        if (l[l.length - 1]._sorder) for (p = 0; p < l.length; p++) {
                            for (var q = !1, s = 0; s < l.length; s++) if (l[s]._sorder == p) {
                                q = !0;
                                break
                            }
                            if (!q) {
                                f._sorder = p;
                                break
                            }
                        } else f._sorder = 0;
                        f._inner = !0
                    } else {
                        q = l[0]._sorder;
                        for (p = 1; p < l.length; p++) if (l[p]._sorder > q) q = l[p]._sorder;
                        f._sorder = q + 1;
                        f._inner = !1
                    } else f._sorder = 0;
                    l.push(f);
                    l.length > (l.max_count || 0) ? (l.max_count = l.length, f._count = l.length) : f._count = f._count ? f._count : 1
                }
                if (n < this.config.first_hour || k >= this.config.last_hour) if (h.push(f), b[e] = f = this._copy_event(f), n < this.config.first_hour && (f.start_date.setHours(this.config.first_hour), f.start_date.setMinutes(0)), k >= this.config.last_hour && (f.end_date.setMinutes(0), f.end_date.setHours(this.config.last_hour)), f.start_date > f.end_date || n == this.config.last_hour) b.splice(e, 1), e--
            }
        }
        if (!a) {
            for (e = 0; e < b.length; e++) b[e]._count = d[b[e]._sday].max_count;
            for (e = 0; e < h.length; e++) h[e]._count = d[h[e]._sday].max_count
        }
        return b
    };
    a._time_order = function (b) {
        b.sort(function (b, a) {
            return b.start_date.valueOf() == a.start_date.valueOf() ? b._timed && !a._timed ? 1 : !b._timed && a._timed ? -1 : b.id > a.id ? 1 : -1 : b.start_date > a.start_date ? 1 : -1
        })
    };
    a._pre_render_events_table = function (b, a) {
        this._time_order(b);
        for (var d = [], e = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ], g = this._colsS.heights, f, j = this._cols.length, i = {}, n = 0; n < b.length; n++) {
            var k = b[n],
                l = k.id;
            i[l] || (i[l] = {
                first_chunk: !0,
                last_chunk: !0
            });
            var m = i[l],
                o = f || k.start_date,
                r = k.end_date;
            if (o < this._min_date) m.first_chunk = !1, o = this._min_date;
            if (r > this._max_date) m.last_chunk = !1, r = this._max_date;
            var p = this.locate_holder_day(o, !1, k);
            k._sday = p % j;
            if (!this._ignores[k._sday] || !k._timed) {
                var q = this.locate_holder_day(r, !0, k) || j;
                k._eday = q % j || j;
                k._length = q - p;
                k._sweek = Math.floor((this._correct_shift(o.valueOf(), 1) - this._min_date.valueOf()) / (864E5 * j));
                var s = e[k._sweek],
                    t;
                for (t = 0; t < s.length; t++) if (s[t]._eday <= k._sday) break;
                if (!k._sorder || !a) k._sorder = t;
                if (k._sday + k._length <= j) f = null, d.push(k), s[t] = k, g[k._sweek] = s.length - 1, k._first_chunk = m.first_chunk, k._last_chunk = m.last_chunk;
                else {
                    var u = this._copy_event(k);
                    u.id = k.id;
                    u._length = j - k._sday;
                    u._eday = j;
                    u._sday = k._sday;
                    u._sweek = k._sweek;
                    u._sorder = k._sorder;
                    u.end_date = this.date.add(o, u._length, "day");
                    if (u._first_chunk = m.first_chunk) m.first_chunk = !1;
                    d.push(u);
                    s[t] = u;
                    f = u.end_date;
                    g[k._sweek] = s.length - 1;
                    n--
                }
            }
        }
        return d
    };
    a._copy_dummy = function () {
        var b = new Date(this.start_date),
            a = new Date(this.end_date);
        this.start_date = b;
        this.end_date = a
    };
    a._copy_event = function (b) {
        this._copy_dummy.prototype = b;
        return new this._copy_dummy
    };
    a._rendered = [];
    a.clear_view = function () {
        for (var b = 0; b < this._rendered.length; b++) {
            var a = this._rendered[b];
            a.parentNode && a.parentNode.removeChild(a)
        }
        this._rendered = []
    };
    a.updateEvent = function (b) {
        var a = this.getEvent(b);
        this.clear_event(b);
        if (a && this.is_visible_events(a) && this.filter_event(b, a) && (this._table_view || this.config.multi_day || a._timed)) this.config.update_render ? this.render_view_data() : this.render_view_data([a], !0)
    };
    a.clear_event = function (b) {
        this.for_rendered(b, function (b, d) {
            b.parentNode && b.parentNode.removeChild(b);
            a._rendered.splice(d, 1)
        })
    };
    a.render_event = function (b) {
        var c = a.xy.menu_width,
            d = this.config.use_select_menu_space ? 0 : c;
        if (!(b._sday < 0)) {
            var e = a.locate_holder(b._sday);
            if (e) {
                var g = b.start_date.getHours() * 60 + b.start_date.getMinutes(),
                    f = b.end_date.getHours() * 60 + b.end_date.getMinutes() || a.config.last_hour * 60,
                    j = b._count || 1,
                    i = b._sorder || 0,
                    n = Math.round((g * 6E4 - this.config.first_hour * 36E5) * this.config.hour_size_px / 36E5) % (this.config.hour_size_px * 24),
                    k = Math.max(a.xy.min_event_height, (f - g) * this.config.hour_size_px / 60),
                    l = Math.floor((e.clientWidth - d) / j),
                    m = i * l + 1;
                b._inner || (l *= j - i);
                if (this.config.cascade_event_display) var o = this.config.cascade_event_count,
                    r = this.config.cascade_event_margin,
                    m = i % o * r,
                    p = b._inner ? (j - i - 1) % o * r / 2 : 0,
                    l = Math.floor(e.clientWidth - d - m - p);
                var q = this._render_v_bar(b.id, d + m, n, l, k, b._text_style, a.templates.event_header(b.start_date, b.end_date, b), a.templates.event_text(b.start_date, b.end_date, b));
                this._rendered.push(q);
                e.appendChild(q);
                m = m + parseInt(e.style.left, 10) + d;
                if (this._edit_id == b.id) {
                    q.style.zIndex = 1;
                    l = Math.max(l - 4, a.xy.editor_width);
                    q = document.createElement("DIV");
                    q.setAttribute("event_id", b.id);
                    this.set_xy(q, l, k - 20, m, n + 14);
                    q.className = "dhx_cal_editor";
                    var s = document.createElement("DIV");
                    this.set_xy(s, l - 6, k - 26);
                    s.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;";
                    q.appendChild(s);
                    this._els.dhx_cal_data[0].appendChild(q);
                    this._rendered.push(q);
                    s.innerHTML = "<textarea class='dhx_cal_editor'>" + b.text + "</textarea>";
                    if (this._quirks7) s.firstChild.style.height = k - 12 + "px";
                    this._editor = s.firstChild;
                    this._editor.onkeydown = function (b) {
                        if ((b || event).shiftKey) return !0;
                        var c = (b || event).keyCode;
                        c == a.keys.edit_save && a.editStop(!0);
                        c == a.keys.edit_cancel && a.editStop(!1)
                    };
                    this._editor.onselectstart = function (b) {
                        return (b || event).cancelBubble = !0
                    };
                    a._focus(s.firstChild, !0);
                    this._els.dhx_cal_data[0].scrollLeft = 0
                }
                if (this.xy.menu_width !== 0 && this._select_id == b.id) {
                    if (this.config.cascade_event_display && this._drag_mode) q.style.zIndex = 1;
                    for (var t = this.config["icons_" + (this._edit_id == b.id ? "edit" : "select")], u = "", w = b.color ? "background-color: " + b.color + ";" : "", v = b.textColor ? "color: " + b.textColor + ";" : "", x = 0; x < t.length; x++) u += "<div class='dhx_menu_icon " + t[x] + "' style='" + w + "" + v + "' title='" + this.locale.labels[t[x]] + "'></div>";
                    var z = this._render_v_bar(b.id, m - c + 1, n, c, t.length * 20 + 26 - 2, "", "<div style='" + w + "" + v + "' class='dhx_menu_head'></div>", u, !0);
                    z.style.left = m - c + 1;
                    this._els.dhx_cal_data[0].appendChild(z);
                    this._rendered.push(z)
                }
            }
        }
    };
    a._render_v_bar = function (b, c, d, e, g, f, j, i, n) {
        var k = document.createElement("DIV"),
            l = this.getEvent(b),
            m = n ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event",
            o = a.templates.event_class(l.start_date, l.end_date, l);
        o && (m = m + " " + o);
        var r = l.color ? "background:" + l.color + ";" : "",
            p = l.textColor ? "color:" + l.textColor + ";" : "",
            q = '<div event_id="' + b + '" class="' + m + '" style="position:absolute; top:' + d + "px; left:" + c + "px; width:" + (e - 4) + "px; height:" + g + "px;" + (f || "") + '"></div>';
        k.innerHTML = q;
        var s = k.cloneNode(!0).firstChild;
        if (n || !a.renderEvent(s, l)) {
            var s = k.firstChild,
                t = '<div class="dhx_event_move dhx_header" style=" width:' + (e - 6) + "px;" + r + '" >&nbsp;</div>';
            t += '<div class="dhx_event_move dhx_title" style="' + r + "" + p + '">' + j + "</div>";
            t += '<div class="dhx_body" style=" width:' + (e - (this._quirks ? 4 : 14)) + "px; height:" + (g - (this._quirks ? 20 : 30) + 1) + "px;" + r + "" + p + '">' + i + "</div>";
            var u = "dhx_event_resize dhx_footer";
            n && (u = "dhx_resize_denied " + u);
            t += '<div class="' + u + '" style=" width:' + (e - 8) + "px;" + (n ? " margin-top:-1px;" : "") + "" + r + "" + p + '" ></div>';
            s.innerHTML = t
        }
        return s
    };
    a.renderEvent = function () {
        return !1
    };
    a.locate_holder = function (b) {
        return this._mode == "day" ? this._els.dhx_cal_data[0].firstChild : this._els.dhx_cal_data[0].childNodes[b]
    };
    a.locate_holder_day = function (b, a) {
        var d = Math.floor((this._correct_shift(b, 1) - this._min_date) / 864E5);
        a && this.date.time_part(b) && d++;
        return d
    };
    a._get_dnd_order = function (b, a, d) {
        if (!this._drag_event) return b;
        this._drag_event._orig_sorder ? b = this._drag_event._orig_sorder : this._drag_event._orig_sorder = b;
        for (var e = a * b; e + a > d;) b--, e -= a;
        return b
    };
    a._get_event_bar_pos = function (b) {
        var c = this._colsS[b._sday],
            d = this._colsS[b._eday];
        d == c && (d = this._colsS[b._eday + 1]);
        var e = this.xy.bar_height,
            g = b._sorder;
        if (b.id == this._drag_id) var f = this._colsS.heights[b._sweek + 1] - this._colsS.heights[b._sweek] - 22,
            g = a._get_dnd_order(g, e, f);
        var j = g * e,
            i = this._colsS.heights[b._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + j;
        return {
            x: c,
            x2: d,
            y: i
        }
    };
    a.render_event_bar = function (b) {
        var c = this._rendered_location,
            d = this._get_event_bar_pos(b),
            e = d.y,
            g = d.x,
            f = d.x2;
        if (f) {
            var j = document.createElement("DIV"),
                i = "dhx_cal_event_clear";
            b._timed || (i = "dhx_cal_event_line", b.hasOwnProperty("_first_chunk") && b._first_chunk && (i += " dhx_cal_event_line_start"), b.hasOwnProperty("_last_chunk") && b._last_chunk && (i += " dhx_cal_event_line_end"));
            var n = a.templates.event_class(b.start_date, b.end_date, b);
            n && (i = i + " " + n);
            var k = b.color ? "background:" + b.color + ";" : "",
                l = b.textColor ? "color:" + b.textColor + ";" : "",
                m = '<div event_id="' + b.id + '" class="' + i + '" style="position:absolute; top:' + e + "px; left:" + g + "px; width:" + (f - g - 15) + "px;" + l + "" + k + "" + (b._text_style || "") + '">',
                b = a.getEvent(b.id);
            b._timed && (m += a.templates.event_bar_date(b.start_date, b.end_date, b));
            m += a.templates.event_bar_text(b.start_date, b.end_date, b) + "</div>";
            m += "</div>";
            j.innerHTML = m;
            this._rendered.push(j.firstChild);
            c.appendChild(j.firstChild)
        }
    };
    a._locate_event = function (b) {
        for (var a = null; b && !a && b.getAttribute;) a = b.getAttribute("event_id"), b = b.parentNode;
        return a
    };
    a.edit = function (b) {
        if (this._edit_id != b) this.editStop(!1, b), this._edit_id = b, this.updateEvent(b)
    };
    a.editStop = function (b, a) {
        if (!(a && this._edit_id == a)) {
            var d = this.getEvent(this._edit_id);
            if (d) {
                if (b) d.text = this._editor.value;
                this._editor = this._edit_id = null;
                this.updateEvent(d.id);
                this._edit_stop_event(d, b)
            }
        }
    };
    a._edit_stop_event = function (b, a) {
        this._new_event ? (a ? this.callEvent("onEventAdded", [b.id, b]) : b && this.deleteEvent(b.id, !0), this._new_event = null) : a && this.callEvent("onEventChanged", [b.id, b])
    };
    a.getEvents = function (b, a) {
        var d = [],
            e;
        for (e in this._events) {
            var g = this._events[e];
            g && (!b && !a || g.start_date < a && g.end_date > b) && d.push(g)
        }
        return d
    };
    a.getRenderedEvent = function (b) {
        if (b) {
            for (var c = a._rendered, d = 0; d < c.length; d++) {
                var e = c[d];
                if (e.getAttribute("event_id") == b) return e
            }
            return null
        }
    };
    a.showEvent = function (b, c) {
        var d = typeof b == "number" || typeof b == "string" ? a.getEvent(b) : b,
            c = c || a._mode;
        if (d && (!this.checkEvent("onBeforeEventDisplay") || this.callEvent("onBeforeEventDisplay", [d, c]))) {
            var e = a.config.scroll_hour;
            a.config.scroll_hour = d.start_date.getHours();
            var g = a.config.preserve_scroll;
            a.config.preserve_scroll = !1;
            var f = d.color,
                j = d.textColor;
            if (a.config.highlight_displayed_event) d.color = a.config.displayed_event_color, d.textColor = a.config.displayed_event_text_color;
            a.setCurrentView(new Date(d.start_date), c);
            d.color = f;
            d.textColor = j;
            a.config.scroll_hour = e;
            a.config.preserve_scroll = g;
            if (a.matrix && a.matrix[c]) a._els.dhx_cal_data[0].scrollTop = getAbsoluteTop(a.getRenderedEvent(d.id)) - getAbsoluteTop(a._els.dhx_cal_data[0]) - 20;
            a.callEvent("onAfterEventDisplay", [d, c])
        }
    };
    a._loaded = {};
    a._load = function (b, c) {
        if (b = b || this._load_url) {
            b += (b.indexOf("?") == -1 ? "?" : "&") + "timeshift=" + (new Date).getTimezoneOffset();
            this.config.prevent_cache && (b += "&uid=" + this.uid());
            var d, c = c || this._date;
            if (this._load_mode) {
                for (var e = this.templates.load_format, c = this.date[this._load_mode + "_start"](new Date(c.valueOf())); c > this._min_date;) c = this.date.add(c, -1, this._load_mode);
                d = c;
                for (var g = !0; d < this._max_date;) d = this.date.add(d, 1, this._load_mode), this._loaded[e(c)] && g ? c = this.date.add(c, 1, this._load_mode) : g = !1;
                var f = d;
                do d = f, f = this.date.add(d, -1, this._load_mode);
                while (f > c && this._loaded[e(f)]);
                if (d <= c) return !1;
                for (dhtmlxAjax.get(b + "&from=" + e(c) + "&to=" + e(d), function (b) {
                    a.on_load(b)
                }); c < d;) this._loaded[e(c)] = !0, c = this.date.add(c, 1, this._load_mode)
            } else dhtmlxAjax.get(b, function (b) {
                a.on_load(b)
            });
            this.callEvent("onXLS", []);
            return !0
        }
    };
    a.on_load = function (b) {
        var c;
        c = this._process && this._process != "xml" ? this[this._process].parse(b.xmlDoc.responseText) : this._magic_parser(b);
        a._process_loading(c);
        this.callEvent("onXLE", [])
    };
    a._process_loading = function (b) {
        this._not_render = this._loading = !0;
        for (var a = 0; a < b.length; a++) this.callEvent("onEventLoading", [b[a]]) && this.addEvent(b[a]);
        this._not_render = !1;
        this._render_wait && this.render_view_data();
        this._loading = !1;
        this._after_call && this._after_call();
        this._after_call = null
    };
    a._init_event = function (b) {
        b.text = b.text || b._tagvalue || "";
        b.start_date = a._init_date(b.start_date);
        b.end_date = a._init_date(b.end_date)
    };
    a._init_date = function (b) {
        return !b ? null : typeof b == "string" ? a.templates.xml_date(b) : new Date(b)
    };
    a.json = {};
    a.json.parse = function (b) {
        if (typeof b == "string") a._temp = eval("(" + b + ")"), b = a._temp ? a._temp.data || a._temp.d || a._temp : [];
        if (b.dhx_security) dhtmlx.security_key = b.dhx_security;
        var c = a._temp && a._temp.collections ? a._temp.collections : {},
            d = !1,
            e;
        for (e in c) if (c.hasOwnProperty(e)) {
            var d = !0,
                g = c[e],
                f = a.serverList[e];
            if (f) {
                f.splice(0, f.length);
                for (var j = 0; j < g.length; j++) {
                    var i = g[j],
                        n = {
                            key: i.value,
                            label: i.label
                        },
                        k;
                    for (k in i) if (i.hasOwnProperty(k) && !(k == "value" || k == "label")) n[k] = i[k];
                    f.push(n)
                }
            }
        }
        d && a.callEvent("onOptionsLoad", []);
        for (var l = [], m = 0; m < b.length; m++) {
            var o = b[m];
            a._init_event(o);
            l.push(o)
        }
        return l
    };
    a.parse = function (b, a) {
        this._process = a;
        this.on_load({
            xmlDoc: {
                responseText: b
            }
        })
    };
    a.load = function (b, a, d) {
        if (typeof a == "string") this._process = a, a = d;
        this._load_url = b;
        this._after_call = a;
        this._load(b, this._date)
    };
    a.setLoadMode = function (b) {
        b == "all" && (b = "");
        this._load_mode = b
    };
    a.serverList = function (b, a) {
        return a ? this.serverList[b] = a.slice(0) : this.serverList[b] = this.serverList[b] || []
    };
    a._userdata = {};
    a._magic_parser = function (b) {
        var c;
        if (!b.getXMLTopNode) {
            var d = b.xmlDoc.responseText,
                b = new dtmlXMLLoaderObject(function () {});
            b.loadXMLString(d)
        }
        c = b.getXMLTopNode("data");
        if (c.tagName != "data") return [];
        var e = c.getAttribute("dhx_security");
        if (e) dhtmlx.security_key = e;
        for (var g = b.doXPath("//coll_options"), f = 0; f < g.length; f++) {
            var j = g[f].getAttribute("for"),
                i = this.serverList[j];
            if (i) {
                i.splice(0, i.length);
                for (var n = b.doXPath(".//item", g[f]), k = 0; k < n.length; k++) {
                    for (var l = n[k], m = l.attributes, o = {
                        key: n[k].getAttribute("value"),
                        label: n[k].getAttribute("label")
                    }, r = 0; r < m.length; r++) {
                        var p = m[r];
                        if (!(p.nodeName == "value" || p.nodeName == "label")) o[p.nodeName] = p.nodeValue
                    }
                    i.push(o)
                }
            }
        }
        g.length && a.callEvent("onOptionsLoad", []);
        for (var q = b.doXPath("//userdata"), f = 0; f < q.length; f++) {
            var s = this._xmlNodeToJSON(q[f]);
            this._userdata[s.name] = s.text
        }
        var t = [];
        c = b.doXPath("//event");
        for (f = 0; f < c.length; f++) {
            var u = t[f] = this._xmlNodeToJSON(c[f]);
            a._init_event(u)
        }
        return t
    };
    a._xmlNodeToJSON = function (b) {
        for (var a = {}, d = 0; d < b.attributes.length; d++) a[b.attributes[d].name] = b.attributes[d].value;
        for (d = 0; d < b.childNodes.length; d++) {
            var e = b.childNodes[d];
            e.nodeType == 1 && (a[e.tagName] = e.firstChild ? e.firstChild.nodeValue : "")
        }
        if (!a.text) a.text = b.firstChild ? b.firstChild.nodeValue : "";
        return a
    };
    a.attachEvent("onXLS", function () {
        if (this.config.show_loading === !0) {
            var b;
            b = this.config.show_loading = document.createElement("DIV");
            b.className = "dhx_loading";
            b.style.left = Math.round((this._x - 128) / 2) + "px";
            b.style.top = Math.round((this._y - 15) / 2) + "px";
            this._obj.appendChild(b)
        }
    });
    a.attachEvent("onXLE", function () {
        var b = this.config.show_loading;
        if (b && typeof b == "object") this._obj.removeChild(b), this.config.show_loading = !0
    });
    a.ical = {
        parse: function (b) {
            var a = b.match(RegExp(this.c_start + "[^\u000c]*" + this.c_end, ""));
            if (a.length) {
                a[0] = a[0].replace(/[\r\n]+(?=[a-z \t])/g, " ");
                a[0] = a[0].replace(/\;[^:\r\n]*:/g, ":");
                for (var d = [], e, g = RegExp("(?:" + this.e_start + ")([^\u000c]*?)(?:" + this.e_end + ")", "g"); e = g.exec(a);) {
                    for (var f = {}, j, i = /[^\r\n]+[\r\n]+/g; j = i.exec(e[1]);) this.parse_param(j.toString(), f);
                    if (f.uid && !f.id) f.id = f.uid;
                    d.push(f)
                }
                return d
            }
        },
        parse_param: function (b, a) {
            var d = b.indexOf(":");
            if (d != -1) {
                var e = b.substr(0, d).toLowerCase(),
                    g = b.substr(d + 1).replace(/\\\,/g, ",").replace(/[\r\n]+$/, "");
                e == "summary" ? e = "text" : e == "dtstart" ? (e = "start_date", g = this.parse_date(g, 0, 0)) : e == "dtend" && (e = "end_date", g = this.parse_date(g, 0, 0));
                a[e] = g
            }
        },
        parse_date: function (b, c, d) {
            var e = b.split("T");
            e[1] && (c = e[1].substr(0, 2), d = e[1].substr(2, 2));
            var g = e[0].substr(0, 4),
                f = parseInt(e[0].substr(4, 2), 10) - 1,
                j = e[0].substr(6, 2);
            return a.config.server_utc && !e[1] ? new Date(Date.UTC(g, f, j, c, d)) : new Date(g, f, j, c, d)
        },
        c_start: "BEGIN:VCALENDAR",
        e_start: "BEGIN:VEVENT",
        e_end: "END:VEVENT",
        c_end: "END:VCALENDAR"
    };
    a._lightbox_controls = {};
    a.formSection = function (b) {
        for (var c = this.config.lightbox.sections, d = 0; d < c.length; d++) if (c[d].name == b) break;
        var e = c[d];
        a._lightbox || a.getLightbox();
        var g = document.getElementById(e.id),
            f = g.nextSibling,
            j = {
                section: e,
                header: g,
                node: f,
                getValue: function (b) {
                    return a.form_blocks[e.type].get_value(f, b || {}, e)
                },
                setValue: function (b, c) {
                    return a.form_blocks[e.type].set_value(f, b, c || {}, e)
                }
            },
            i = a._lightbox_controls["get_" + e.type + "_control"];
        return i ? i(j) : j
    };
    a._lightbox_controls.get_template_control = function (b) {
        b.control = b.node;
        return b
    };
    a._lightbox_controls.get_select_control = function (b) {
        b.control = b.node.getElementsByTagName("select")[0];
        return b
    };
    a._lightbox_controls.get_textarea_control = function (b) {
        b.control = b.node.getElementsByTagName("textarea")[0];
        return b
    };
    a._lightbox_controls.get_time_control = function (b) {
        b.control = b.node.getElementsByTagName("select");
        return b
    };
    a.form_blocks = {
        template: {
            render: function (b) {
                var a = (b.height || "30") + "px";
                return "<div class='dhx_cal_ltext dhx_cal_template' style='height:" + a + ";'></div>"
            },
            set_value: function (b, a) {
                b.innerHTML = a || ""
            },
            get_value: function (b) {
                return b.innerHTML || ""
            },
            focus: function () {}
        },
        textarea: {
            render: function (b) {
                var a = (b.height || "130") + "px";
                return "<div class='dhx_cal_ltext' style='height:" + a + ";'><textarea></textarea></div>"
            },
            set_value: function (b, a) {
                b.firstChild.value = a || ""
            },
            get_value: function (a) {
                return a.firstChild.value
            },
            focus: function (b) {
                var c = b.firstChild;
                a._focus(c, !0)
            }
        },
        select: {
            render: function (a) {
                for (var c = (a.height || "23") + "px", d = "<div class='dhx_cal_ltext' style='height:" + c + ";'><select style='width:100%;'>", e = 0; e < a.options.length; e++) d += "<option value='" + a.options[e].key + "'>" + a.options[e].label + "</option>";
                d += "</select></div>";
                return d
            },
            set_value: function (a, c, d, e) {
                var g = a.firstChild;
                if (!g._dhx_onchange && e.onchange) g.onchange = e.onchange, g._dhx_onchange = !0;
                if (typeof c == "undefined") c = (g.options[0] || {}).value;
                g.value = c || ""
            },
            get_value: function (a) {
                return a.firstChild.value
            },
            focus: function (b) {
                var c = b.firstChild;
                a._focus(c, !0)
            }
        },
        time: {
            render: function (b) {
                if (!b.time_format) b.time_format = ["%H:%i", "%d", "%m", "%Y"];
                b._time_format_order = {};
                var c = b.time_format,
                    d = a.config,
                    e = this.date.date_part(a._currentDate()),
                    g = 1440,
                    f = 0;
                a.config.limit_time_select && (g = 60 * d.last_hour + 1, f = 60 * d.first_hour, e.setHours(d.first_hour));
                for (var j = "", i = 0; i < c.length; i++) {
                    var n = c[i];
                    i > 0 && (j += " ");
                    switch (n) {
                    case "%Y":
                        b._time_format_order[3] = i;
                        j += "<select>";
                        for (var k = e.getFullYear() - 5, l = 0; l < 10; l++) j += "<option value='" + (k + l) + "'>" + (k + l) + "</option>";
                        j += "</select> ";
                        break;
                    case "%m":
                        b._time_format_order[2] = i;
                        j += "<select>";
                        for (l = 0; l < 12; l++) j += "<option value='" + l + "'>" + this.locale.date.month_full[l] + "</option>";
                        j += "</select>";
                        break;
                    case "%d":
                        b._time_format_order[1] = i;
                        j += "<select>";
                        for (l = 1; l < 32; l++) j += "<option value='" + l + "'>" + l + "</option>";
                        j += "</select>";
                        break;
                    case "%H:%i":
                        b._time_format_order[0] = i;
                        j += "<select>";
                        var l = f,
                            m = e.getDate();
                        for (b._time_values = []; l < g;) {
                            var o = this.templates.time_picker(e);
                            j += "<option value='" + l + "'>" + o + "</option>";
                            b._time_values.push(l);
                            e.setTime(e.valueOf() + this.config.time_step * 6E4);
                            var r = e.getDate() != m ? 1 : 0,
                                l = r * 1440 + e.getHours() * 60 + e.getMinutes()
                        }
                        j += "</select>"
                    }
                }
                return "<div style='height:30px;padding-top:0px;font-size:inherit;' class='dhx_section_time'>" + j + "<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>" + j + "</div>"
            },
            set_value: function (b, c, d, e) {
                function g(a, b, c) {
                    for (var d = e._time_values, f = c.getHours() * 60 + c.getMinutes(), g = f, j = !1, k = 0; k < d.length; k++) {
                        var l = d[k];
                        if (l === f) {
                            j = !0;
                            break
                        }
                        l < f && (g = l)
                    }
                    a[b + i[0]].value = j ? f : g;
                    if (!j && !g) a[b + i[0]].selectedIndex = -1;
                    a[b + i[1]].value = c.getDate();
                    a[b + i[2]].value = c.getMonth();
                    a[b + i[3]].value = c.getFullYear()
                }
                var f = a.config,
                    j = b.getElementsByTagName("select"),
                    i = e._time_format_order;
                if (f.full_day) {
                    if (!b._full_day) {
                        var n = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + a.locale.labels.full_day + "&nbsp;</label></input>";
                        a.config.wide_form || (n = b.previousSibling.innerHTML + n);
                        b.previousSibling.innerHTML = n;
                        b._full_day = !0
                    }
                    var k = b.previousSibling.getElementsByTagName("input")[0];
                    k.checked = a.date.time_part(d.start_date) === 0 && a.date.time_part(d.end_date) === 0;
                    j[i[0]].disabled = k.checked;
                    j[i[0] + j.length / 2].disabled = k.checked;
                    k.onclick = function () {
                        if (k.checked) {
                            var c = {};
                            a.form_blocks.time.get_value(b, c, e);
                            var f = a.date.date_part(c.start_date),
                                l = a.date.date_part(c.end_date);
                            if (+l == +f || +l >= +f && (d.end_date.getHours() != 0 || d.end_date.getMinutes() != 0)) l = a.date.add(l, 1, "day")
                        }
                        j[i[0]].disabled = k.checked;
                        j[i[0] + j.length / 2].disabled = k.checked;
                        g(j, 0, f || d.start_date);
                        g(j, 4, l || d.end_date)
                    }
                }
                if (f.auto_end_date && f.event_duration) for (var l = function () {
                        var b = new Date(j[i[3]].value, j[i[2]].value, j[i[1]].value, 0, j[i[0]].value),
                            c = new Date(b.getTime() + a.config.event_duration * 6E4);
                        g(j, 4, c)
                    }, m = 0; m < 4; m++) j[m].onchange = l;
                g(j, 0, d.start_date);
                g(j, 4, d.end_date)
            },
            get_value: function (b, c, d) {
                s = b.getElementsByTagName("select");
                var e = d._time_format_order;
                c.start_date = new Date(s[e[3]].value, s[e[2]].value, s[e[1]].value, 0, s[e[0]].value);
                c.end_date = new Date(s[e[3] + 4].value, s[e[2] + 4].value, s[e[1] + 4].value, 0, s[e[0] + 4].value);
                if (c.end_date <= c.start_date) c.end_date = a.date.add(c.start_date, a.config.time_step, "minute");
                return {
                    start_date: new Date(c.start_date),
                    end_date: new Date(c.end_date)
                }
            },
            focus: function (b) {
                a._focus(b.getElementsByTagName("select")[0])
            }
        }
    };
    a.showCover = function (a) {
        if (a) {
            a.style.display = "block";
            var c = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
                d = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft,
                e = window.innerHeight || document.documentElement.clientHeight;
            a.style.top = c ? Math.round(c + Math.max((e - a.offsetHeight) / 2, 0)) + "px" : Math.round(Math.max((e - a.offsetHeight) / 2, 0) + 9) + "px";
            a.style.left = document.documentElement.scrollWidth > document.body.offsetWidth ? Math.round(d + (document.body.offsetWidth - a.offsetWidth) / 2) + "px" : Math.round((document.body.offsetWidth - a.offsetWidth) / 2) + "px"
        }
        this.show_cover()
    };
    a.showLightbox = function (a) {
        if (a) if (this.callEvent("onBeforeLightbox", [a])) {
            var c = this.getLightbox();
            this.showCover(c);
            this._fill_lightbox(a, c);
            this.callEvent("onLightbox", [a])
        } else if (this._new_event) this._new_event = null
    };
    a._fill_lightbox = function (b, c) {
        var d = this.getEvent(b),
            e = c.getElementsByTagName("span");
        a.templates.lightbox_header ? (e[1].innerHTML = "", e[2].innerHTML = a.templates.lightbox_header(d.start_date, d.end_date, d)) : (e[1].innerHTML = this.templates.event_header(d.start_date, d.end_date, d), e[2].innerHTML = (this.templates.event_bar_text(d.start_date, d.end_date, d) || "").substr(0, 70));
        for (var g = this.config.lightbox.sections, f = 0; f < g.length; f++) {
            var j = g[f],
                i = document.getElementById(j.id).nextSibling,
                n = this.form_blocks[j.type],
                k = d[j.map_to] !== void 0 ? d[j.map_to] : j.default_value;
            n.set_value.call(this, i, k, d, j);
            g[f].focus && n.focus.call(this, i)
        }
        a._lightbox_id = b
    };
    a._lightbox_out = function (a) {
        for (var c = this.config.lightbox.sections, d = 0; d < c.length; d++) {
            var e = document.getElementById(c[d].id),
                e = e ? e.nextSibling : e,
                g = this.form_blocks[c[d].type],
                f = g.get_value.call(this, e, a, c[d]);
            c[d].map_to != "auto" && (a[c[d].map_to] = f)
        }
        return a
    };
    a._empty_lightbox = function (b) {
        var c = a._lightbox_id,
            d = this.getEvent(c),
            e = this.getLightbox();
        this._lame_copy(d, b);
        this.setEvent(d.id, d);
        this._edit_stop_event(d, !0);
        this.render_view_data()
    };
    a.hide_lightbox = function () {
        this.hideCover(this.getLightbox());
        this._lightbox_id = null;
        this.callEvent("onAfterLightbox", [])
    };
    a.hideCover = function (a) {
        if (a) a.style.display = "none";
        this.hide_cover()
    };
    a.hide_cover = function () {
        this._cover && this._cover.parentNode.removeChild(this._cover);
        this._cover = null
    };
    a.show_cover = function () {
        this._cover = document.createElement("DIV");
        this._cover.className = "dhx_cal_cover";
        var a = document.height !== void 0 ? document.height : document.body.offsetHeight,
            c = document.documentElement ? document.documentElement.scrollHeight : 0;
        this._cover.style.height = Math.max(a, c) + "px";
        document.body.appendChild(this._cover)
    };
    a.save_lightbox = function () {
        var a = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
        if (!this.checkEvent("onEventSave") || this.callEvent("onEventSave", [this._lightbox_id, a, this._new_event])) this._empty_lightbox(a), this.hide_lightbox()
    };
    a.startLightbox = function (a, c) {
        this._lightbox_id = a;
        this._custom_lightbox = !0;
        this._temp_lightbox = this._lightbox;
        this._lightbox = c;
        this.showCover(c)
    };
    a.endLightbox = function (b, c) {
        this._edit_stop_event(a.getEvent(this._lightbox_id), b);
        b && a.render_view_data();
        this.hideCover(c);
        if (this._custom_lightbox) this._lightbox = this._temp_lightbox, this._custom_lightbox = !1;
        this._temp_lightbox = this._lightbox_id = null
    };
    a.resetLightbox = function () {
        a._lightbox && !a._custom_lightbox && a._lightbox.parentNode.removeChild(a._lightbox);
        a._lightbox = null
    };
    a.cancel_lightbox = function () {
        this.callEvent("onEventCancel", [this._lightbox_id, this._new_event]);
        this.endLightbox(!1);
        this.hide_lightbox()
    };
    a._init_lightbox_events = function () {
        this.getLightbox().onclick = function (b) {
            var c = b ? b.target : event.srcElement;
            if (!c.className) c = c.previousSibling;
            if (c && c.className) switch (c.className) {
            case "dhx_save_btn":
                a.save_lightbox();
                break;
            case "dhx_delete_btn":
                var d = a.locale.labels.confirm_deleting;
                a._dhtmlx_confirm(d, a.locale.labels.title_confirm_deleting, function () {
                    a.deleteEvent(a._lightbox_id);
                    a._new_event = null;
                    a.hide_lightbox()
                });
                break;
            case "dhx_cancel_btn":
                a.cancel_lightbox();
                break;
            default:
                if (c.getAttribute("dhx_button")) a.callEvent("onLightboxButton", [c.className, c, b]);
                else {
                    var e, g, f;
                    if (c.className.indexOf("dhx_custom_button") != -1) c.className.indexOf("dhx_custom_button_") != -1 ? (e = c.parentNode.getAttribute("index"), f = c.parentNode.parentNode) : (e = c.getAttribute("index"), f = c.parentNode, c = c.firstChild);
                    e && (g = a.form_blocks[a.config.lightbox.sections[e].type], g.button_click(e, c, f, f.nextSibling))
                }
            }
        };
        this.getLightbox().onkeydown = function (b) {
            switch ((b || event).keyCode) {
            case a.keys.edit_save:
                if ((b || event).shiftKey) break;
                a.save_lightbox();
                break;
            case a.keys.edit_cancel:
                a.cancel_lightbox()
            }
        }
    };
    a.setLightboxSize = function () {
        var b = this._lightbox;
        if (b) {
            var c = b.childNodes[1];
            c.style.height = "0px";
            c.style.height = c.scrollHeight + "px";
            b.style.height = c.scrollHeight + a.xy.lightbox_additional_height + "px";
            c.style.height = c.scrollHeight + "px"
        }
    };
    a._init_dnd_events = function () {
        dhtmlxEvent(document.body, "mousemove", a._move_while_dnd);
        dhtmlxEvent(document.body, "mouseup", a._finish_dnd);
        a._init_dnd_events = function () {}
    };
    a._move_while_dnd = function (b) {
        if (a._dnd_start_lb) {
            if (!document.dhx_unselectable) document.body.className += " dhx_unselectable", document.dhx_unselectable = !0;
            var c = a.getLightbox(),
                d = b && b.target ? [b.pageX, b.pageY] : [event.clientX, event.clientY];
            c.style.top = a._lb_start[1] + d[1] - a._dnd_start_lb[1] + "px";
            c.style.left = a._lb_start[0] + d[0] - a._dnd_start_lb[0] + "px"
        }
    };
    a._ready_to_dnd = function (b) {
        var c = a.getLightbox();
        a._lb_start = [parseInt(c.style.left, 10), parseInt(c.style.top, 10)];
        a._dnd_start_lb = b && b.target ? [b.pageX, b.pageY] : [event.clientX, event.clientY]
    };
    a._finish_dnd = function () {
        if (a._lb_start) a._lb_start = a._dnd_start_lb = !1, document.body.className = document.body.className.replace(" dhx_unselectable", ""), document.dhx_unselectable = !1
    };
    a.getLightbox = function () {
        if (!this._lightbox) {
            var b = document.createElement("DIV");
            b.className = "dhx_cal_light";
            a.config.wide_form && (b.className += " dhx_cal_light_wide");
            a.form_blocks.recurring && (b.className += " dhx_cal_light_rec");
            /msie|MSIE 6/.test(navigator.userAgent) && (b.className += " dhx_ie6");
            b.style.visibility = "hidden";
            for (var c = this._lightbox_template, d = this.config.buttons_left, e = 0; e < d.length; e++) c += "<div class='dhx_btn_set dhx_left_btn_set " + d[e] + "_set'><div dhx_button='1' class='" + d[e] + "'></div><div>" + a.locale.labels[d[e]] + "</div></div>";
            d = this.config.buttons_right;
            for (e = 0; e < d.length; e++) c += "<div class='dhx_btn_set dhx_right_btn_set " + d[e] + "_set' style='float:right;'><div dhx_button='1' class='" + d[e] + "'></div><div>" + a.locale.labels[d[e]] + "</div></div>";
            c += "</div>";
            b.innerHTML = c;
            if (a.config.drag_lightbox) b.firstChild.onmousedown = a._ready_to_dnd, b.firstChild.onselectstart = function () {
                return !1
            }, b.firstChild.style.cursor = "pointer", a._init_dnd_events();
            document.body.insertBefore(b, document.body.firstChild);
            this._lightbox = b;
            for (var g = this.config.lightbox.sections, c = "", e = 0; e < g.length; e++) {
                var f = this.form_blocks[g[e].type];
                if (f) {
                    g[e].id = "area_" + this.uid();
                    var j = "";
                    g[e].button && (j = "<div class='dhx_custom_button' index='" + e + "'><div class='dhx_custom_button_" + g[e].button + "'></div><div>" + this.locale.labels["button_" + g[e].button] + "</div></div>");
                    this.config.wide_form && (c += "<div class='dhx_wrap_section'>");
                    c += "<div id='" + g[e].id + "' class='dhx_cal_lsection'>" + j + this.locale.labels["section_" + g[e].name] + "</div>" + f.render.call(this, g[e]);
                    c += "</div>"
                }
            }
            for (var i = b.getElementsByTagName("div"), e = 0; e < i.length; e++) {
                var n = i[e];
                if (n.className == "dhx_cal_larea") {
                    n.innerHTML = c;
                    break
                }
            }
            this.setLightboxSize();
            this._init_lightbox_events(this);
            b.style.display = "none";
            b.style.visibility = "visible"
        }
        return this._lightbox
    };
    a._lightbox_template = "<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span></div><div class='dhx_cal_larea'></div>";
    a._init_touch_events = function () {
        if (this.config.touch != "force") this.config.touch = this.config.touch && (navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("Touch") != -1);
        if (this.config.touch) this.xy.scroll_width = 0, window.navigator.msPointerEnabled ? this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function (a) {
            return a.pointerType == a.MSPOINTER_TYPE_MOUSE ? null : a
        }, function (a) {
            return !a || a.pointerType == a.MSPOINTER_TYPE_MOUSE
        }) : this._touch_events(["touchmove", "touchstart", "touchend"], function (a) {
            return a.touches && a.touches.length > 1 ? null : a.touches[0] ? {
                target: a.target,
                pageX: a.touches[0].pageX,
                pageY: a.touches[0].pageY
            } : a
        }, function () {
            return !1
        })
    };
    a._touch_events = function (b, c, d) {
        function e(b, c, d) {
            if (b && c) {
                var f = Math.abs(b.pageY - c.pageY),
                    g = Math.abs(b.pageX - c.pageX);
                if (g > d && (!f || g / f > 3)) b.pageX > c.pageX ? a._click.dhx_cal_next_button() : a._click.dhx_cal_prev_button()
            }
        }
        function g(b) {
            a._hide_global_tip();
            if (k) a._on_mouse_up(c(b || event)), a._temp_touch_block = !1;
            a._drag_id = null;
            a._drag_mode = null;
            a._drag_pos = null;
            clearTimeout(n);
            k = m = !1;
            l = !0
        }
        var f = navigator.userAgent.indexOf("Android") != -1 && navigator.userAgent.indexOf("WebKit") != -1,
            j, i, n, k, l, m, o = 0;
        dhtmlxEvent(document.body, b[0], function (b) {
            if (!d(b)) {
                if (k) return a._on_mouse_move(c(b)), a._update_global_tip(), b.preventDefault && b.preventDefault(), b.cancelBubble = !0, !1;
                i && f && e(i, c(b), 0);
                i = c(b);
                if (m) if (i) {
                    if (j.target != i.target || Math.abs(j.pageX - i.pageX) > 5 || Math.abs(j.pageY - i.pageY) > 5) l = !0, clearTimeout(n)
                } else l = !0
            }
        });
        dhtmlxEvent(this._els.dhx_cal_data[0], "scroll", g);
        dhtmlxEvent(this._els.dhx_cal_data[0], "touchcancel", g);
        dhtmlxEvent(this._els.dhx_cal_data[0], "contextmenu", function (a) {
            if (m) return a && a.preventDefault && a.preventDefault(), (a || event).cancelBubble = !0, !1
        });
        dhtmlxEvent(this._els.dhx_cal_data[0], b[1], function (b) {
            if (!d(b)) {
                k = l = i = !1;
                m = !0;
                a._temp_touch_block = !0;
                var e = i = c(b);
                if (e) {
                    var f = new Date;
                    if (!l && !k && f - o < 250) return a._click.dhx_cal_data(e), window.setTimeout(function () {
                        a._on_dbl_click(e)
                    }, 50), b.preventDefault && b.preventDefault(), b.cancelBubble = !0, a._block_next_stop = !0, !1;
                    o = f;
                    !l && !k && a.config.touch_drag && (n = setTimeout(function () {
                        k = !0;
                        var b = j.target;
                        if (b && b.className && b.className.indexOf("dhx_body") != -1) b = b.previousSibling;
                        a._on_mouse_down(j, b);
                        if (a._drag_mode && a._drag_mode != "create") {
                            var c = -1;
                            a.for_rendered(a._drag_id, function (b, d) {
                                c = b.getBoundingClientRect().top;
                                b.style.display = "none";
                                a._rendered.splice(d, 1)
                            });
                            if (c >= 0) {
                                var d = a.config.time_step;
                                a._move_pos_shift = d * Math.round((e.pageY - c) * 60 / (a.config.hour_size_px * d))
                            }
                        }
                        a.config.touch_tip && a._show_global_tip();
                        a._on_mouse_move(j)
                    }, a.config.touch_drag), j = e)
                } else l = !0
            }
        });
        dhtmlxEvent(this._els.dhx_cal_data[0], b[2], function (b) {
            if (!d(b)) {
                k || e(j, i, 200);
                if (k) a._ignore_next_click = !0;
                g(b);
                if (a._block_next_stop) return a._block_next_stop = !1, b.preventDefault && b.preventDefault(), b.cancelBubble = !0, !1
            }
        });
        dhtmlxEvent(document.body, b[2], g)
    };
    a._show_global_tip = function () {
        a._hide_global_tip();
        var b = a._global_tip = document.createElement("DIV");
        b.className = "dhx_global_tip";
        a._update_global_tip(1);
        document.body.appendChild(b)
    };
    a._update_global_tip = function (b) {
        var c = a._global_tip;
        if (c) {
            var d = "";
            if (a._drag_id && !b) {
                var e = a.getEvent(a._drag_id);
                e && (d = "<div>" + (e._timed ? a.templates.event_header(e.start_date, e.end_date, e) : a.templates.day_date(e.start_date, e.end_date, e)) + "</div>")
            }
            c.innerHTML = a._drag_mode == "create" || a._drag_mode == "new-size" ? (a.locale.drag_to_create || "Drag to create") + d : (a.locale.drag_to_move || "Drag to move") + d
        }
    };
    a._hide_global_tip = function () {
        var b = a._global_tip;
        if (b && b.parentNode) b.parentNode.removeChild(b), a._global_tip = 0
    };
    a._dp_init = function (b) {
        b._methods = ["_set_event_text_style", "", "changeEventId", "deleteEvent"];
        this.attachEvent("onEventAdded", function (a) {
            !this._loading && this._validId(a) && b.setUpdated(a, !0, "inserted")
        });
        this.attachEvent("onConfirmedBeforeEventDelete", function (a) {
            if (this._validId(a)) {
                var d = b.getState(a);
                if (d == "inserted" || this._new_event) return b.setUpdated(a, !1), !0;
                if (d == "deleted") return !1;
                if (d == "true_deleted") return !0;
                b.setUpdated(a, !0, "deleted");
                return !1
            }
        });
        this.attachEvent("onEventChanged", function (a) {
            !this._loading && this._validId(a) && b.setUpdated(a, !0, "updated")
        });
        b._getRowData = function (a) {
            var b = this.obj.getEvent(a),
                e = {},
                g;
            for (g in b) g.indexOf("_") != 0 && (e[g] = b[g] && b[g].getUTCFullYear ? this.obj.templates.xml_format(b[g]) : b[g]);
            return e
        };
        b._clearUpdateFlag = function () {};
        b.attachEvent("insertCallback", a._update_callback);
        b.attachEvent("updateCallback", a._update_callback);
        b.attachEvent("deleteCallback", function (a, b) {
            this.obj.setUserData(b, this.action_param, "true_deleted");
            this.obj.deleteEvent(b)
        })
    };
    a._validId = function () {
        return !0
    };
    a.setUserData = function (a, c, d) {
        a ? this.getEvent(a)[c] = d : this._userdata[c] = d
    };
    a.getUserData = function (a, c) {
        return a ? this.getEvent(a)[c] : this._userdata[c]
    };
    a._set_event_text_style = function (a, c) {
        this.for_rendered(a, function (a) {
            a.style.cssText += ";" + c
        });
        var d = this.getEvent(a);
        d._text_style = c;
        this.event_updated(d)
    };
    a._update_callback = function (b) {
        var c = a._xmlNodeToJSON(b.firstChild);
        c.text = c.text || c._tagvalue;
        c.start_date = a.templates.xml_date(c.start_date);
        c.end_date = a.templates.xml_date(c.end_date);
        a.addEvent(c)
    };
    a._skin_settings = {
        fix_tab_position: [1, 0],
        use_select_menu_space: [1, 0],
        wide_form: [1, 0],
        hour_size_px: [44, 42],
        displayed_event_color: ["#ff4a4a", "ffc5ab"],
        displayed_event_text_color: ["#ffef80", "7e2727"]
    };
    a._skin_xy = {
        lightbox_additional_height: [90, 50],
        nav_height: [59, 22],
        bar_height: [24, 20]
    };
    a._configure = function (a, c, d) {
        for (var e in c) typeof a[e] == "undefined" && (a[e] = c[e][d])
    };
    a._skin_init = function () {
        if (!a.skin) for (var b = document.getElementsByTagName("link"), c = 0; c < b.length; c++) {
            var d = b[c].href.match("dhtmlxscheduler_([a-z]+).css");
            if (d) {
                a.skin = d[1];
                break
            }
        }
        var e = 0;
        a.skin && a.skin != "terrace" && (e = 1);
        this._configure(a.config, a._skin_settings, e);
        this._configure(a.xy, a._skin_xy, e);
        if (!e) {
            var g = a.config.minicalendar;
            if (g) g.padding = 14;
            a.templates.event_bar_date = function (b) {
                return "\u2022 <b>" + a.templates.event_date(b) + "</b> "
            };
            a.attachEvent("onTemplatesReady", function () {
                var b = a.date.date_to_str("%d"),
                    c = a.templates.month_day;
                a.templates.month_day = function (d) {
                    if (this._mode == "month") {
                        var e = b(d);
                        d.getDate() == 1 && (e = a.locale.date.month_full[d.getMonth()] + " " + e); + d == +a.date.date_part(new Date) && (e = a.locale.labels.dhx_cal_today_button + " " + e);
                        return e
                    } else return c.call(this, d)
                };
                if (a.config.fix_tab_position) for (var d = a._els.dhx_cal_navline[0].getElementsByTagName("div"), e = [], g = 211, h = 0; h < d.length; h++) {
                    var m = d[h],
                        o = m.getAttribute("name");
                    if (o) switch (m.style.right = "auto", o) {
                    case "day_tab":
                        m.style.left = "14px";
                        m.className += " dhx_cal_tab_first";
                        break;
                    case "week_tab":
                        m.style.left = "75px";
                        break;
                    case "month_tab":
                        m.style.left = "136px";
                        m.className += " dhx_cal_tab_last";
                        break;
                    default:
                        m.style.left = g + "px", m.className += " dhx_cal_tab_standalone", g = g + 14 + m.offsetWidth
                    }
                }
            });
            a._skin_init = function () {}
        }
    };
    for (var e = 0; e < Scheduler._schedulerPlugins.length; e++) Scheduler._schedulerPlugins[e](a);
    a._internal_id = Scheduler._seed++;
    Scheduler.$syncFactory && Scheduler.$syncFactory(a);
    return a
};
window.scheduler = Scheduler.getSchedulerInstance();
if (dhtmlx && dhtmlx.attaches) dhtmlx.attaches.attachScheduler = function (a, e, b, c) {
    var b = b || '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>',
        d = document.createElement("DIV");
    d.id = "dhxSchedObj_" + this._genStr(12);
    d.innerHTML = '<div id="' + d.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + b + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>';
    document.body.appendChild(d.firstChild);
    this.attachObject(d.id, !1, !0);
    this.vs[this.av].sched = c;
    this.vs[this.av].schedId = d.id;
    c.setSizes = c.updateView;
    c.destructor = function () {};
    c.init(d.id, a, e);
    return this.vs[this._viewRestore()].sched
};