package fingersales.common.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import fingersales.common.constants.CommConst;
import fingersales.common.dao.CommonDAO;
import fingersales.common.model.UserModel;
import fingersales.common.service.ServiceMap;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.QueryResult;
import fingersales.common.util.Utility;


public abstract class SWNBaseControler {
	protected Log log = LogFactory.getLog(this.getClass());
	
	@Autowired protected ApplicationContext appCtx;
	@Autowired protected ServletContext svlCtx;
	
	/** CommonDAO */
    @Resource(name="commonDAO")
    protected CommonDAO commonDAO;
    
    protected Object invokeInsert(String cmdId, FingerParamMap map) throws Exception {
    	return invokeInsert("", cmdId, map);
    }
    
    protected int invokeUpdate(String cmdId, FingerParamMap map) throws Exception {
    	return invokeUpdate("", cmdId, map);
    }

    protected int invokeDelete(String cmdId, FingerParamMap map) throws Exception {
    	return invokeDelete("", cmdId, map);
    }
    
    protected Object InvokePK(String cmdId, FingerParamMap map) throws Exception {
    	return InvokePK("", cmdId, map);
    }

    @SuppressWarnings("unchecked")
	protected List<FingerParamMap> invokeList(String DAO, String cmdId, FingerParamMap map) throws Exception {
    	return commonDAO.list(DAO, cmdId, map);
    }
    
    protected Object invokeInsert(String DAO, String cmdId, FingerParamMap map) throws Exception {
    	return commonDAO.insert(DAO, cmdId, map);
    }
    
    protected int invokeUpdate(String DAO, String cmdId, FingerParamMap map) throws Exception {
    	return commonDAO.update(DAO, cmdId, map);
    }

    protected int invokeDelete(String DAO, String cmdId, FingerParamMap map) throws Exception {
    	return commonDAO.delete(DAO, cmdId, map);
    }
    
    protected Object InvokePK(String DAO, String cmdId, FingerParamMap map) throws Exception {
    	return commonDAO.selectByPk(DAO, cmdId, map);
    }
    
    
	private class AjaxInkoveInfo{
		final FingerParamMap param;
		final String ajaxCode;
		AjaxInkoveInfo(FingerParamMap param, String ajaxCode){
			this.param = param;
			this.ajaxCode = ajaxCode;
		}
	}
	
    protected ResponseEntity<String> requestAjax(String dao, HttpServletRequest request){
    	
    	ArrayList<QueryResult> resultList = requestProcCall(dao, request);
    	if(resultList == null){
    		return new ResponseEntity<String>("[[]]", HttpStatus.OK);
    	} else {
    		return Utility.getJSONResponse(resultList.size() == 1 ? resultList.get(0) : resultList);
    	}
    }
    
    protected ArrayList<QueryResult> requestProcCall(String dao, HttpServletRequest request){
    	FingerParamMap resultCode = new FingerParamMap();
    	try{
	    	AjaxInkoveInfo info[] = createAjaxParam(request);
	    	ArrayList<QueryResult> resultList = new ArrayList<QueryResult>();

	    	for(int ii = 0; ii < info.length; ii++){
    			List<FingerParamMap> list = invokeList(dao, info[ii].ajaxCode, info[ii].param);
        		String returnCode = (String)info[ii].param.get(CommConst.ARGS_RETURN_CODE);
        		resultCode.put(CommConst.ARGS_RETURN_CODE, returnCode);
        		resultCode.put(CommConst.ARGS_RETURN_STRING, info[ii].param.get(CommConst.ARGS_RETURN_STRING));
        		resultCode.put(CommConst.ARGS_ERROR_MSG, null);
        		// SP에서 에러코드로 반환된 경우 에러메시지 추가
        		if (!returnCode.matches("MSG0001|MSG0002|MSG0003|MSG0004")) {
        			FingerParamMap m = new FingerParamMap(); 
        			m.put("errorCode", returnCode);
        			List<FingerParamMap> msgList = invokeList("", ServiceMap.getQueryId(ServiceMap.AJAX_GET_MESSAGE), m);
        			if (msgList != null && msgList.size() > 0) {
        				resultCode.put(CommConst.ARGS_ERROR_MSG, msgList.get(0).get("error_str"));
        			}
        		}
        		resultList.add(new QueryResult(resultCode, list));
    		}
    		return resultList;
    	}catch(Exception ex){
    		StackTraceElement[] list = ex.getStackTrace();
    		
    		if(list.length > 0){
    			log.error(String.format("%s at %s - %d", ex.getClass().getName(), list[0].getFileName(), list[0].getLineNumber()));
    			ex.printStackTrace();
    		}
    		return null;
    	}
    }
    
    
    protected ResponseEntity<String> requestAjaxN(HttpServletRequest request) throws Exception {
    	int effected = 0;
    	AjaxInkoveInfo info[] = createAjaxParam(request);
    	try {
    		for(int ii = 0; ii < info.length; ii++){
    			effected += invokeUpdate(info[ii].ajaxCode, info[ii].param);
    		}
    		FingerParamMap result = new FingerParamMap();
    		result.put("effected", effected);
    		return Utility.getJSONResponse(result);
    	} catch(Exception ex) {
    		return new ResponseEntity<String>("[[]]", HttpStatus.OK);
    	}
    }
    
    protected void addAjaxRequestParam(String ajaxCode, FingerParamMap param){
    	UserModel userSession = Utility.getPrincipal();
    	if (userSession == null) {
    		param.put("userId", "anonymous");
    	} else {
    		param.put("userId", userSession.getUserId());
    	}
    }
    
    private AjaxInkoveInfo[] createAjaxParam(HttpServletRequest request){
    	FingerParamMap map[] = Utility.getRequestMap(request);
    	ArrayList<AjaxInkoveInfo> infoList = new ArrayList<AjaxInkoveInfo>();
    	
    	for(int ii = 0; ii < map.length; ii++){
	    	String ajaxCode = map[ii].get(CommConst.ARGS_AJAX_CODE).toString();
	    	if(ajaxCode == null || ServiceMap.getQueryId(ajaxCode) == ""){
	    		return null;
	    	}
	    	addAjaxRequestParam(ajaxCode, map[ii]);
	    	infoList.add(new AjaxInkoveInfo(map[ii], ServiceMap.getQueryId(ajaxCode)));
    	}
    	return infoList.toArray(new AjaxInkoveInfo[infoList.size()]);
    }
    
}
