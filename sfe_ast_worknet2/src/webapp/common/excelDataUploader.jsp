<%@ page contentType="text/html;charset=UTF-8" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<script src="../fingerPlatform/library/jquery-1.10.2.min.js"></script>
		<title></title>
		<style type="text/css" media="screen">
			
			body {
				font-size: 13px;
				font-family: 'Nanum Gothic',tahoma,AppleGothic,Sans-serif;
				color:#5d5d5d;
			}
			
			form ul { 
				margin: 0; 
				padding-left: 20px;
				height: 165px;
				overflow-x: hidden;
    			overflow-y: auto;
    			list-style-type: disc;
			}
			form ul li { 
				width: 100%;
				margin-bottom: 5px;
			}
			
			.no_file{
				list-style: none;
			    position: fixed;
			    left: 80px;
			    top: 80px;
			}
			.button{
				width: 130px;
				height: 28px;
			}
			
			div.search_file {
				position: absolute;
				left: 10px;
				bottom: 13px;
				background-color: #fff;
				border: 1px solid #666;
				color: #666;
				line-height: 1em;
				cursor: pointer;
				box-sizing: border-box;
				text-align: center;
				padding-top: 5px;
			}
		
			div.submit_file {
				position: absolute;
				right: 10px;
				bottom: 13px;
				border: 1px solid #da1e48;
				color: #da1e48;
				background-color: #fff;
				line-height: 1em;
				cursor: pointer;
				box-sizing: border-box;
				padding-top: 5px;
				text-align: center;
				
			}
		
		</style>
		<script>
			jQuery(document).ready(function() 
			{
				var subCateName = parent.document.all["file_upload_sub_category"].value || '';
				jQuery('#fileCategory').val(subCateName);
				
				jQuery('.search_file').click(function() {
					jQuery('#openExcelUploader').click();
				})
				
				jQuery('#openExcelUploader').change(function() {
					jQuery('form ul').html('');
					
					if(jQuery(this).val() != '') {
						var ext = jQuery(this).val().split('.').pop().toLowerCase();
						
						if(ext != 'xlsx' && ext != 'xls')
						{
							alert('엑셀 파일만 업로드할 수 있습니다.');
							jQuery(this).val('');
							return;
						}
					}
					
					for(var i=0 ; i < this.files.length; i++) {
						jQuery('form ul').append('<li class="file">'+this.files[i].name+'</li>');
					}
				})
			})
			
			function fileUploader_upload() {
				var fileCnt = jQuery('form ul').find('.file').length;
				
				if (fileCnt == 0) {
					alert('업로드할 파일을 선택해 주시기 바랍니다.');
					return;
				}
				
				var pos = getCenterOnScreen(170, 20);
				var dispMsg = '업로드 중 입니다...';
				var	toastHTML = '<div id="toast"' + 'style="z-index:2147483647; width:150px; height:20px; display:table; left:' + pos[0] + 'px; top:' + pos[1] + 'px">' +"<img src='./fingerPlatform/images/ajax-loader.gif' style='padding-left:10px; width:32px; vertical-align: middle; display: table-cell;'/>" + "<span style='vertical-align: middle; display: table-cell;'>" + dispMsg + "<span>" + '</div>';
				
				parent.document.body.insertAdjacentHTML('beforeEnd', toastHTML);
				
				document.getElementById('fileUploadForm').submit();
			}
			
			function getCenterOnScreen(width, height)
			{
				var w_width = jQuery(parent.document).width();
				var w_heigth = jQuery(parent.document).height();

				var left = (w_width - width) / 2 + jQuery(window).scrollLeft();
				var top = (w_heigth - height) / 2 + jQuery(window).scrollTop();

				return [ left, top ];
			}
		</script>
	</head>
	<body>
		<form:form id="fileUploadForm" name="fileUpload" method="POST" action="excelUpload.do" enctype="multipart/form-data" modelAttribute="uploadForm">
			<ul>
				<li class="no_file">파일을 선택해 주세요</li>
			</ul>
			<div>
				<div class="search_file button">파일찾기</div>
				<div class="submit_file button" onclick="fileUploader_upload();">업로드</div>
			</div>
			
			<input type="hidden" id="fileCategory" name="fileCategory" value="" />
			<input id="openExcelUploader" style="display:none" type="file" name="files" value=''>
		</form:form>
	</body>
</html>