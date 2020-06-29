function CustomWfDocument(host, dispView) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.extObj = null;
	$.wfType = null;
	$.wfDocId = null;
	$.styleSheet = null;
	
	/**
	 * 초기화
	 */
	$.init = function(widthSize) {
		var box =
		'<div class="wf_doc_view"> \
			<div class="wf_wrap"> \
				<div class="wf_header"> \
					<h1><span class="doc_title"></span></h1> \
					<p class="wf_numbering" style="visibility:hidden;">분개장문서 : <span class="batch_num"></span></p> \
				</div> \
				<div class="wf_content"> \
					<div class="wf_left"> \
						<p>[문서번호] <span class="wf_doc_id"></span></p> \
						<p class="business_title"></p> \
					</div> \
					<div class="wf_right"> \
						<p class="wf_time"></p> \
						<p>기안자 : <span class="dept_name"></span> <span class="duty_name"></span> <span class="wf_emp_name"></span></p> \
					</div> \
					<table class="tbl-authorization"> \
						<caption>결재</caption> \
						<tr class="appr_line" style="display:none;"> \
							<th scope="row">결 재</th> \
							<td> \
							</td> \
						</tr> \
						<tr class="conf_line" style="display:none;"> \
							<th scope="row">협 의</th> \
							<td> \
							</td> \
						</tr> \
						<tr class="refs_line" style="display:none;"> \
							<th scope="row">참 조</th> \
							<td> \
							</td> \
						</tr> \
					</table> \
					<p>다음과 같이 기안하오니 결재를 바랍니다.</p> \
					<h2 class="wf_separation">- 다음 -</h2> \
					<div class="wf_detail-content"> \
					</div> \
					<div class="wf_detail_imagebox" style="display:none;"> \
						<img class="wf_detail_imagebox_image1" style="display:none;" /> \
						<img class="wf_detail_imagebox_image2" style="display:none;" /> \
						<img class="wf_detail_imagebox_image3" style="display:none;" /> \
					</div> \
				</div> \
				<div class="wf_footer"> \
					<img src="./fingerPlatform/images/wf_footer_logo.png" alt="astellas" /> \
				</div> \
			</div> \
		</div>';
		
		if (dispView) {
			dispView.setHTML(box);
			$.extObj = jQuery(('#' + dispView.id + ' .wf_doc_view'));
			
			if (widthSize) {
				$.extObj.find('.wf_wrap').css('width', (widthSize + 'px'));
			}
		}
		
		$.data = null;
		$.wfDocId = null;
		$.apprLine = null;
		$.confLine = null;
		$.refsLine = null;
		$.dType = null;
		$.dTitle = null;
		$.dCol1 = null;
		$.dVal1 = null;
		$.dCol2 = null;
		$.dVal2 = null;
	}

	/**
	 * 문서 불러오기
	 */
	$.load = function(ds) {
		if (!ds || ds.length == 0)
			return;
		
		var len = ds.length;
		$.data = (len > 0 ? ds[0][0] : null);
		$.wfDocId = $.data['wf_doc_id'];
		$.apprLine = (len > 1 ? ds[1] : null);
		$.confLine = (len > 2 ? ds[2] : null);
		$.refsLine = (len > 3 ? ds[3] : null);
		$.files = (len > 4 ? ds[4] : null); // local_fname, server_path, server_fname
		$.relWf = (len > 5 ? ds[5] : null); // rel_wf_doc_id, doc_title, doc_id
		$.dType = (len > 6 ? ds[6] : null);  // ds[6][0].type == 'LIST', [1].type == 'TABLE' 또는 d[6][0].type == 'RTF'
		$.dTitle = (len > 7 ? ds[7] : null); // ds[7][0].title // Action Learning 비용신청서, 영수증 내역
		// ds[8] 부터는 리스트 또는 테이블
		
		$.render(ds);
		
		return { 'relWf':$.relWf };
	};
	
	/**
	 * 문서 화면출력
	 */
	$.render = function(ds) {
		try {
			$.extObj.find('.doc_title').html($.data['business_title']);
			$.extObj.find('.doc_id').html($.data['doc_id']);
			$.extObj.find('.wf_doc_id').html($.data['wf_doc_id']);
			$.extObj.find('.business_title').html($.data['doc_title']);
			$.extObj.find('.dept_name').html($.data['dept_name']);
			$.extObj.find('.duty_name').html($.data['duty_name']);
			$.extObj.find('.wf_emp_name').html($.data['emp_name']);
			
			if ($.data['BatchNum'] && $.data['BatchNum'] != '0') {
				$.extObj.find('.wf_numbering').css('visibility', 'visible').find('span').text($.data['BatchNum']);
			} else {
				$.extObj.find('.wf_numbering').css('visibility', 'hidden').find('span').text('');
			}
			
			var def_t = $.data['wf_time'] || '';
			if (def_t && def_t.length == 15) {
				def_t = def_t.substr(0, 4) + '년 ' + def_t.substr(4, 2) + '월 ' + def_t.substr(6, 2) + '일 ' + dayNumberToString(def_t.substr(14, 1)) + ' ' + def_t.substr(8, 2) + ':' + def_t.substr(10, 2) + ':' + def_t.substr(12, 2);
			}
			$.extObj.find('.wf_time').html(def_t);

			var model =
			'<div class="item"> \
				<div class="sign"><img class="sign_img" /></div> \
				<p class="name">{0} {1}</p> \
				<p class="date">{2}</p> \
			</div>';
			var model2 = '<div class="item">{0} {1}</div>';
			
			if ($.apprLine && $.apprLine.length) {
				var appr = $.apprLine;
				for (var i = 0; i < appr.length; i++) {
					def_t = appr[i]['wf_confirm_time'] || '';
					if (def_t && def_t.length == 15) {
						def_t = def_t.substr(0, 4) + '-' + def_t.substr(4, 2) + '-' + def_t.substr(6, 2) + ' ' + def_t.substr(8, 2) + ':' + def_t.substr(10, 2) + ':' + def_t.substr(12, 2);
					}
					var sign_html = '';
					if (appr[i]['origin_emp_name']) {
						sign_html = model.replace('{0}', appr[i]['origin_emp_name']).replace('{1}', ('(代 ' + appr[i]['emp_name']) + ')').replace('{2}', def_t);
					} else {
						sign_html = model.replace('{0}', appr[i]['dept_name']).replace('{1}', appr[i]['emp_name']).replace('{2}', def_t);
					}
					var sign_box = jQuery(sign_html).appendTo($.extObj.find('.appr_line > td'));
					
					if (appr[i]['sign_img'] && appr[i]['sign_img'].length) {
						sign_box.find('.sign_img').attr('src', convertByteArrayToImageSource(appr[i]['sign_img']));
					}
				}
				$.extObj.find('.appr_line').show();
			}
			if ($.confLine && $.confLine.length) {
				var conf = $.confLine;
				for (var i = 0; i < conf.length; i++) {
					def_t = conf[i]['ref_confirm_time'] || '';
					if (def_t && def_t.length == 15) {
						def_t = def_t.substr(0, 4) + '-' + def_t.substr(4, 2) + '-' + def_t.substr(6, 2) + ' ' + def_t.substr(8, 2) + ':' + def_t.substr(10, 2) + ':' + def_t.substr(12, 2);
					}
					var sign_html = '';
					if (conf[i]['origin_emp_name']) {
						sign_html = model.replace('{0}', conf[i]['origin_emp_name']).replace('{1}', ('(代 ' + conf[i]['emp_name']) + ')').replace('{2}', def_t);
					} else {
						sign_html = model.replace('{0}', conf[i]['dept_name']).replace('{1}', conf[i]['emp_name']).replace('{2}', def_t);
					}
					var sign_box = jQuery(sign_html).appendTo($.extObj.find('.conf_line > td'));
					
					if (conf[i]['sign_img'] && conf[i]['sign_img'].length) {
						sign_box.find('.sign_img').attr('src', convertByteArrayToImageSource(conf[i]['sign_img']));
					}
				}
				$.extObj.find('.conf_line').show();
			}
			if ($.refsLine && $.refsLine.length) {
				var refs = $.refsLine;
				for (var i = 0; i < refs.length; i++) {
					$.extObj.find('.refs_line > td').append(model2.replace('{0}', refs[i]['dept_name']).replace('{1}', refs[i]['emp_name']));
				}
				$.extObj.find('.refs_line').show();
			}
			
			var b_model = '<div class="wf_text_box border"></div>';
			var l_model = '<div class="wf_text_box"></div>';
			var t_model = 
				'<table class="tbl-content"> \
					<caption class="show">{0}</caption> \
					<colgroup></colgroup> \
					<thead></thead> \
					<tbody></tbody> \
				</table>';

			if ($.dType && $.dType.length) {
				var idx = 7; // ds 접근 인덱스 (8부터 시작, 테이블 또는 리스트 형태)
				
				for (var i = 0; i < $.dType.length; i++) {
					var dType = $.dType[i]['type'];
					var dTitle = $.dTitle[i]['title'];
					
					idx++;
					var cols = ds[idx];
					
					if (dType != 'IMAGEBOX') {
						idx++;
						var vals = ds[idx];						
					}
					if (cols && cols.length) {
						// IMAGEBOX 는 1테이블만 존재
						if (dType != 'IMAGEBOX' && (!vals || !vals.length)) {
							continue;
						}
						// details render start.
						if (dType == 'LIST') {
							var l_contents = ('<p class="wf_list_title"><b>' + dTitle + '</b></p>');
							for (var j = 0; j < cols.length; j++) {
								vals[0][cols[j]['column_name']] = vals[0][cols[j]['column_name']].toString().replace(/\n/g, '<br>');
								l_contents += (cols[j]['label_name'] + vals[0][cols[j]['column_name']] + '<br>');
							}
							$.extObj.find('.wf_detail-content').append(jQuery(l_model).html(l_contents));
						}
						else if (dType == 'TABLE') {
							var j_table = jQuery(t_model.replace('{0}', dTitle));
							var t_row = '<tr>';
							
							for (var j = 0; j < cols.length; j++) {
								j_table.find('colgroup').append('<col style="width:' + (Number(cols[j]['column_len']) / 100) + '%">');
								t_row += ('<th scope="col" data-col="' + cols[j]['column_name'] + '">' + vals[0][cols[j]['column_name']] + '</th>');
							}
							t_row += '</tr>';
							j_table.find('thead').append(t_row);

							// vals[0]은 테이블 헤더(th)
							var t_cols = j_table.find('thead').find('tr').first().find('th'); 
							for (var j = 1; j < vals.length; j++) {
								var t_row = '<tr>';
								
								for (var k = 0; k < t_cols.length; k++) {
									var col_name = t_cols.eq(k).data('col');
									t_row += ('<td>' + vals[j][col_name] + '</td>');
								}
								t_row += '</tr>';
								j_table.find('tbody').eq(0).append(t_row);
							}
							
							$.extObj.find('.wf_detail-content').append(j_table);
						}
						else if (dType == 'RTF') {
							var doc_content = vals[0].doc_content;
							if (doc_content) {
								doc_content = convertRtfToHtml(doc_content);
							}
							$.extObj.find('.wf_detail-content').append(jQuery(l_model).html(doc_content));
						}
						else if (dType == 'IMAGEBOX') {
							var item_image1 = convertByteArrayToImageSource(cols[0].item_image1);
							var item_image2 = convertByteArrayToImageSource(cols[0].item_image2);
							var item_image3 = convertByteArrayToImageSource(cols[0].item_image3);
							if (item_image1) {
								$.extObj.find('.wf_detail_imagebox').css('display', 'block');
								$.extObj.find('.wf_detail_imagebox').find('.wf_detail_imagebox_image1').attr('src', item_image1).css('display', 'block');
							} else { $.extObj.find('.wf_detail_imagebox').find('.wf_detail_imagebox_image1').css('display', 'none'); }
							
							if (item_image2) {
								$.extObj.find('.wf_detail_imagebox').find('.wf_detail_imagebox_image2').attr('src', item_image2).css('display', 'block');
							} else { $.extObj.find('.wf_detail_imagebox').find('.wf_detail_imagebox_image2').css('display', 'none'); }
							
							if (item_image3) {
								$.extObj.find('.wf_detail_imagebox').find('.wf_detail_imagebox_image3').attr('src', item_image3).css('display', 'block');
							} else { $.extObj.find('.wf_detail_imagebox').find('.wf_detail_imagebox_image3').css('display', 'none'); }
						}
					} // details render end.
				}
			}
			
			var doc_comment = $.data['doc_comment'];
			if (doc_comment) {
				doc_comment = convertRtfToHtml(doc_comment);
				$.extObj.find('.wf_detail-content').append(jQuery(b_model).html(doc_comment));
			}
			
			var f_model = 
				'<div class="wf_file_area"> \
					<div class="wf_attach"> \
						<h3 style="visibility:hidden;">첨부파일</h3> \
					</div> \
					<div class="wf_refer"> \
						<h3 style="visibility:hidden;">참조결재문서</h3> \
					</div> \
				</div>';
			if (($.files && $.files.length) || ($.relWf && $.relWf.length)) {
				// 첨부파일 및 참조결재문서
				var f_table = jQuery(f_model);
				
				if ($.files && $.files.length) {
					for (var i = 0; i < $.files.length; i++) {
						var file_url = ($.files[i]['server_path'] + '/' + $.files[i]['server_fname']);
						var file_name = $.files[i]['local_fname'];
						
						// 파일 URL에 링크가 안되는 문자가 들어 있는 경우, replace 처리
						if (file_url.search('\'')) {
							file_url = file_url.replace(/\'/g, '\\\'');
						}
						f_table.find('.wf_attach').append('<div class="underline2" onclick="g_fileBrowser.download(\'' + file_url + '\')">' + file_name + '</div>');
						//f_table.find('.wf_attach').append('<a href="' + file_url + '">' + $.files[i]['local_fname'] + '</a>');
					}
					f_table.find('.wf_attach').find('h3').css('visibility', 'visible');
				}
				if ($.relWf && $.relWf.length) {
					for (var i = 0; i < $.relWf.length; i++) {
						var refDoc = jQuery('<a href="#">' + $.relWf[i]['doc_title'] + '</a>');
						if (host.funcRefDocClick) {
							refDoc.on('click', {'doc_title':$.relWf[i]['doc_title'], 'wf_doc_id':$.relWf[i]['rel_wf_doc_id'], 'tab_index':(i + 1)}, host.funcRefDocClick);
						}
						f_table.find('.wf_refer').append(refDoc);
					}
					f_table.find('.wf_refer').find('h3').css('visibility', 'visible');
				}
				
				$.extObj.find('.wf_content').append(f_table);
			}
			
		} catch (err) {
			console.log(err.message);
		}
	};
	
	/**
	 * wfDocId 반환
	 */
	$.getWfDocId = function() {
		return $.wfDocId;
	};

	$.getPrintBody = function() {
		if ($.extObj) {
			return $.extObj.parent().html();
		}
	};
	
	$.getPrintHtml = function(appHtml) {
		if ($.extObj) {
			if (!$.styleSheet) {
				var styleCss = call_sync_ajax('./fingerPlatform/css/customWfDocument.css');
				$.styleSheet = '<style>' + styleCss + '</style>';				
			}
			if (appHtml) {
				var html = appHtml;
			} else {
				var html = $.extObj.parent().html();
			}
			html = '<html><head>' + $.styleSheet + '</head><body>' + html + '</body></html>';
			return html;
		}
	};
}