/*
 * Copyright Schalk Neethling(ossreleasefeed) 2011
 * All code released under a MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
(function($) {
	$.fn.simplebox = function(options) {
		var wrapper = document.createElement("div"), 
		currentForm = $(this), 
		windowWidth = $(document).width(), 
		windowHeight = $(document).height(), 
		closeButton = document.createElement("a");
		
		/* 
		 * Adding ie6 and ie7 classes for CSS style fixes. Cannot be sure that the user is already 
		 * doing this so, this is simply to ensure compatibility.
		 * 
		 * Have to use browser version detection here as the fix is just for IE7 and below.
		 * Cannot find a feature that will allow for detection of IE7 except $.support.boxModel 
		 * but, then the browser needs to be in QuirksMode.
		 */
		if(jQuery.browser.version === "7.0") {			
			$("html").addClass("ie6 ie7");	
		}		
		
		$(wrapper).attr({
			"id" : "lightbox_wrapper"
		});
		
		$(wrapper).css({
			"width" : windowWidth, 
			"height" : windowHeight
		});
		
		currentForm.css({
			"position" : "absolute", 
			"top" : "25%", 
			"left" : "25%",  
			"width" : "45em", 
			"border-bottom-right-radius" : "10px", 
			"z-index" : "999999"
		});
		
		$(closeButton).attr({
			"id" : "close_lightbox", 
			"title" : "Close dialog", 
			"accesskey" : "c"
		});
		
		$(closeButton).append("close dialog");
		
		currentForm.children(":first").before(closeButton);
		/* 
		 * Because of IE, we cannot simply wrap the form with the wrapper as setting the opcaity on 
		 * the wrapper will also effect the dialog so, these need to be independant.
		 */
		$("body").append(wrapper);		
		currentForm.show();
		
		/*
		 * IE, below version 9, does not support RGBA nor HSLA so opacity needs to be done via JavaScript.
		 */
		if($.support.changeBubbles === false) {			
			$("#lightbox_wrapper").css("background-color", "#333333").fadeTo('fast', 0.5);
		}
		
		$("#close_lightbox").click(function(event) {
			event.preventDefault();
			$("#lightbox_wrapper, #close_lightbox").remove();
			currentForm.hide();
		});
	};
})(jQuery);