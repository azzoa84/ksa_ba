package fingersales.common.util;

import java.util.List;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import fingersales.common.constants.CommConst;

public class QueryResult extends EgovMap{
	private static final long serialVersionUID = 5073470731816469287L;

	public QueryResult(FingerParamMap statusCode, List<FingerParamMap> dataList){
		super();
		this.put(CommConst.ARGS_RETURN_CODE, statusCode.get(CommConst.ARGS_RETURN_CODE));
		this.put(CommConst.ARGS_RETURN_STRING, statusCode.get(CommConst.ARGS_RETURN_STRING));
		this.put(CommConst.ARGS_ERROR_MSG, statusCode.get(CommConst.ARGS_ERROR_MSG));
		this.put(CommConst.RESULT_LIST, dataList);
	}
}
