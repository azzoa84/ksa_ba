package fingersales.common.util;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import fingersales.common.model.UserModel;

/**	
 * 스프링 빈에 단축된 접근을 위한 클래스
 * @author 김영도
 * 
 */
public class ApplicationContextHolder implements ApplicationContextAware {
	private static ApplicationContext appCtx;
	
	public ApplicationContextHolder() {}
	
	@Override
	public void setApplicationContext(ApplicationContext arg0) throws BeansException {
		appCtx = arg0;
	}
	
	/**
	 * 스프링 ApplicationContext 반환
	 * @return ApplicationContext
	 */
	public static ApplicationContext getContext() {
		return appCtx;
	}

	/**
	 * 로그인 유저 정보 반환
	 * @return UserModel
	 */
	public static UserModel getUserInfo() {
		return (UserModel) SecurityContextHolder.getContext().getAuthentication().getDetails();
	}
	
	/**
	 * 로그인 유저 권한 정보 반환
	 * @return List<GrantedAuthority>
	 */
	public static List<? extends GrantedAuthority> getUserAuthorities() {
		return (List<? extends GrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();
	}
	
	/**
	 * HttpServletRequest 반환
	 * @return HttpServletRequest
	 */
	public static HttpServletRequest getRequest() {
		return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
	}
	
	/**
	 * HttpSession 반환
	 * @return HttpSession
	 */
	public static HttpSession getSession() {
		return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession(false);
	}
	
	/**
	 * Servlet Real Path 반환
	 * @return HttpSession
	 */
	public static String getServletRealPath() {
		return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession(false).getServletContext().getRealPath("");
	}	
	
	/**
	 * HttpServletResponse 반환
	 * @return HttpServletResponse
	 */
	public static final String RESPONSE_NAME_AT_ATTRIBUTES = ServletRequestAttributes.class.getName() + ".ATTRIBUTE_NAME";
	public static HttpServletResponse getResponse() {
		return (HttpServletResponse) ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getAttribute(RESPONSE_NAME_AT_ATTRIBUTES, RequestAttributes.SCOPE_REQUEST); 
	}
}
