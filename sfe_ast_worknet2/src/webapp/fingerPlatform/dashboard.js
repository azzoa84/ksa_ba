/**
 * 메인대시보드 카테고리별 상단 제목 CSS
 */
function setArraySpaceBox(obj)
{	
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.background		= "#f5f5f5";
    		e.style.borderTop 		= "2px solid #da1e48";
    		e.style.borderBottom	= "1px solid #d9d9d9";
    		e.style.borderLeft		= "1px solid #e5e5e5";
    		e.style.borderRight		= "1px solid #e5e5e5";
    	}
    }
	
    delete e;
}

/**
 * 메인대시보드 카테고리별 타이틀 제목 CSS
 */
function setArraySpaceTitle(obj)
{
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.color		= "#333";
    		e.style.paddingTop 	= "5px";
    		e.style.fontSize 	= "18px";
    	}
    }	
	
    delete e;
}

/**
 * 메인대시보드 카테고리별 바깥 테두리 CSS
 */
function setArrayBorder(obj)
{
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.border		= "1px solid #AAAAAA";
    	}
    }
	
    delete e;
}


/**
 * 메인대시보드 카테고리별 풍선박스 CSS
 */
function setArrayNotice(obj, flag)
{
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		
    		if(flag == 'background')
			{
    			e.style.backgroundColor = "#F1F1F1";
    			e.style.borderRadius 	= "8px";
    			e.style.textAlign		= "center";
			}
    		else if(flag == 'subBackground')
			{
    			e.style.backgroundColor = "white";
    			e.style.borderRadius = "8px";
			}
    		else if(flag == 'title')
			{
    			e.style.backgroundColor = "#DA1E48";
    			e.style.borderRadius 	= "2px";
    			e.style.textAlign		= "center";
    			e.style.color			= "white";
    			e.style.fontSize		= "16px";
    			e.style.fontWeight		= "bold";
    			e.style.paddingTop		= "5px";
			}
    	}
    }
	
    delete e;
}

/**
 * 메인대시보드 카테고리별 풍선박스 상위 CSS
 */
function setArrayNoticeRank(obj)
{
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		
    		e.style.backgroundColor = "#395ED7";
			e.style.borderRadius 	= "2px";
			e.style.textAlign		= "center";
			e.style.color			= "white";
			e.style.fontSize		= "16px";
			e.style.fontWeight		= "bold";
			e.style.paddingTop		= "5px";
    	}
    }
	
    delete e;
}

/**
 * 메인대시보드 카테고리별 풍선박스 클리어 CSS
 */
function setClearRank(obj)
{
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		
    		e.style.backgroundColor = "#FFFFFF";
			e.style.borderRadius 	= "2px";
			e.style.textAlign		= "center";
			e.style.color			= "white";
			e.style.fontSize		= "16px";
			e.style.fontWeight		= "bold";
			e.style.paddingTop		= "5px";
    	}
    }
	
    delete e;
}

/**
 * 메인대시보드 실적 우측 하단 타이틀 CSS
 */
function setArrayProfitTitle(obj)
{	
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.background  = "#f1f1f1";
    		e.style.textAlign 	= "center";
    		e.style.border		= "1px solid #f1f1f1";
    		e.style.lineHeight	= "25px";
    		e.style.fontSize	= "14px";
    		e.style.fontWeight	= "600";
    	}
    }	
		
    delete e;
}


/**
 * 메인대시보드 실적 우측 원형 이미지 스타일 CSS
 */
function setArrayHTMLImage(obj, weight, height)
{	
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.backgroundImage 	= 'url("' + g_scriptPath + '/images/progress_bg.png")';
    		e.style.backgroundRepeat	= "no-repeat";
    		e.style.backgroundSize		= weight+"px "+ height+"px";
    	}
    }	
		
    delete e;
}

/**
 * 메인대시보드 이미지
 */
