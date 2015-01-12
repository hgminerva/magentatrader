jQuery(function($){
	/* =====   home diamonds image hover ===== */
	$('.perfect_diamond ul li[data-roll-top]').hover(function(){
		t = $(this);
		t.closest('.section_content').find('.top_view img').attr('src', t.attr('data-roll-top')).css({display:'none'}).fadeIn(400);	
	});
	$('.perfect_diamond ul li a[data-roll-side]').hover(function(){
		t = $(this);
		t.closest('.section_content').find('.side_view img').attr('src', t.attr('data-roll-side')).css({display:'none'}).fadeIn(400);
	});
	
	// insert slider diamonds
	$('.perfect_diamond ul').append('<div id="dslide"></div>');
	
	// initially reset
	var left = $('.perfect_diamond ul li:first-child a').parent().position().left;
	var width = $('.perfect_diamond ul li:first-child a').width();
	var top = $('.perfect_diamond ul li:first-child a').parent().position().top;
	
	var vleft = $('.visible-xs .perfect_diamond ul li:first-child a').parent().position().left;
	var vwidth = $('.visible-xs .perfect_diamond ul li:first-child a').width();
	var vtop = $('.visible-xs .perfect_diamond ul li:first-child a').parent().position().top;
	
	//$('#dslide').css({'left' : left, 'width' : width,});
	$('#dslide').css({'left' : left, 'width' : width, 'top' : top + 15});
	$('#dslide').css({'left' : vleft  + 40, 'width' : vwidth, 'top' : vtop + 15});
	// sliding
	$('.perfect_diamond ul li a').hover(function(){
	   
		var left = $(this).parent().position().left;
		var width = $(this).width();
		var top  = $(this).parent().position().top;
				
		$('#dslide').stop().animate({
			'left' : left,
			'width' : width,
			'top' : top + 15,				
		});					
	});
	$('.visible-xs  .perfect_diamond ul li a').hover(function(){
	   
		var vleft = $(this).parent().position().left;
		var vwidth = $(this).width();
		var vtop  = $(this).parent().position().top;
				
		$('.visible-xs #dslide').stop().animate({
			'left' : vleft + 40,
			'width' : vwidth,
			'top' : vtop + 15,				
		});					
	});
	$('.perfect_diamond ul li').hover(function(){
		$( ".perfect_diamond ul li .diamond_shapes" ).removeClass( "active" );	
	});
	
});