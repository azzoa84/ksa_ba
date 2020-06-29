package fingersales.common.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;

import fingersales.common.util.FingerParamMap;
import fingersales.common.util.Utility;


public class UploadResult implements Serializable {
	private static final long serialVersionUID = -2635215403904667374L;
	private HashMap<String, Object> json;
	
	public UploadResult() {}
	
	public void setResultJson(ArrayList<FingerParamMap> resultList, String errorCode, String errorMsg, String returnStr) {
		ArrayList<ArrayList<FingerParamMap>> dsResult = new ArrayList<ArrayList<FingerParamMap>>();
		dsResult.add(resultList);
		
		this.json = new HashMap<String, Object>();
		this.json.put("resultList", dsResult);
		this.json.put("errorCode", errorCode);
		this.json.put("errorMsg", errorMsg);
		this.json.put("returnStr", returnStr);
	}
	
	public String getJsonString() {
		return Utility.getJSONString(json);
	}
	
	public ResponseEntity<String> getJSONResponse() {
		return Utility.getJSONResponse(json);
	}
}
