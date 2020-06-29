/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package fingersales.common.util;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.Enumeration;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONSerializer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import fingersales.common.constants.CommConst;
import fingersales.common.dao.CommonDAO;
import fingersales.common.model.UserModel;
import fingersales.common.service.ServiceMap;

/**  
 * @Class Name : Utility.java
 * @Description : Utility Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.01.27           최초생성
 * 
 * @author francisco
 * @since 2014.01.27
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */

public class Utility {
    @Resource(name="commonDAO")
    protected CommonDAO commonDAO;
    
    private final static HttpHeaders _jsonHeader = new HttpHeaders();
    static{
    	_jsonHeader.add("Content-Type", "application/json; charset=UTF-8");
    }
    
	public static <E extends Enum<E>> boolean enumContains(Class<E> _enumClass, String value) {
		try {
			return EnumSet.allOf(_enumClass)
					.contains(Enum.valueOf(_enumClass, value));
		} catch (Exception e) {
			return false;
		}
	}
    
    public static String serialUID = "6723434363565852261R";
	static protected Log log = LogFactory.getLog(Utility.class);
	
	public static FingerParamMap getSimpleRequestMap(HttpServletRequest request) {
		FingerParamMap map = new FingerParamMap();
		Enumeration<?> parameterNames = request.getParameterNames();
		while (parameterNames.hasMoreElements()) {
			String parameterName = (String)parameterNames.nextElement();
			String[] parameterValues = request.getParameterValues(parameterName);
			if (parameterValues.length == 1) {
				map.put(parameterName, parameterValues[0]);
			}
			else {
				map.put(parameterName, parameterValues);
			}
		}
		return map;
	}	
	
	public static FingerParamMap[] getRequestMap(HttpServletRequest request) {
		FingerParamMap pMap[] = null;
		if(request.getParameter(CommConst.ARGS_SP_NAME) != null){
			pMap = getSPRequestMap(request);
		}else{
			pMap = getBasicRequestMap(request);
		}
		if(pMap != null){
			for(int i = 0; i < pMap.length; i++){
				pMap[i].put(CommConst.ARGS_RETURN_CODE, "");
				pMap[i].put(CommConst.ARGS_RETURN_STRING, "");
			}
		}
		return pMap;
	}
	
	private static FingerParamMap[] getBasicRequestMap(HttpServletRequest request) {
		FingerParamMap[] map = new FingerParamMap[1];
		map[0] = new FingerParamMap();
		Enumeration<?> parameterNames = request.getParameterNames();
		while (parameterNames.hasMoreElements()) {
			String parameterName = (String)parameterNames.nextElement();
			String[] parameterValues = request.getParameterValues(parameterName);
			if(parameterName.indexOf('[') == -1 && parameterValues.length == 1){
				map[0].put(parameterName, parameterValues[0]);
			}else{
				map[0].put(parameterName.replace("[", "").replace("]", ""), parameterValues);
			}
		}
		return map;
	}
	
	private static FingerParamMap[] getSPRequestMap(HttpServletRequest request) {
		int iParams = 1;
		String spName, prmName, prmValues[];
		FingerParamMap mapObj = null;
		String[][] recordList = null;
		ArrayList<String[]> paramList = new ArrayList<String[]>();
		ArrayList<FingerParamMap> mapList = new ArrayList<FingerParamMap>();
		
		spName = request.getParameter(CommConst.ARGS_SP_NAME).toString();
		
		if(!ServiceMap.canExecuteSP(spName)) return mapList.toArray(new FingerParamMap[mapList.size()]);
		
		prmName = "p1";
		while((prmValues = request.getParameterValues(prmName)) != null){
			prmValues = convertSessionValue(request, prmValues);
			paramList.add(prmValues);
			prmName = String.format("p%d", ++iParams);
		}
		recordList = convertRecordArray(paramList);
		
		if (recordList.length > 0) {
			for (int i = 0; i < recordList.length; i++) {
				mapObj = new FingerParamMap();
				mapObj.put(CommConst.ARGS_AJAX_CODE, ServiceMap.AJAX_DIRECT_SP);
				mapObj.put(CommConst.DIRECT_SP_NAME, spName);
				mapObj.put(CommConst.DIRECT_SP_PARAM, recordList[i]);
				mapList.add(mapObj);
			}
		} else {
			mapObj = new FingerParamMap();
			mapObj.put(CommConst.ARGS_AJAX_CODE, ServiceMap.AJAX_DIRECT_SP);
			mapObj.put(CommConst.DIRECT_SP_NAME, spName);
			mapObj.put(CommConst.DIRECT_SP_PARAM, new String[0]);
			mapList.add(mapObj);
		}
		return mapList.toArray(new FingerParamMap[mapList.size()]);
	}
	
