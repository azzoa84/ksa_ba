package fingersales.common.util;

import org.springframework.http.MediaType;

/**	객체를 JSON 문자열로 인코딩 하기 위한 클래스.
 * 	데이터 인코더 클래스를 상속받아 JSON에 맞는 표현 서식을 구현한다.
 * @author multic
 */
public final class JSONDataEncoder extends AbstractDataEncoder{
	@Override
	protected MediaType getMediaType(){ return MediaType.APPLICATION_JSON; }
	
	@Override
	protected String getResultHeader(){ return ""; }
	
	@Override
	protected String getResultTail(){ return ""; }
	
	@Override
	protected String getNullObjectString(){ return "null"; }

	@Override
	protected String getWrapOpenString(CodeBlockType type){
		switch(type){
		case ArrayBlock:	return "[";
		case ObjectBlcok:	return "{";
		default:			return "";
		}
	}
	
	@Override
	protected String getWrapCloseString(CodeBlockType type){
		switch(type){
		case ArrayBlock:	return "]";
		case ObjectBlcok:	return "}";
		default:			return "";
		}
	}
	
	@Override
	protected String getItemSplitString(){ return ","; }
	
	@Override
	protected String getObjFormatString(){
		return String.format("\"%s\":%s", FMT_OBJ_KEY, FMT_OBJ_VALUE);
	}
	
	@Override
	protected String getArrayItemFormatString(){
		return FMT_ARR_ITEM;
	}
	
	@Override
	protected String getValueEscapeString(Object obj){
		if(Number.class.isAssignableFrom(obj.getClass())){
			return obj.toString();
		}else if(Boolean.class.isAssignableFrom(obj.getClass())){
			return obj.toString();
		}else{
			return String.format("\"%s\"", obj.toString()
					.replace("\\", "\\\\")
					.replace("\"", "\\\"")
					.replace("\t", "\\t")
					.replace("\r", "\\r")
					.replace("\n", "\\n")
					);
		}
	}

}






















