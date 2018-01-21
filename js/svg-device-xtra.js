$(function(){
    $('#product-spec-header').on('click', function(){
        $('#tab-specs').slideToggle();
    });
    
    $('.tabs li:not(.specs)').on('click', function(){
        $('.tabs li').removeClass('active');
    });
    $('#tab-specs-trigger').on('click', function(){
        $('#tab-specs').addClass('active');
        $('html, body').animate({
            scrollTop: $('#phone-infographic-wrap').offset().top
        }, function(){
            // console.log('scrollTop=>', $('#phone-infographic-wrap').offset().top);
        });
    });
})