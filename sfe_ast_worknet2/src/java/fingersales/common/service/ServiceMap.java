package fingersales.common.service;

import java.util.HashMap;

public final class ServiceMap {
	
	private final static HashMap<String, String> AJAX_MAP = new HashMap<String, String>();
	
	/****************************************
	 * 공통
	 ****************************************/
	public static final String KEY_LOGIN = "KEY_LOGIN"; 	// 키 로그인
	
	public static final String AJAX_LOGIN = "COMM01"; 		//로그인
	public static final String AJAX_GET_MENUS = "COMM02";	//메뉴목록
	public static final String AJAX_GET_MESSAGE = "COMM03";	//메시지반환
	public static final String AJAX_MAIN_SUMMARY = "COMM04";	//메인화면 집계데이터
	public static final String AJAX_GET_EMPS = "COMM05";  //부서별 사원목록
	
	/****************************************
	 * 관리자
	 ****************************************/
	public static final String AJAX_ADMIN_MENUS = "ADM001";

	/****************************************
	 * DIRECT_SP
	 ****************************************/	
	public static final String AJAX_DIRECT_SP = "_DSP_";	//SP 직접호출
	
	// AJAX 호출 MAP 작성
	static
    {
		AJAX_MAP.put(AJAX_DIRECT_SP, "common.directSP");
		
		AJAX_MAP.put(KEY_LOGIN, "common.selectSmartLoginUser");
		AJAX_MAP.put(AJAX_LOGIN, "common.userLogin");
		AJAX_MAP.put(AJAX_GET_MENUS, "common.userMenu");
		AJAX_MAP.put(AJAX_GET_MESSAGE, "common.selectMessage");
		AJAX_MAP.put(AJAX_MAIN_SUMMARY, "common.homeSummary");
		AJAX_MAP.put(AJAX_GET_EMPS, "common.selectEmpList");
		
		AJAX_MAP.put(AJAX_ADMIN_MENUS, "common.fpMenuList");
    }
	
	public static String getQueryId(String ajaxCode) {
		if (AJAX_MAP.containsKey(ajaxCode)) {
			return AJAX_MAP.get(ajaxCode);
		} else {
			return "";
		}
	}
	
	public static boolean canExecuteSP(String sp) {
		try {
			// DirectSP.class.getField(sp);
			return true;
		} catch(Exception ex) {
			return false;
		}
	}
}
