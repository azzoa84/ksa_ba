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
 * @Class Name : OthersExceptionHandler.java
 * @Description : OthersExceptionHandler Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.02.03           최초생성
 * 
 * @author francisco
 * @since 2014.02.03
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class OthersExceptionHandler implements ExceptionHandler {
    protected Log log = LogFactory.getLog(this.getClass());
    
    /**
    * @param exception
    * @param packageName
    * @see francisco
    */
    public void occur(Exception exception, String packageName) {
    	exception.printStackTrace();
		log.debug(" ServiceExceptionHandler run...............");
    }
}
