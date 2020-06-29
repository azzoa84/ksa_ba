package fingersales.common.model;

import javax.servlet.http.HttpServletRequest;

public class ToktokAuthParameter {
	public static final String SESSION_NM = "__TOKTOK_AUTH_PARAM__";
	
	private final String primitive;
	private final String lang;
	private final String encPwd;
	private final String osName;
	private final String osVersion;
	private final String groupCd;
	private final String deviceModel;
	private final String mdn;
	private final String authKey;
	private final String companyCd;
	private final String appId;
	private final String appVer;
	
	public final String getJson(){
		StringBuffer buffer = new StringBuffer();
		buffer.append("{");
		buffer.append(String.format("primitive:\"%s\"", primitive.replace("\"", "\\\"")));
		buffer.append(String.format(",lang:\"%s\"", lang.replace("\"", "\\\"")));
		buffer.append(String.format(",encPwd:\"%s\"", encPwd.replace("\"", "\\\"")));
		buffer.append(String.format(",osName:\"%s\"", osName.replace("\"", "\\\"")));
		buffer.append(String.format(",osVersion:\"%s\"", osVersion.replace("\"", "\\\"")));
		buffer.append(String.format(",groupCd:\"%s\"", groupCd.replace("\"", "\\\"")));
		buffer.append(String.format(",deviceModel:\"%s\"", deviceModel.replace("\"", "\\\"")));
		buffer.append(String.format(",mdn:\"%s\"", mdn.replace("\"", "\\\"")));
		buffer.append(String.format(",authKey:\"%s\"", authKey.replace("\"", "\\\"")));
		buffer.append(String.format(",companyCd:\"%s\"", companyCd.replace("\"", "\\\"")));
		buffer.append(String.format(",appId:\"%s\"", appId.replace("\"", "\\\"")));
		buffer.append(String.format(",appVer:\"%s\"", appVer.replace("\"", "\\\"")));
		buffer.append("}");
		return buffer.toString();
	}
	
	/**
	 * @return the primitive
	 */
	public final String getPrimitive() {
		return primitive;
	}

	/**
	 * @return the lang
	 */
	public final String getLang() {
		return lang;
	}

	/**
	 * @return the encPwd
	 */
	public final String getEncPwd() {
		return encPwd;
	}

	/**
	 * @return the osName
	 */
	public final String getOsName() {
		return osName;
	}

	/**
	 * @return the osVersion
	 */
	public final String getOsVersion() {
		return osVersion;
	}

	/**
	 * @return the groupCd
	 */
	public final String getGroupCd() {
		return groupCd;
	}

	/**
	 * @return the deviceModel
	 */
	public final String getDeviceModel() {
		return deviceModel;
	}

	/**
	 * @return the mdn
	 */
	public final String getMdn() {
		return mdn;
	}

	/**
	 * @return the authKey
	 */
	public final String getAuthKey() {
		return authKey;
	}

	/**
	 * @return the companyCd
	 */
	public final String getCompanyCd() {
		return companyCd;
	}

	/**
	 * @return the appId
	 */
	public final String getAppId() {
		return appId;
	}

	/**
	 * @return the appVer
	 */
	public final String getAppVer() {
		return appVer;
	}

	
	public ToktokAuthParameter(HttpServletRequest request){
		primitive = request.getParameter("primitive");
		lang = request.getParameter("lang");
		encPwd = request.getParameter("encPwd");
		osName = request.getParameter("osName");
		osVersion = request.getParameter("osVersion");
		groupCd = request.getParameter("groupCd");
		deviceModel = request.getParameter("deviceModel");
		mdn = request.getParameter("mdn");
		authKey = request.getParameter("authKey");
		companyCd = request.getParameter("companyCd");
		appId = request.getParameter("appId");
		appVer = request.getParameter("appVer");
	}
}
