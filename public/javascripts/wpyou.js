//Menu
$(function(){
    if( $(window).width() >= 768 ){
        $(".navi li").hover(function(){
            $(this).find('div:first').slideDown("fast").css({display:"block"});
        },function(){
            $(this).find('div:first').slideUp("fast").css({display:"none"});
        });
        $(window).scroll(function(){
            if($(window).scrollTop() >= 120){
                $(".navbar").addClass("pinned");
                $(".main-menu").removeClass("radius");
            }else{
                $(".navbar").removeClass("pinned");
                $(".main-menu").addClass("radius");
            }
        });
        $(".navi li.mp").hover(function(){
            $("#product-box").slideDown("fast").css({display:"block"});
            $(this).addClass("current-menu-item");
        });
        $("#product-box").mouseleave(function(){
            $("#product-box").slideUp("fast").css({display:"none"});
            $(this).removeClass("current-menu-item");
        });
    }
});
// Mobile-MainMenu
$(function(){
    $('#mobile-menu').click( function(){
            $(".main-menu").slideToggle("fast");
            $(this).toggleClass('active');
            $(".search-box").css({display:"none"});
            $("#mobile-so").removeClass('active');
        }
    );
});
// Mobile-SearchForm
$(function(){
    $("#mobile-so").click(function(){
            $(".search-box").slideToggle("fast");
            $(this).toggleClass('active');
            $(".main-menu").css({display:"none"});
            $('#mobile-menu').removeClass('active');
        }
    );
});
// SearchForm
$(function(){
    $(".btn-search").click(function(){
            $(".search-box").slideToggle("fast");
            $(this).toggleClass('active');
            if( $(window).width() < 768 ){
                $(".main-menu").css({display:"none"});
            }
            $('.mobile-menu').removeClass('active');
        }
    );
});
// Menu First
$(function(){
    $(".footbar .widget-column:last").addClass("widget-column-last");
    $(".postlist li:last").addClass("nb");
    $(".foot-rt img").addClass("fadeInLeft wow animated");
});
// MoreMeta - Homepage
$(function(){
    $(".readmore-mid").click(function(){
            $(".col-md-3 div ul").slideToggle("fast");
            //å•ä¸ªä¸‹æ‹‰å±•ç¤º$(this).parent().find("ul").slideToggle("fast");
            //å•ä¸ªä¸‹æ‹‰å±•ç¤º$(this).toggleClass('active');
            $(".col-md-3 div .readmore-mid").toggleClass('active');

            if($(".col-md-3 div .readmore-mid").hasClass("active"))
            {
                $(".col-md-3 div .readmore-mid").html("éšè—å‚æ•°");
            } else {
                $(".col-md-3 div .readmore-mid").html("æŸ¥çœ‹æ›´å¤šå‚æ•°");
            }
        }
    );
});
//Piclist-ImageResponsive
$(function(){
    var ratio = 1;
    var liWidth = $('.piclist li .folio-thumb').width();
    var liHeight = liWidth * ratio;
    $('.piclist li .folio-thumb img').width( liWidth );
    $('.piclist li .folio-thumb img').height( liHeight );

});
//Weixin
$(function(){
    $("#i_weixin").hover(function(){
        $("#weixin").slideDown("fast").css({display:"block"});
    },function(){
        $("#weixin").slideUp("fast").css({display:"none"});
    });
});
//OnlineService
$(function(){
    jQuery(function(){jQuery(".cs-div").css({"top":200+jQuery(window).scrollTop(),"right":"0"});jQuery(window).scroll(function(){var offsetTop=200+jQuery(window).scrollTop()+"px";jQuery(".cs-div").animate({top:offsetTop,"right":"0"},{duration:500,queue:false})});jQuery(window).resize(function(){var offsetTop=200+jQuery(window).scrollTop()+"px";jQuery(".cs-div").animate({top:offsetTop,"right":"0"},{duration:500,queue:false})});jQuery("#cs-close").click(function(){jQuery(".cs-inner").toggle();jQuery(".cs-div").toggleClass("cs-bar");});});
});
//BackTop
if( $(window).width() > 768 ){
    $(function(){
        var $backToTopTxt = "", $backToTopEle = $('<a class="backToTop" title=""></a>').appendTo($("body"))
            .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
                $("html, body").animate({ scrollTop: 0 }, 120);
            }), $backToTopFun = function() {
            var st = $(document).scrollTop(), winh = $(window).height();
            (st > 0)? $backToTopEle.fadeIn(): $backToTopEle.fadeOut();
            if (!window.XMLHttpRequest) {
                $backToTopEle.css("top", st + winh - 166);
            }
        };
        $(window).bind("scroll", $backToTopFun);
        $(function() { $backToTopFun(); });
    });
}