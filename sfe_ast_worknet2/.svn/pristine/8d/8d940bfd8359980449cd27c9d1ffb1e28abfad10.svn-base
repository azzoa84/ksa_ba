package fingersales.common.util;

import java.lang.reflect.Array;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.springframework.http.MediaType;

/**
 * @author multic
 *	객체 데이터를 문자열로 표현하기 위한 추상클래스.
 *	세부 표현 서식을 설정하는 메소드를 구현해 사용하도록 한다.
 */
public abstract class AbstractDataEncoder {
	protected enum CodeBlockType{
		ObjectBlcok,
		ArrayBlock
	}
	
	protected final static String FMT_OBJ_KEY = "${OBJ_KEY}$";
	protected final static String FMT_OBJ_VALUE = "${OBJ_VALUE}$";
	protected final static String FMT_ARR_ITEM = "${ARR_ITEM}$";
	
	private static List<AbstractDataEncoder> encoders = new ArrayList<AbstractDataEncoder>();
	
	private final List<Class<?>> primitiveWrappers = new ArrayList<Class<?>>(){
		private static final long serialVersionUID = 5879563143393373308L;
		{
			super.add(Boolean.class);
			super.add(Byte.class);
			super.add(Character.class);
			super.add(Short.class);
			super.add(Integer.class);
			super.add(Long.class);
			super.add(Float.class);
			super.add(Double.class);
			super.add(String.class);
		}
	};
	
	/**
	 *	생성자 - 객체가 생성될 때 클래스 static 리스트에 현재 객체의 인스턴스를 추가한다. 
	 */
	public AbstractDataEncoder(){
		encoders.add(this);
	}
	
	/**	지정된 클래스가 Primitive 또는 Primitive의 박싱 클래스이거나 문자열인 경우 값 타입의 클래스라고 판단하는 메소드
	 * @param cls	판단할 클래스
	 * @return		판단결과
	 */
	private boolean isValueType(Class<?> cls){
		return cls.isPrimitive() || primitiveWrappers.contains(cls);
	}
	
	/**	생성되어 리스트에 등록된 데이터인코더의 인스턴스중 지정한 타입과 일치하는 첫번째 인스턴스를 를 획득한다.
	 * @param type	인코더 타입
	 * @return		데이터 인코더 인스턴스
	 */
	public static AbstractDataEncoder getEncoder(String type){
		for(AbstractDataEncoder enc : encoders){
			if(enc.getMediaType().getSubtype().toLowerCase(Locale.US).equals(type)) return enc;
		}
		return null;
	}
	
	/**	응답 데이터의 컨텐츠 타입 문자열을 리턴
	 * @return	컨텐츠 타입 문자열
	 */
	public String getContentType(){
		return getMediaType().toString();
	}
	
	
	/**	객체 인코딩 메소드
	 * @param obj	데이터 객체
	 * @return		객체를 응답 데이터 타입으로 인코딩 한 문자열
	 */
	public String encode(Object obj){
		return String.format("%s%s%s", getResultHeader(), parseObject(obj, 0), getResultTail());
	}
	
	/**	객체를 문자열로 변환
	 * @param obj	변환할 객체
	 * @return		객 문자열
	 */
	private String parseObject(Object obj, int depth){
		StringBuffer sbResult = new StringBuffer();
		if(depth >= 16){
			return "";
		}
		if(obj == null){
			return getNullObjectString();
		}else if(Map.class.isAssignableFrom(obj.getClass())){
			sbResult.append(parseMap((Map<?, ?>)obj, depth + 1));
		}else if(List.class.isAssignableFrom(obj.getClass())){
			sbResult.append(parseArray(((List<?>)obj).toArray(), depth + 1));
		}else if(obj.getClass().isArray()){
			int arrSize = Array.getLength(obj);
			ArrayList<Object> arrList = new ArrayList<Object>();
			for(int ii = 0; ii < arrSize; ii++){
				arrList.add(Array.get(obj, ii));
			}
			sbResult.append(parseArray(arrList.toArray(), depth + 1));
		}else if(isValueType(obj.getClass())){
			sbResult.append(getValueEscapeString(obj));
		}else{
			sbResult.append(parseClass(obj, depth + 1));
		}
		return sbResult.toString();
	}

	/**	맵을 규격화 된 문자열로 변환
	 * @param src	데이터를 포함한 맵
	 * @return		정형화 된 서식 문자열
	 */
	private String parseMap(Map<?, ?> src, int depth){
		boolean isFirst = true;
		Set<?> keySet = src.keySet();
		StringBuffer sbResult = new StringBuffer();
		sbResult.append(getWrapOpenString(CodeBlockType.ObjectBlcok));
		for(Object key : keySet){
			if(!isFirst) sbResult.append(getItemSplitString());
			sbResult.append(
					getObjFormatString()
					.replace(FMT_OBJ_KEY, key.toString())
					.replace(FMT_OBJ_VALUE, parseObject(src.get(key), depth + 1))
			);
			isFirst = false;
		}
		sbResult.append(getWrapCloseString(CodeBlockType.ObjectBlcok));
		return sbResult.toString();
	}

