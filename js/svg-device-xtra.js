$(function(){
    $('#product-spec-header').on('click', function(){
        $('#tab-specs').slideToggle();
    });
    
    $('.tabs li:not(.specs)').on('click', function(){
        $('.tabs li').removeClass('active');
    });
    $('#tab-specs-trigger').on('click', function(){
        $('#tab-specs').addClass('active');
        var $pBlock = $('#phone-infographic-wrap'), 
            $dBlock = $('#device-infographic-wrap'),
            $tBlock;
        $tBlock = $pBlock.length ? $pBlock : $dBlock;
        $('html, body').animate({
            scrollTop: $tBlock.offset().top
        }, function(){
            // console.log('scrollTop=>', $tBlock.offset().top);
        });
    });
})