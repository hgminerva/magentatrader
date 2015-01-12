jQuery(function($){
	$('.mainImg').loupe();
	$('.product_images li[data-rollover]').click(function(){
		t = $(this);
		t.closest('.product_images').find('.mainImg').attr('src', t.attr('data-rollover')).css({display:'none'}).fadeIn(200);
	});
	
    $('.match .mitem').hover(function() {
        $(this).find('.mdetails').stop(true, true).slideDown("fast").fadeIn("fast");
    }, function() {
        $(this).find('.mdetails').slideUp("fast").fadeOut("fast");
    });
	
    var config = {
      '.ptype'           : {width:"100%"},
      '.chosen-select-deselect'  : {allow_single_deselect:true},
      '.chosen-select-no-single' : {disable_search_threshold:10},
      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }
	
	//Tabs
	$( "#ishowcase-tabs" ).tabs();
	
	// insert slider
	$('.itabs ul').append('<div id="islide"></div>');
	
	// initially reset
	var left = $('.itabs ul li:first-child a').parent().position().left;
	var width = $('.itabs ul li:first-child a').width();
	$('#islide').css({'left' : left, 'width' : width});
	
	// sliding
	$('.itabs ul li a').hover(function(){
	   
		var left = $(this).parent().position().left;
		var width = $(this).width();
		
		$('#islide').stop().animate({
			'left' : left,
			'width' : width
		});
	});
});