	/**	배열을 정형화 된 문자열로 변환
	 * @param src	배열 데이터
	 * @return		정형화 된 서식 문자열
	 */
	private String parseArray(Object[] src, int depth){
		StringBuffer sbResult = new StringBuffer();
		sbResult.append(getWrapOpenString(CodeBlockType.ArrayBlock));
		for(int ii = 0; ii < src.length; ii++){
			if(ii > 0) sbResult.append(getItemSplitString());
			sbResult.append(getArrayItemFormatString().replace(FMT_ARR_ITEM, parseObject(src[ii], depth + 1)));
		}
		sbResult.append(getWrapCloseString(CodeBlockType.ArrayBlock));
		return sbResult.toString();
	}
	
	private boolean validReturnType(Class<?> type){
		if(type.isArray()){
			return true;
		}else if(void.class.equals(type)){
			return false;
		}else if(Class.class.isAssignableFrom(type)){
			return false;
		}else if(primitiveWrappers.contains(type)){
			return true;
		}else if(Map.class.isAssignableFrom(type)){
			return true;
		}else if(List.class.isAssignableFrom(type)){
			return true;
		}else if(type.isPrimitive()){
			return true;
		}else if(type.isEnum()){
			return true;
		}
		return false;
	}
	
	/**	클래스를 정형화된 문자열로 변환
	 * @param obj	변환할 객체
	 * @return		정형화 된 서식 문자열
	 */
	private String parseClass(Object obj, int depth){
		StringBuffer sbResult = new StringBuffer();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		sbResult.append(getWrapOpenString(CodeBlockType.ObjectBlcok));
		
		
		for(Method getter : obj.getClass().getMethods()){
			if(getter.getName().startsWith("get") && getter.getParameterTypes().length == 0){
				String name = "";
				Object result = null;
				
				try{
					name = String.format("%s%s", getter.getName().substring(3, 4).toLowerCase(), getter.getName().substring(4));
					result = getter.invoke(obj);
					if(result == null || validReturnType(result.getClass())){
						resultMap.put(name, result);
					}
					
				}catch(Exception ex){ex.printStackTrace();}
			}
		}
		
		int ii = 0;
		for(String key : resultMap.keySet()){
			if(ii > 0){
				sbResult.append(getItemSplitString());
			}
			sbResult.append(
					getObjFormatString()
					.replace(FMT_OBJ_KEY, key)
					.replace(FMT_OBJ_VALUE, parseObject(resultMap.get(key), depth + 1))
			);
			ii++;
		}

		sbResult.append(getWrapCloseString(CodeBlockType.ObjectBlcok));
		return sbResult.toString();
	}
	
	/**	데이터 출력형식의 MediaType 인스턴스를 리턴
	 * @return	MediaType
	 */
	protected abstract MediaType getMediaType();
	
	/**	
	 * @return	데이터 인코드 결과 문자열의 앞부분 고정 내용
	 */
	protected abstract String getResultHeader();
	
	/**
	 * @return	데이터 인코드 결과 문자열의 뒷부분 고정 내용
	 */
	protected abstract String getResultTail();
	
	/**	
	 * @return	NULL 참조를 표현하는 문자열
	 */
	protected abstract String getNullObjectString();
	
	/**	데이터 블록의 시작을 표시하는 문자열을 리턴하는 메소드
	 * @param type	데이터 타입
	 * @return		블록의 시작을 나타내는 문자열
	 */
	protected abstract String getWrapOpenString(CodeBlockType type);
	
	/**	데이터 블록의 끝을 표시하는 문자열을 리턴하는 메소드
	 * @param type	데이터 타입
	 * @return		블록의 끝을 나타내는 문자열
	 */
	protected abstract String getWrapCloseString(CodeBlockType type);
	
	/**	값형태 객체를 원하는 인코딩 타임의 이스케이프 문자열로 변환한다.
	 * @param obj	문자열로 변환할 값 객체
	 * @return		객체를 표현한 문자열
	 */
	protected abstract String getValueEscapeString(Object obj);
	
	/**	데이터 항목간의 구분구역을 나타내는 문자열
	 * @return
	 */
	protected abstract String getItemSplitString();
	
	/**	객체 타입을 표현하는 문자열의 서식
	 * @return
	 */
	protected abstract String getObjFormatString();
	
	/**	배열 항목을 표현하는 문자열의 서식
	 * @return
	 */
	protected abstract String getArrayItemFormatString();
}
