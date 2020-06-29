<%@ page contentType="text/html;charset=UTF-8" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title></title>
		<style type="text/css" media="screen">
		.Flajaxian_FileBox
		{
			font-family:Arial,Verdana,sans-serif;
			font-size:12px;
			z-index:900;
			position:absolute;
			left:0px;
			top:0px;
			background-color:White;
			display:none;
		}
		.Flajaxian_FileBoxHeader
		{
			width:250px;
			height:16px;
			border:solid 1px #C8C8C8;
		}
		.Flajaxian_FileBoxHeaderText
		{
			float:right;
			width:230px;
			text-align:center
		}
		.Flajaxian_FileBoxHeaderArrowHolder
		{
			float:left;
			width:16px;
			cursor:pointer;
		}
		.Flajaxian_FileBoxFileList
		{
			width:250px;
			height:200px;
			overflow:auto;
			border-left:solid 1px #C8C8C8;
			border-right:solid 1px #C8C8C8;
			border-bottom:solid 1px #C8C8C8;
		}
		.Flajaxian_FileBoxFileListRow
		{
			float:left;
			width:230px;
			padding-left:2px;
			text-align:left;
		}
		.Flajaxian_FileBoxFileListRow:hover
		{
			background-color:#FFC;	
		}
		.Flajaxian_FileBoxFileListRowError
		{
			float:left;
			width:230px;
			padding-left:2px;
			background-color:#F66;
			text-align:left;
		}
		.Flajaxian_FileBoxFileListRowUploading
		{
			float:left;
			width:230px;
			padding-left:2px;
			background-color:#FFC;
			text-align:left;
		}
		.Flajaxian_FileBoxFileListRowUploaded
		{
			float:left;
			width:230px;
			padding-left:2px;
			color:#999;
			text-align:left;
		}
		.Flajaxian_FileBoxFileListRowCloseBtn
		{
			float:left;
			width:16px;
			padding-right:2px;
			cursor:pointer;
		}
		#FileUploader1 {visibility:hidden}
		
		ul { margin: 0; padding: 0;}
		li { padding:10px 0; list-style:none; border-top: 1px solid #ccc;}
		li:first-child { border-top:none;}
		div { margin-top:20px; text-align: center;}
		
		</style>
	</head>
	<body>
		<form:form name="fileUpload" method="POST" action="fileUpload.do" enctype="multipart/form-data" modelAttribute="uploadForm">
			<ul>
				<li><input type="file" name="files" value=''></li>
			</ul>
			<div>
				<input type='submit' value='업로드'>
			</div>
		</form:form>
	</body>
</html>