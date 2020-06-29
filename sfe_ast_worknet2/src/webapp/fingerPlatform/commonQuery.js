// 콤보 데이터 조회
// @return callback();
function commCodeData(target, workType, groupCodePipeLine, p1, p2, p3, p4, p5) {
    try {
        var json = createExecuteParamInfo("P_GetComboData",
                                            [
                                                workType || 'ComboBind'
                                            ,   groupCodePipeLine
                                            ,	'#DeptCode#'
                                            ,	'#UserID#'
                                            ,	(p1 || '')
                                            ,	(p2 || '')
                                            ,	(p3 || '')
                                            ,	(p4 || '')
                                            ,	(p5 || '')
                                            ]);

        callQuery(['req', json], 'ComboBind', target);
    }
    finally {
        json = null;
    }
}

// 콤보 데이터 조회 callQuerySync 버전
// @return callback();
function commCodeData2(target, workType, groupCodePipeLine, p1, p2, p3, p4, p5) {
    try {
        var json = createExecuteParamInfo("P_GetComboData",
                                            [
                                                workType || 'ComboBind'
                                            ,   groupCodePipeLine
                                            ,	'#DeptCode#'
                                            ,	'#UserID#'
                                            ,	(p1 || '')
                                            ,	(p2 || '')
                                            ,	(p3 || '')
                                            ,	(p4 || '')
                                            ,	(p5 || '')                                            
                                            ]);

        var ds = callQuerySync(['req', json], 'ComboBind');

        return ds;
    }
    finally {
        ds = null;        
        json = null;
    }
}

// BizComponent 데이터 조회
function bizComponentData2(target, workType, groupCodePipeLine, p1, p2, p3, p4, p5) {
	try {
		var json = createExecuteParamInfo("P_GetBizComponentData",
                                         [
                                             workType
                                         ,   groupCodePipeLine
                                         ,	'#DeptCode#'
                                         ,	'#UserID#'
                                         ,	(p1 || '')
                                         ,	(p2 || '')
                                         ,	(p3 || '')
                                         ,	(p4 || '')
                                         ,	(p5 || '')                                         
                                         ]);

		var ds = callQuerySync(['req', json], 'BizComponent');

		return ds;
	}
	finally {
		ds = null;        
		json = null;
	}
}

// CommonQueryData 조회
function getCommonQueryData(target, workType, p1, p2, p3, p4, p5) {
	try {
		var json = createExecuteParamInfo("P_GetCommonQueryData",
                                         [
                                             workType
                                         ,	'#DeptCode#'
                                         ,	'#UserID#'
                                         ,	(p1 || '')
                                         ,	(p2 || '')
                                         ,	(p3 || '')
                                         ,	(p4 || '')
                                         ,	(p5 || '')                                         
                                         ]);

		var ds = callQuerySync(['req', json], 'CommonQueryData');

		return ds;
	}
	finally {
		ds = null;        
		json = null;
	}
}

// 담당자 조회 
// @return [employee_id, emp_name];
function commSearchEmp(empName) {
    try {
        var json = createExecuteParamInfo("P_POPUP_EMP",
                                            [
                                                'Q4'
                                            ,   '#CompID#'      /* @p_comp_id */
                                            ,   empName         /* @p_query_string */
                                            ,   '#DeptCode#'    /* @p_dept_code */
                                            ,   'Y'             /* @p_sales_emp_yn */
                                            ,	'#UserID#'      /* @p_user_id */
                                            ]);

        var ds = callQuerySync(['req', json], 'EMP_Q');

        return ds;
    }
    finally {
        ds = null;
        json = null;
    }
}

// WFDocument ID 생성
function createWFDocumentId(wfFormId) {
	return commWFDocumentQ('Q2', '', '', wfFormId);
}

// WFDocument 공통 조회
// @return [business_id, wf_type, business_title];
function commWFDocumentQ(workType, p1, p2, p3) {
	try {
		var json = createExecuteParamInfo("P_crmWFDocument_Q",
                                     	[
                                     	 	 workType
                                     	 ,   p1 || ''     	 	/* @p_wf_doc_id */
                                     	 ,   p2 || ''         	/* @p_doc_title */
                                     	 ,   p3 || ''    		/* @p_wf_form_id */
                                     	 ]);

		var ds = callQuerySync(['req', json], 'WFD_Q');

		return ds;
	}
	finally {
		ds = null;
		json = null;
	}
}

function removeWFDocument(remWfDocId) {
	var ds = commWFDocumentS('D', remWfDocId);
	return ds;
}

