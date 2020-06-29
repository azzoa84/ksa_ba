function Pagination(){
	
	var self = this;
	self.numPerPageGroup = 10;
	self.currentPage = 1;
	self.template = '<div class="paginate wrapper"><ul></ul></div>';
	
	self.init = function(container, totalRow, rowPerPage, callback){
		self.container = container
		self.totalRow = totalRow;
		self.rowPerPage = rowPerPage;
		self.callback = callback;
		var pageCnt = 0;
		
		if(totalRow > 0 && totalRow % rowPerPage == 0 ){
			pageCnt = parseInt(totalRow / rowPerPage);
		}else if(totalRow == 0 && totalRow % rowPerPage == 0){
			pageCnt = 1;
		}else{
			pageCnt = parseInt(totalRow / rowPerPage + 1);
		}
		self.pageCnt = pageCnt;
		
		self.movePageGroup(1);
		self.select(1, true);
		
	}
	
	self.movePageGroup = function(startIndex){
		
		var pageGroupNum = parseInt(startIndex / self.numPerPageGroup + 1);
		
		$('#'+self.container).html('');
		$('#'+self.container).html(self.template);
		
		var ul = $('#'+self.container+' .paginate ul');
		ul.append('<li><a class="prev">&lang;</a></li>');
		ul.append('<li><a>'+startIndex.toString()+'</a></li>');
		for(var i=startIndex; i<self.pageCnt && i<(self.numPerPageGroup*pageGroupNum) ; i++){
			ul.append('<li><a>'+ (i+1).toString() +'</a></li>');
		}
		ul.append('<li><a class="next">&rang;</a></li>');
		
		self.bindEvent($('#'+self.container+' .paginate a'));
	}
	
	self.bindEvent = function(elements){
		elements.click(function(){
			
			if($(this).hasClass('prev')){
				if(self.currentPage > 1 && (self.currentPage-1) % self.numPerPageGroup == 0){
					self.movePageGroup(self.currentPage - self.numPerPageGroup);
					self.select(self.currentPage - 1);
					return;
				}
				
				if(self.currentPage > 1){
					self.select(self.currentPage - 1);
				}else if(self.currentPage == 1){
					self.select(1, true);
				}
				return;
			}
			
			if($(this).hasClass('next')){
				
				if(self.currentPage % self.numPerPageGroup == 0 && self.currentPage < self.pageCnt){
					self.movePageGroup(self.currentPage + 1);
					self.select(self.currentPage + 1);
					return;
				}
				
				if(self.currentPage < self.pageCnt){
					self.select(self.currentPage + 1);
				}else if(self.currentPage == self.pageCnt){
					self.select(self.pageCnt, true);
				}
				
				return;
			}
			
			
			self.select(parseInt($(this).text()));
			
		});
	}
	
	
	
	self.select = function(pageNum, ignoreCallback){
		$('#'+self.container+' .paginate a').removeClass('active');
		var element = $('#'+self.container+' .paginate a').filter(function(index) { 
			return $(this).text() === pageNum.toString(); 
		});
		element.addClass('active');
		self.currentPage = parseInt(element.text());
		
		if(ignoreCallback == undefined || ignoreCallback == false){
			if(self.callback){
				self.callback(element.text());
			}
		}
		
		
	}
	 
	
}