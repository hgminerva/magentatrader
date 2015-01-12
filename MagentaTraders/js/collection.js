jQuery(function($){
	
	/*Trigger*/
	$('.fTrigger span.toggle_close').click(function(){
		$('.more_options').slideToggle('slow');
		$(this).hide();
		$('.fTrigger span.toggle_open').show();
	});
	
	$('.fTrigger span.toggle_open').click(function(){
		$('.more_options').slideToggle('slow');
		$(this).hide();
		$('.fTrigger span.toggle_close').show();
	});
	
	//More Items
	$('.pagin span.more').click(function(){
		$('.pagin .more_items').slideToggle('slow');
		$(this).hide();
		$('.pagin span.less').show();
	});
	
	$('.pagin span.less').click(function(){
		$('.pagin .more_items').slideToggle('slow');
		$(this).hide();
		$('.pagin span.more').show();
	});
	$('.pagin2 span.more').click(function(){
		$('.pagin2 .more_items').slideToggle('slow');
		$(this).hide();
		$('.pagin2 span.less').show();
	});
	
	$('.pagin2 span.less').click(function(){
		$('.pagin2 .more_items').slideToggle('slow');
		$(this).hide();
		$('.pagin2 span.more').show();
	});
	
	/*Collection Items*/
    $('.items').hover(function() {
        $(this).find('.item_detailed_spec').stop(true, true).slideDown("fast").fadeIn("fast");
    }, function() {
        $(this).find('.item_detailed_spec').slideUp("fast").fadeOut("fast");
    });
	
    var config = {
      '.fselect'           : {width:"100%"},
      '.chosen-select-deselect'  : {allow_single_deselect:true},
      '.chosen-select-no-single' : {disable_search_threshold:10},
      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }
});