function setArrayHTMLBackgroundImage(obj, value, weight, height, callback)
{	
	
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var m = obj[i];
    		var e = document.getElementById(m.obj.id);
    		e.style.backgroundImage 	= 'url("' + g_scriptPath + '/images/'+value+'")';
    		e.style.backgroundRepeat	= "no-repeat";
    		//e.style.backgroundPosition  = "-45px -80px";
    		e.style.backgroundSize		= weight+"px "+ height+"px";
    		
    		if (callback)
    		{
    			e.style.cursor = "pointer";
    			e.onclick = (function (mov) {
    				return function() {
    					callback(mov);
    				};
    			})(m);
    		}
    		/*
    		if(link)
			{   
    			e.style.cursor = "pointer";    			
    			e.addEventListener("click", function()
				{
    				eval(link[0]+"('"+link[1]+"','"+link[2]+"','"+link[3]+"','"+link[4]+"');");    				
    			});
    			    		
			}
			*/
    	}
    }
		
    delete e;
}


/**
 * 메인대시보드 실적 우측 원형 내부 타이틀 스타일 CSS
 */
function setArrayProfitInnerTitle(obj)
{	
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.paddingTop 	= "5px";
    		e.style.fontSize	= "23px";
    		e.style.textAlign	= "center";
    	}
    }	
		
    delete e;
}


/**
 * 메인대시보드 예산 좌측 원형 내부 타이틀 스타일 CSS
 */
function setArrayBudgetCircle(obj, fontColor)
{	
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.backgroundColor = "#"+fontColor;
    		e.style.borderRadius	= "50%";
    	}
    }	
		
    delete e;
}



/**
 * 메인대시보드 글자 스타일 CSS
 */
function setArrayLabelStyle(obj, fontSize, fontColor, align, bold)
{	
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.fontWeight 		= "200";
    		e.style.verticalAlign	= "middle";    		
    		e.style.fontSize		= fontSize+"px";
    		
    		if(fontColor != null && fontColor != "") e.style.color = "#"+fontColor;
    		
    		if(align != null && align != "")	e.style.textAlign = align;
    		else								e.style.textAlign = "center";
    		
    		if(bold != null && bold != "")		e.style.fontWeight = bold;
    	}
    }	
		
    delete e;
}


/**
 * 메인대시보드 라디오박스 CSS
 */
function setArrayRadio(obj)
{
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.border		= "1px solid #E593A6";
    		e.style.textAlign	= "center";
    		e.style.paddingTop  = "3px";
    		e.style.fontSize    = "16px";
    		e.style.cursor 		= 'pointer';
    	}
    }
	
    delete e;
}

/**
 * 메인대시보드 라디오박스 Color CSS
 */
function setArrayRadioColor(obj, color, fontColor)
{
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.style.backgroundColor		= color;
    		e.style.color				= fontColor;
    	}
    }
	
    delete e;
}

/**
 * 메인대시보드 라디오박스 URL CSS
 */
function setArrayClickUrl(obj, link, target)
{
	if (obj && obj.length) 
    {
    	for (var i = 0; i < obj.length; i++) 
    	{
    		var e = document.getElementById(obj[i].id);
    		e.addEventListener("click", function()
			{
    			var host = [];
    			host.id = 'fpView';
    			
    			if (g_currentModule != null) 
				{    					
					if (g_currentModule.dashboard_radio_click != undefined) 
					{
						g_currentModule.dashboard_radio_click(link);
					}
				}
    			/*
    			if (g_container != null && host.id == 'fpView') 
    			{console.log(1);
    				if (g_container.dashboard_radio_click != undefined) 
    				{
    					g_container.dashboard_radio_click(link);
    				}
    			}
    			else if (g_popupStack && g_popupStack.has()) 
    			{console.log(2);
    				g_popupStack.get().obj.dashboard_radio_click(link);    				
    			} 
    			else 
    			{console.log(3);
    				if (g_currentModule != null) 
    				{    					
    					if (g_currentModule.dashboard_radio_click != undefined) 
    					{
    						g_currentModule.dashboard_radio_click(link);
    					}
    				}
    			}    */				
			});
    	}    	
    }
	
    delete e;
    return target;
}