function commWFDocument(workType, docType, docTitle, businessId, originWfDocId, wfLine, fileObj, docObj, wbeComment, wf_doc_id, manage, share_yn, wbeContent) {
	try {
		if (fileObj) {
			if (Array.isArray(fileObj)) {
				var files = fileObj;
			} else {
				var files = fileObj ? fileObj.getAllRows() : null;
			}
		}
		if (docObj) {
			if (Array.isArray(docObj)) {
				var docs = docObj;
			} else {
				var docs = docObj ? docObj.getAllRows() : null;
			}
		}
		if (!wf_doc_id) {
			wf_doc_id = (wfLine ? wfLine.wf_doc_id : '');
		}
		var ds = commWFDocumentS(
				workType || 'N'
			, 	wf_doc_id									/* @p_wf_doc_id */
			, 	docTitle									/* @p_doc_title */
			, 	(wbeContent ? wbeContent.getHTML() : '')	/* @p_doc_content */
			, 	(wbeComment ? wbeComment.getHTML() : '')	/* @p_doc_comment */
			, 	'#UserID#'									/* @p_employee_id */
			, 	docType										/* @p_wf_start_yn */
			, 	businessId									/* @p_business_id */
			, 	originWfDocId								/* @p_origin_wf_doc_id */
			, 	'#UserID#'									/* @p_user */
			, 	(wfLine ? wfLine.appr : '')					/* @p_wf_employee_id */
			, 	(wfLine ? wfLine.appr_yn : '')				/* @p_wf_line_yn */
			, 	(wfLine ? wfLine.conf : '')					/* @p_ref_employee_id */
			, 	(wfLine ? wfLine.conf_yn : '')				/* @p_ref_line_yn */
			, 	(wfLine ? wfLine.refs : '')					/* @p_rcv_employee_id */
			, 	(wfLine ? wfLine.refs_yn : '')				/* @p_rcv_line_yn */
			, 	arrToStr2(files, 'server_path')				/* @p_server_path */
			, 	arrToStr2(files, 'server_fname')			/* @p_server_fname */
			, 	arrToStr2(files, 'local_fname')				/* @p_local_fname */
			, 	arrToStr2(docs, 'wf_doc_id')				/* @p_rel_wf_doc_id */
			, 	manage || ''								/* @p_manage */
			, 	(wbeContent ? wbeContent.getText() : '')	/* @p_doc_content_txt */
			, 	(wbeComment ? wbeComment.getText() : '')	/* @p_doc_comment_txt */
			, 	share_yn || ''								/* @p_share_yn */
		);
		return ds;
		
	} catch (err) {
		console.log('commonQuery.js commWFDocument() : ' + err.message);
	}
}

// WFDocument 공통 저장
function commWFDocumentS(workType, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23) {
	try {
		// @p_wf_start_yn (결재문서 생성 여부)
		p6 = p6 || ((workType == 'N' && p1) ? 'Y' : 'N');
		
		var json = createExecuteParamInfo("P_crmWFDocument_S",
										[
										 	workType
										 	,	p1 || ''     	 	/* @p_wf_doc_id */
										 	, 	p2 || ''         	/* @p_doc_title */
										 	,   p3 || ''    		/* @p_doc_content */
										 	,	p4 || ''			/* @p_doc_comment */
										 	,	p5 || '#UserID#'	/* @p_employee_id */
										 	,	p6					/* @p_wf_start_yn */
										 	,	p7 || ''			/* @p_business_id */
										 	,	p8 || ''			/* @p_origin_wf_doc_id */
										 	,	p9 || '#UserID#'	/* @p_user */
										 	,	p10 || ''			/* @p_wf_employee_id */
										 	,	p11 || ''			/* @p_wf_line_yn */
										 	,	p12 || ''			/* @p_ref_employee_id */
										 	,	p13 || ''			/* @p_ref_line_yn */
										 	,	p14 || ''			/* @p_rcv_employee_id */
										 	,	p15 || ''			/* @p_rcv_line_yn */
										 	,	p16 || ''			/* @p_server_path */
										 	,	p17 || ''			/* @p_server_fname */
										 	,	p18 || ''			/* @p_local_fname */
										 	,	p19 || ''			/* @p_rel_wf_doc_id */
										 	,	p20 || 'N'			/* @p_manage */
										 	,	p21 || ''			/* @p_doc_content_txt */
										 	,	p22 || ''			/* @p_doc_comment_txt */
										 	,	p23 || 'N'			/* @p_share_yn */
                                   	 ]);

		var ds = callExecuteSync(['req', json], 'WFD_S');
		return ds;
	}
	finally {
		ds = null;
		json = null;
	}
}

// 권한 조회
function commSystemRole(workType, systemRoleCode)
{
	try {
		var json = createExecuteParamInfo("P_crmSystemRole_Q",
			    [
					workType
				,	systemRoleCode
				,	'#DeptCode#'
				,	'#UserID#'
				]);
		var ds = callQuerySync(['req', json], 'sysRole_Q');

		return ds;
	}
	finally {
		ds = null;
		json = null;
	}
}

// 쿼리 실행
function commExecuteSQL(query) {
	try {
		if (!query) return;
		
		var json = createExecuteParamInfo("P_ExecuteSQL",
                                     	[
                                     	 	 'Q'
                                     	 ,   query
                                     	 ]);

		var ds = callQuerySync(['req', json], 'P_ExecuteSQL');
		return ds;
	}
	finally {
		ds = null;
		json = null;
	}
}

// 도움말 파일 조회
function commSearchHelpFile(helpDocId) {
	try {
		if (!helpDocId) return;
		
		var json = createExecuteParamInfo("FingerFormHelpProc",
										[
											'Q_FILE'
										,	helpDocId
										]);

		var ds = callQuerySync(['req', json], 'Q_FILE');
		var filePath = '';
		
		if (ds && ds.resultList[0]) {
			filePath = ds.resultList[0][0].file_path;
		}
				
		return filePath;
	}
	finally {
		ds = null;
		json = null;
	}
}