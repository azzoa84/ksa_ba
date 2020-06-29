package fingersales.common.util;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionManager {
	/**
	 * @author 김영도
	 * 
	 * 세션 정보에 추가할 키 모음
	 * 
	 * fpSessionInfo 를 통해 반환받는 데이터 중 보안에 취약한 부분은 포함시키지 말 것
	 */
	private enum sessionKeys {
		SystemDeveloper,
		UserID,
		chakra_user_id,
		UserName,
		EmpCode,
		EmpName,
		EmpNameENG,
		EmpNameFOR,
		DutyCode,
		DutyName,
		PositionCode,
		WFPassWord,
		Auto_PassWord,
		IsHRManager,
		HREvaluateRole,
		EMail,
		DeptCode,
		DeptName,
		ForDeptName,
		SalesEmpYN,
		DeptLeaderYN,
		ManageYN,
		ManageEmpCode,
		ManageCEOEmpCode,
		CPDeptCode,
		SystemDeptCode,
		SiteCode,
		TempWH,
		SampleAcc,
		SampleWH,
		ClinicalWH,
		SmartLoginKey,
		MapKey
	}
	
	/**
	 * 추가 세션 정보를 등록한다.
	 * @param userInfo
	 * @param sessionInfo
	 */
    public static void setSessionInfo(HttpServletRequest request, List<FingerParamMap> sessionInfo, List<FingerParamMap> userMenus, List<FingerParamMap> formMessages) {
    	HttpSession session = request.getSession(true);
    	
		// 추가 정보 등록
    	for (FingerParamMap FingerParamMap : sessionInfo) {
    		if (Utility.enumContains(sessionKeys.class, (String)FingerParamMap.get("KeyCode"))) {
    			session.setAttribute((String)FingerParamMap.get("KeyCode"), (String)FingerParamMap.get("KeyValue"));
    		}
		}
    	
    	// 사용자 메뉴를 등록한다
    	session.setAttribute("userMenus", userMenus);
    	
    	// 폼 메시지를 등록한다
    	//session.setAttribute("formMessages", formMessages);
    }
}