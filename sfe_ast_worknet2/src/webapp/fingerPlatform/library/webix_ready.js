webix.ready(function() {			
	try {
		// 로케일 설정
		webix.i18n.setLocale("ko-KR");
		
		// 커스텀 에디터 (텍스트 멀티라인 에디터)
		webix.editors.multi_line_edit = {
			focus: function() {
				this.getInputNode(this.node).focus();
				this.getInputNode(this.node).select();
			},
			getValue: function() {
				return this.getInputNode(this.node).value.replace(/\n/g, "<br>");
			},
			setValue: function(value) {
				this.getInputNode(this.node).value = value.replace(/<br>/g, "\n");
			},
			getInputNode: function() {
				return this.node.firstChild;
			},
			render: function() {
				var readonly = this.config.readonly;
				if (readonly) {
					var textarea = "<textarea class='webix_textarea_edit webix_view' readonly='readonly' style='white-space: pre-wrap;'></textarea>";
				} else {
					var textarea = "<textarea class='webix_textarea_edit webix_view'></textarea>";
				}
				return webix.html.create("div", {
					"class":"webix_dt_editor"
				}, textarea);
			}
		};
		
		// DataTable Footer 에 Average 추가 (* 기본은 Sum만 존재)
		var datatable_avgColumn = {
			refresh: function(t, e, i) {
				var s = 0;
				var totalCount = 0;
				t.mapCells(null, i.columnId, null, 1, function(t) {
					t = 1 * t,
					isNaN(t) || (s += t)
					totalCount++;
				}, !0),
				s = (s/totalCount);
				i.format && (s = i.format(s)),
				i.template && (s = i.template({
					value: s
				})),
				e.firstChild.innerHTML = s
			}
		};
		webix.ui.datafilter.avgColumn = webix.extend(datatable_avgColumn, webix.ui.datafilter.summColumn);

		// 지정된 핫키 해제
		webix.UIManager.removeHotKey("enter");

	} catch (err) {
		console.log('webix_ready.js : ' + err.message);
	}
});