	private static String[][] convertRecordArray(ArrayList<String[]> src){
		int iMaxRank = 0;
		String[][] resultData;
		
		for (int i = 0; i < src.size(); i++) {
			iMaxRank = Math.max(iMaxRank, src.get(i).length);
		}
		resultData = new String[iMaxRank][src.size()];
		
		for (int iRank = 0; iRank < iMaxRank; iRank++) {
			for (int iCol = 0; iCol < src.size(); iCol++) {
				resultData[iRank][iCol] = src.get(iCol)[iRank];
			}
		}
		return resultData;
	}
	
	private static String[] convertSessionValue(HttpServletRequest request, String src[]) {
		HttpSession session = request.getSession();
		/*
		System.out.println("getRemoteAddr : " + request.getRemoteAddr());
		System.out.println(request.getRemoteHost());
		System.out.println(request.getRemotePort());
		System.out.println(request.getRemoteUser());
		System.out.println(request.getLocalAddr());
		System.out.println(request.getLocalName());
		*/
		String NetworkHostName = "";
		try {
			NetworkHostName = java.net.InetAddress.getLocalHost().getCanonicalHostName();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		for (int i = 0; i < src.length; i++) {
			if (src[i].equals("#UserID#")) src[i] = getSessionAttribute(session, CommConst.SESS_USER_ID);
			else if (src[i].equals("#DeptCode#")) src[i] = getSessionAttribute(session, CommConst.SESS_DEPT_ID);
			else if (src[i].equals("#IP#")) src[i] = request.getRemoteAddr();
			else if (src[i].equals("#HostName#")) src[i] = NetworkHostName;
			else if (src[i].equals("#HostInfo#")) src[i] = NetworkHostName;
		}
		return src;
	}
	
	public static String getSessionAttribute(HttpSession session, String key){
		String result = (String)session.getAttribute(key);
		return result == null ? "" : result;
	}
	
    public static ResponseEntity<String> getJSONResponse(Object obj){
    	return new ResponseEntity<String>(getJSONString(obj), _jsonHeader, HttpStatus.OK);
    }
     
    public static String getJSONString(Object obj){
        return JSONSerializer.toJSON(obj).toString();
    }
    
    public static UserModel getPrincipal() {
    	try{
    		return (UserModel)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	}catch(Exception ex){
    		return null;
    	}
    }
    
	public static String randomString(int len) {
		String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++) {
			sb.append(AB.charAt(new Random().nextInt(AB.length())));
		}
		return sb.toString();
	}
	
	public static String randomStringPw(int len) {
		String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++) {
			sb.append(AB.charAt(new Random().nextInt(AB.length())));
		}
		return sb.toString();
	}
	
	public static JsonObject convertGoogleJsonObject(String jsonParameter) {
		String evalJson = jsonParameter.replaceAll("&quot;", "\"")
				.replaceAll("&apos;", "\'");
		
		return (evalJson != null && !evalJson.equals("")) ? (JsonObject) new JsonParser().parse(evalJson) : null;
	}
	
	/**
	 * 인트라넷 내에서 네트웍 호스트 네임 반환
	 * @param inaHost
	 * @return
	 * @throws UnknownHostException
	 */
	/*
	private String getIntraHostName (InetAddress inaHost) throws UnknownHostException {
		try
		{
			Class clazz = Class.forName("java.net.InetAddress");
			Constructor[] constructors = clazz.getDeclaredConstructors();
			constructors[0].setAccessible(true);
			InetAddress ina = (InetAddress) constructors[0].newInstance();

			Field[] fields = ina.getClass().getDeclaredFields();
			for (Field field: fields)
			{
				if (field.getName().equals("nameService"))
				{
					field.setAccessible(true);
					Method[] methods = field.get(null).getClass().getDeclaredMethods();
					for (Method method: methods)
					{
						if (method.getName().equals("getHostByAddr"))
						{
							method.setAccessible(true);
							return (String) method.invoke(field.get (null), inaHost.getAddress());
						}
					}
				}
			}
		} catch (ClassNotFoundException cnfe) {
		} catch (IllegalAccessException iae) {
		} catch (InstantiationException ie) {
		} catch (InvocationTargetException ite) {
			throw (UnknownHostException) ite.getCause();
		}
		return null;
		}
	}
	*/
}
