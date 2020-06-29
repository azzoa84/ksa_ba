package fingersales.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Repository;

import com.ibatis.sqlmap.client.SqlMapClient;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import fingersales.common.util.AbstractDataEncoder;
import fingersales.common.util.JSONDataEncoder;

@Repository("commonDAO")
public class CommonDAO extends EgovAbstractDAO implements ApplicationContextAware{
	ApplicationContext appCtx;
	private final Map<String, SqlMapClientTemplate> templates = new HashMap<String, SqlMapClientTemplate>(); 
	private AbstractDataEncoder encoder = new JSONDataEncoder();
	static Log log = LogFactory.getLog(CommonDAO.class);
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		SqlMapClientTemplate tplInstance;
		Map<String, SqlMapClient> clients;
		this.appCtx = applicationContext;
		boolean isFirst = true;
		
		clients = appCtx.getBeansOfType(SqlMapClient.class);
		for(String key : clients.keySet()){
			SqlMapClient client = clients.get(key);
			tplInstance = new SqlMapClientTemplate();
			tplInstance.setSqlMapClient(client);
			if(isFirst) super.setSqlMapClient(client);
			templates.put(key, tplInstance);
			isFirst = false;
		}
	}
	
	public final SqlMapClientTemplate getSqlMapClientTemplate(String key){
		if(templates.containsKey(key)){
			return templates.get(key);
		}else{
			return getSqlMapClientTemplate();
		}
	}
    
	/**
     * 입력 처리 SQL mapping 을 실행한다.
     * 
     * @param queryId - 입력 처리 SQL mapping 쿼리 ID
     * @param parameterObject - 입력 처리 SQL mapping 입력 데이터를 세팅한 파라메터 객체(보통 VO 또는 Map)
     * @return 입력 시 selectKey 를 사용하여 key 를 딴 경우 해당 key
     */
    public Object insert(String queryId, Object parameterObject, boolean logging) {
    	if(logging){
    		log.info(String.format("INSERT Query executed: %s", queryId));
    		log.info(String.format("INSERT Parameter: %s", encoder.encode(parameterObject)));
    	}
    	return getSqlMapClientTemplate().insert(queryId, parameterObject);
    }	
	
    /**
     * 입력 처리 SQL mapping 을 실행한다.
     * 
     * @param queryId - 입력 처리 SQL mapping 쿼리 ID
     * @param parameterObject - 입력 처리 SQL mapping 입력 데이터를 세팅한 파라메터 객체(보통 VO 또는 Map)
     * @return 입력 시 selectKey 를 사용하여 key 를 딴 경우 해당 key
     */
    public Object insert(String DAO, String queryId, Object parameterObject) {
    	return getSqlMapClientTemplate(DAO).insert(queryId, parameterObject);
    }

    /**
     * 입력 처리 SQL mapping 을 실행한다.
     * 
     * @param queryId - 입력 처리 SQL mapping 쿼리 ID
     * @param parameterObject - 입력 처리 SQL mapping 입력 데이터를 세팅한 파라메터 객체(보통 VO 또는 Map)
     * @return 입력 시 selectKey 를 사용하여 key 를 딴 경우 해당 key
     */
    public Object insert(String DAO, String queryId, Object parameterObject, boolean logging) {
    	if(logging){
    		log.info(String.format("INSERT Query executed: %s", queryId));
    		log.info(String.format("INSERT Parameter: %s", encoder.encode(parameterObject)));
    	}
    	return getSqlMapClientTemplate(DAO).insert(queryId, parameterObject);
    }

    /**
     * 수정 처리 SQL mapping 을 실행한다.
     * 
     * @param queryId - 수정 처리 SQL mapping 쿼리 ID
     * @param parameterObject - 수정 처리 SQL mapping 입력 데이터(key 조건 및 변경 데이터)를 세팅한 파라메터 객체(보통 VO 또는 Map)
     * @return DBMS가 지원하는 경우 update 적용 결과 count
     */
    public int update(String DAO, String queryId, Object parameterObject) {
        return getSqlMapClientTemplate(DAO).update(queryId, parameterObject);
    }

    /**
     * 삭제 처리 SQL mapping 을 실행한다.
     * 
     * @param queryId - 삭제 처리 SQL mapping 쿼리 ID
     * @param parameterObject - 삭제 처리 SQL mapping 입력 데이터(일반적으로 key 조건)를 세팅한 파라메터 객체(보통 VO 또는 Map)
     * @return DBMS가 지원하는 경우 delete 적용 결과 count
     */
    public int delete(String DAO, String queryId, Object parameterObject) {
        return getSqlMapClientTemplate(DAO).delete(queryId, parameterObject);
    }

    /**
     * pk 를 조건으로 한 단건조회 처리 SQL mapping 을 실행한다.
     * 
     * @param queryId - 단건 조회 처리 SQL mapping 쿼리 ID
     * @param parameterObject - 단건 조회 처리 SQL mapping 입력 데이터(key)를 세팅한 파라메터 객체(보통 VO 또는 Map)
     * @return 결과 객체 - SQL mapping 파일에서 지정한 resultClass/resultMap 에 의한 단일 결과 객체(보통 VO 또는 Map)
     */
    public Object selectByPk(String DAO, String queryId, Object parameterObject) {
        return getSqlMapClientTemplate(DAO).queryForObject(queryId, parameterObject);
    }

    /**
     * 리스트 조회 처리 SQL mapping 을 실행한다.
     * 
     * @param queryId - 리스트 조회 처리 SQL mapping 쿼리 ID
     * @param parameterObject - 리스트 조회 처리 SQL mapping 입력 데이터(조회 조건)를 세팅한 파라메터 객체(보통 VO 또는 Map)
     * @return 결과 List 객체 - SQL mapping 파일에서 지정한 resultClass/resultMap 에 의한 결과 객체(보통 VO 또는 Map)의 List
     */
    @SuppressWarnings("rawtypes")
	public List list(String DAO, String queryId, Object parameterObject) {
        return getSqlMapClientTemplate(DAO).queryForList(queryId, parameterObject);
    }

    /**
     * 부분 범위 리스트 조회 처리 SQL mapping 을 실행한다. 
     * (부분 범위 - pageIndex 와 pageSize 기반으로 현재 부분 범위 조회를 위한 skipResults, maxResults 를 계산하여 ibatis 호출)
     * 
     * @param queryId - 리스트 조회 처리 SQL mapping 쿼리 ID
     * @param parameterObject - 리스트 조회 처리 SQL mapping 입력 데이터(조회 조건)를  세팅한 파라메터 객체(보통 VO 또는 Map)
     * @param pageIndex - 현재 페이지 번호
     * @param pageSize - 한 페이지 조회 수(pageSize)
     * @return 부분 범위 결과 List 객체 - SQL mapping 파일에서 지정한 resultClass/resultMap 에 의한 부분 범위 결과 객체(보통 VO 또는 Map) List
     */
    @SuppressWarnings("rawtypes")
	public List listWithPaging(String DAO, String queryId, Object parameterObject, int pageIndex, int pageSize) {
        int skipResults = pageIndex * pageSize;
        int maxResults = pageSize;
        return getSqlMapClientTemplate(DAO).queryForList(queryId, parameterObject, skipResults, maxResults);
    }	
	
}
