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
package fingersales.common.handler;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import egovframework.rte.fdl.cmmn.exception.handler.ExceptionHandler;

/**  
 * @Class Name : CommonExceptionHandler.java
 * @Description : CommonExceptionHandler Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 * 
 * @author francisco
 * @since 2009. 03.16
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class CommonExceptionHandler implements ExceptionHandler {
    protected Log log = LogFactory.getLog(this.getClass());
    
    /**
    * @param ex
    * @param packageName
    * @see francisco
    */
    public void occur(Exception ex, String packageName) {
		log.info(" ServiceExceptionHandler run...............");
		ex.printStackTrace();

		try {
			log.info(" ServiceExceptionHandler try ");
		} catch (Exception e) {
			e.printStackTrace();
		}
    }

}
