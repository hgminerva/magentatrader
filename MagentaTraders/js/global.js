jQuery(function($){

	$(".cl-vnavigation li").click(function(){
		//if(('.parent').hasClass('open')){
		//	('.parent').hasClass('');
		//}
		//else{			
		//}
	});
	      /*Collapse sidebar*/
	$("#sidebar-collapse").click(function () {
          toggleSideBar();
      });
	        /*Small devices toggle*/
      $(".cl-toggle").click(function(e){
        var ul = $(".cl-vnavigation");
          ul.slideToggle(300, 'swing', function () {
        });
          
        e.preventDefault();
      });
      function toggleSideBar(_this){
        var b = $("#sidebar-collapse")[0];
        var w = $("#cl-wrapper");       
        
        if(w.hasClass("sb-collapsed")){
        
          $(".fa",b).addClass("fa-angle-left").removeClass("fa-angle-right");
          w.removeClass("sb-collapsed");
		  /*$(w).css({width:' 216px'});*/
          
        }else{
        
          $(".fa",b).removeClass("fa-angle-left").addClass("fa-angle-right");
          w.addClass("sb-collapsed");
         /*$(w).css({width:'50px'});*/
        }
      }
      
      function updateHeight(){
        if(!$("#cl-wrapper").hasClass("fixed-menu")){
          var button = $("#cl-wrapper .collapse-button").outerHeight();
          var navH = $("#head-nav").height();
          var cont = $("#pcont").height();
          var sidebar = ($(window).width() > 755 && $(window).width() < 963)?0:$("#cl-wrapper .menu-space .content").height();
          var windowH = $(window).height();
          
          if(sidebar < windowH && cont < windowH){
            if(($(window).width() > 755 && $(window).width() < 963)){
              var height = windowH;
            }else{
              var height = windowH - button - navH;
            }
          }else if((sidebar < cont && sidebar > windowH) || (sidebar < windowH && sidebar < cont)){
            var height = cont + button + navH;
          }else if(sidebar > windowH && sidebar > cont){
            var height = sidebar + button;
          }  
          
          $("#cl-wrapper .menu-space").css("min-height",height);
          
        }else{
          
          $("#cl-wrapper .nscroller").nanoScroller({ preventPageScrolling: true });
          
        }
      }
        
  return {
   
    init: function (options) {
      //Extends basic config with options
      $.extend( config, options );
      
      /*VERTICAL MENU*/
      $(".cl-vnavigation li ul").each(function(){
        $(this).parent().addClass("parent");
      });
      
      $(".cl-vnavigation li ul li.active").each(function(){
        $(this).parent().show().parent().addClass("open");
      });
      
      $(".cl-vnavigation").delegate(".parent > a","click",function(e){
      
        $(".cl-vnavigation .parent.open > ul").not($(this).parent().find("ul")).slideUp(300, 'swing',function(){
           $(this).parent().removeClass("open");
        });
        
        var ul = $(this).parent().find("ul");
        ul.slideToggle(300, 'swing', function () {
          var p = $(this).parent();
          
          if(p.hasClass("open")){
            p.removeClass("open");
          }else{
            p.addClass("open");
          }

         $("#cl-wrapper .nscroller").nanoScroller({ preventPageScrolling: true });
         
        });
        
        e.preventDefault();
      });
      
      if($("#cl-wrapper").hasClass("fixed-menu")){
        var scroll =  $("#cl-wrapper .menu-space");
        scroll.addClass("nano nscroller");
 
        function update_height(){
          var button = $("#cl-wrapper .collapse-button");
          var collapseH = button.outerHeight();
          var navH = $("#head-nav").height();
          var height = $(window).height() - ((button.is(":visible"))?collapseH:0) - navH;
          scroll.css("height",height);
          $("#cl-wrapper .nscroller").nanoScroller({ preventPageScrolling: true });
        }
        
        $(window).resize(function() {
          update_height();
        });    
            
        update_height();
        $("#cl-wrapper .nscroller").nanoScroller({ preventPageScrolling: true });
        
      }
      
      /*SubMenu hover */
        var tool = $("<div id='sub-menu-nav' style='position:fixed;z-index:9999;'></div>");
        
        function showMenu(_this, e){
          if(($("#cl-wrapper").hasClass("sb-collapsed") || ($(window).width() > 755 && $(window).width() < 963)) && $("ul",_this).length > 0){   
            $(_this).removeClass("ocult");
            var menu = $("ul",_this);
            if(!$(".dropdown-header",_this).length){
              var head = '<li class="dropdown-header">' +  $(_this).children().html()  + "</li>" ;
              menu.prepend(head);
            }
            
            tool.appendTo("body");
            var top = ($(_this).offset().top + 8) - $(window).scrollTop();
            var left = $(_this).width();
            
            tool.css({
              'top': top,
              'left': left + 8
            });
            tool.html('<ul class="sub-menu">' + menu.html() + '</ul>');
            tool.show();
            
            menu.css('top', top);
          }else{
            tool.hide();
          }
        }

        $(".cl-vnavigation li").hover(function(e){
          showMenu(this, e);
        },function(e){
          
          tool.removeClass("over");
          setTimeout(function(){
            if(!tool.hasClass("over") && !$(".cl-vnavigation li:hover").length > 0){
              tool.hide();
            }
          },500);
        });
        
        tool.hover(function(e){
          $(this).addClass("over");
        },function(){
          $(this).removeClass("over");
          setTimeout(function(){
            if(!tool.hasClass("over") && !$(".cl-vnavigation li:hover").length > 0){
              tool.fadeOut("fast");
            }
          },500);
        });
        
        
        $(document).click(function(){
          tool.hide();
        });
        $(document).on('touchstart click', function(e){
          tool.fadeOut("fast");
        });
        
        tool.click(function(e){
          e.stopPropagation();
        });
     
        $(".cl-vnavigation li").click(function(e){
          if((($("#cl-wrapper").hasClass("sb-collapsed") || ($(window).width() > 755 && $(window).width() < 963)) && $("ul",this).length > 0) && !($(window).width() < 755)){
            showMenu(this, e);
            e.stopPropagation();
          }
        });
    },
      
    /*Pages Javascript Methods*/

     
    toggleSideBar: function(){
      toggleSideBar();
    },
  };

	
	$("html").niceScroll({scrollspeed:"40"});
	
	//Top Animation
	var animationDelay = 8000;
	var offset = 200;
		
	function ishowcase(ani) {
		setTimeout(function(){
			$(ani).animate({
				opacity: "100",
			}, animationDelay);
		},$(ani).index() * offset)
	}
	
	$(".top_nav .left ul li").each(function(){
		ishowcase(this);
	})
	
	//Top Cart
	$('.top_cart a').hover(function() {
		$('.cart_items').fadeIn();
	});
	$(document).on('click', '.cclose', function() {
		$('.cart_items').fadeOut();
	});
	
	/* =====   Navigation ===== */
    $('.navigation li').hover(function() {
        $(this).find('.sub').stop(true, true).slideDown("slow").fadeIn("fast");
    }, function() {
        $(this).find('.sub').slideUp("slow").fadeOut("fast");
    });
	
    $('.child li').hover(function() {
        $('.child li').removeClass("active");
        $(this).addClass("active");
    });
	
	/*Children Tabs*/
    $('.child li a.ring_styles').hover(function() {
        $('.children div').removeClass("active");
        $('.children div#center_shapes').fadeOut(200);
        $('.children div#gems_stone_rings').fadeOut(200);
        $('#ring_styles').fadeIn(200).addClass("active");
    });
    $('.child li a.center_shapes').hover(function() {
        $('.children div').removeClass("active");
        $('.children div#ring_styles').fadeOut(200);
        $('.children div#gems_stone_rings').fadeOut(200);
        $('#center_shapes').fadeIn(200).addClass("active");
    });
    $('.child li a.gems_stone_rings').hover(function() {
        $('.children div').removeClass("active");
        $('.children div#ring_styles').fadeOut(200);
        $('.children div#center_shapes').fadeOut(200);
        $('#gems_stone_rings').fadeIn(200).addClass("active");
    });
	
	/*Image Swap*/
	$('.dd_item img').on('mouseenter mouseout', function(){
       var original = $(this).attr('src');
       var replacement = $(this).data('hoverimg');
       $(this).attr('src', replacement).data('hoverimg', original).css({display:'none'}).fadeIn(200);
   });
   
	// insert slider
	$('.child ul').append('<div id="tslide"></div>');
	
	// initially reset
	var left = $('.child ul li:first-child a').parent().position().left;
	var width = $('.child ul li:first-child a').width();
	$('#tslide').css({'left' : left, 'width' : width});
	
	// sliding
	$('.child ul li a').hover(function(){
	   
		var left = $(this).parent().position().left;
		var width = $(this).width();
		
		$('#tslide').stop().animate({
			'left' : left,
			'width' : width
		});
	});
});