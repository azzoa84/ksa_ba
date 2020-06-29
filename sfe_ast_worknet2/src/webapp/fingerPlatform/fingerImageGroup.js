function FingerImageGroup(imgList, category) {
	var $ = this;
	$.group = imgList;
	$.groupCategory = category;
	
	$.setGroup = function(imgList, category) {
		$.group = imgList;
	};
	
	$.setGroupCategory = function(category) {
		$.groupCategory = category;
	};
	
	$.getUploadParam = function() {
		try {
			if (!$.group || $.group.length == 0)
				return;
			
			var params = {};
			var i = 0;
			var pIdx = 0;
			for (; i < $.group.length; i++) {
				if (!$.group[i].isDataUrL) 
					continue;
								
				var obj = $.group[i].getUploadParam();
				if (!obj) continue;
				
				if ($.groupCategory) {
					params[("category" + pIdx)] = $.groupCategory;
				}
				else if (obj['category']) {
					params[("category" + pIdx)] = obj['category'];
				}
				params[("image" + pIdx)] = obj['image_base64'];
				params[("image_name" + pIdx)] = obj['image_name'];
				pIdx++;
			}
			
			if (pIdx == 0) {
				return null;
			}
			return params;
			
		} catch (err) {
			console.log('FingerImageGroup getUploadParam() : ' + err.message);
		}
	};
	
	$.uploadBase64 = function(params) {
		try {
			if (!params) {
				params = $.getUploadParam();
			}
			
			if (params) {
				var rs = imageUploadBase64(params);
				return rs;
			} else {
				return null;
			}
		} catch (err) {
			console.log('FingerImageGroup uploadBase64() : ' + err.message);
		}
	};
}