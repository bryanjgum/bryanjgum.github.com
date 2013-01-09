/*-----------------------------------------------------------------------------------*/
/*	Filter States
/*-----------------------------------------------------------------------------------*/

	var filterLinks = $('#filter li');
	
	filterLinks.click( function(e) {
	
		filterLinks.removeClass('active');
		
		filterLinks.not(this).find('span.border').fadeOut(100);
		
		$(this).addClass('active');
		
		e.preventDefault();
	});
	
	filterLinks.hover( function() {
		$(this).not('.active').find('.border').stop().css({
			opacity: 0,
			display: 'block'
		}).animate({
			opacity: 1
		}, 150);
			
	}, function() {
		$(this).not('.active').find('.border').stop().fadeOut(150);
	});

	
/*-----------------------------------------------------------------------------------*/
/*	Portfolio Sorting
/*-----------------------------------------------------------------------------------*/
	
	if ($().quicksand) {

		(function($) {
			
			$.fn.sorted = function(customOptions) {
				var options = {
					reversed: false,
					by: function(a) {
						return a.text();
					}
				};
		
				$.extend(options, customOptions);
		
				$data = $(this);
				arr = $data.get();
				arr.sort(function(a, b) {
		
					var valA = options.by($(a));
					var valB = options.by($(b));
			
					if (options.reversed) {
						return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
					} else {		
						return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
					}
			
				});
		
				return $(arr);
		
			};
		
		})($);
		
		$(function() {
		
			var read_button = function(class_names) {
				
				var r = {
					selected: false,
					type: 0
				};
				
				for (var i=0; i < class_names.length; i++) {
					
					if (class_names[i].indexOf('selected-') == 0) {
						r.selected = true;
					}
				
					if (class_names[i].indexOf('segment-') == 0) {
						r.segment = class_names[i].split('-')[1];
					}
				};
				
				return r;
				
			};
		
			var determine_sort = function($buttons) {
				var $selected = $buttons.parent().filter('[class*="selected-"]');
				return $selected.find('a').attr('data-value');
			};
		
			var determine_kind = function($buttons) {
				var $selected = $buttons.parent().filter('[class*="selected-"]');
				return $selected.find('a').attr('data-value');
			};
		
			var $preferences = {
				duration: 500,
				adjustHeight: 'dynamic'
			}
		
			var $list = $('.grid');
			var $data = $list.clone();
		
			var $controls = $('#filter');
		
			$controls.each(function(i) {
		
				var $control = $(this);
				var $buttons = $control.find('a');
		
				$buttons.bind('click', function(e) {
		
					var $button = $(this);
					var $button_container = $button.parent();
					
					var button_properties = read_button($button_container.attr('class').split(' '));      
					var selected = button_properties.selected;
					var button_segment = button_properties.segment;
		
					if (!selected) {
		
						$buttons.parent().removeClass();
						$button_container.addClass('selected-' + button_segment);
		
						var sorting_type = determine_sort($controls.eq(1).find('a'));
						var sorting_kind = determine_kind($controls.eq(0).find('a'));
		
						if (sorting_kind == 'all') {
							var $filtered_data = $data.find('li');
						} else {
							var $filtered_data = $data.find('li.' + sorting_kind);
						}
		
						var $sorted_data = $filtered_data.sorted({
							by: function(v) {
								return parseInt(jQuery(v).find('.count').text());
							}
						});
		
						$list.quicksand($sorted_data, $preferences, function(){ $("a[class^='prettyPhoto']").prettyPhoto(); });

						
						//console.log($sorted_data);
			
					}
			
					e.preventDefault();
					
				});
			
			}); 
			
		});
	
	}


/***********************************************************************************************************************
DOCUMENT: includes/javascript.js
DEVELOPED BY: Ryan Stemkoski
COMPANY: Zipline Interactive
EMAIL: ryan@gozipline.com
PHONE: 509-321-2849
DATE: 3/26/2009
UPDATED: 3/25/2010
DESCRIPTION: This is the JavaScript required to create the accordion style menu.  Requires jQuery library
NOTE: Because of a bug in jQuery with IE8 we had to add an IE stylesheet hack to get the system to work in all browsers. I hate hacks but had no choice :(.
************************************************************************************************************************/
$(document).ready(function() {
	 
	//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.accordionButton').click(function() {

		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('.accordionButton').removeClass('on');
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordionContent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');
			  
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		 } 
		  
	 });
	  
	
	/*** REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	//ADDS THE .OVER CLASS FROM THE STYLESHEET ON MOUSEOVER 
	$('.accordionButton').mouseover(function() {
		$(this).addClass('over');
		
	//ON MOUSEOUT REMOVE THE OVER CLASS
	}).mouseout(function() {
		$(this).removeClass('over');										
	});
	
	/*** END REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	
	/********************************************************************************************************************

	CLOSES ALL DIVS ON PAGE LOAD

	********************************************************************************************************************/	

	$("div.accordionContent").hide();

	

	/********************************************************************************************************************

	OPENS THE DIV THAT IS ASSIGNED WITH THE ID open

	********************************************************************************************************************/	

	$("#open").trigger('click');





});


/***************************************************
		FORM VALIDATION JAVASCRIPT
***************************************************/
$(document).ready(function() {
	$('form#contact_form').submit(function() {
		$('form#contact_form .error').remove();
		var hasError = false;
		$('.requiredField').each(function() {
			if(jQuery.trim($(this).val()) == '') {
            	var labelText = $(this).prev('label').text();
            	$(this).parent().append('<span class="error">You forgot to enter your '+labelText+'.</span>');
            	$(this).addClass('inputError');
            	hasError = true;
            } else if($(this).hasClass('email')) {
            	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            	if(!emailReg.test(jQuery.trim($(this).val()))) {
            		var labelText = $(this).prev('label').text();
            		$(this).parent().append('<span class="error">You entered an invalid '+labelText+'.</span>');
            		$(this).addClass('inputError');
            		hasError = true;
            	}
            }
		});
		if(!hasError) {
			$('form#contact_form input.submit').fadeOut('normal', function() {
				$(this).parent().append('');
			});
			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('form#contact_form').slideUp("fast", function() {
					$(this).before('<p class="success">Thanks! Your email was successfully sent. We will contact you as soon as possible.</p>');
				});
			});
		}

		return false;

	});
});