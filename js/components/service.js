(function init() {
    const $animationBlock = $('#phone-infographic-wrap'),
        $btn = $('#tab-specs-trigger'),
        $btnWrapper = $btn.parent('li.tab'),
        tab_specs_triggerName = '#tab-specs-trigger-xtra',
        $btnDrop = $('#tab-specs-drop'),
        $btnDropWrapper = $btnDrop.parent('li.tab'),
        tab_titleName = 'tab-title',
        activeClass = 'active',
        $check = $('#tab-specs-trigger-label'),

        runAnimation = function () {
            // console.log('%cScroll window!', 'background: violet', posTop);
            $animationBlock.addClass(activeClass);
        };
    function setBtnParams(){
        $btnWrapper.addClass(activeClass);
        $btnDropWrapper.removeClass(activeClass);
    }
    $btn.on('click', function(){ console.log('Clicked!');
        setBtnParams();
        ! $animationBlock.hasClass(activeClass) && $animationBlock.addClass(activeClass);
    });
    $btnDrop.on('click', function(){ //console.log('clicked', {$btnWrapper:$btnWrapper,$btnDropWrapper:$btnDropWrapper});
        $btnWrapper.removeClass(activeClass);
        $btnDropWrapper.addClass(activeClass);
        $animationBlock.removeClass(activeClass);
    });
    // #tab-specs-trigger.tab-title
    $(tab_specs_triggerName).
    on('click', function (event) {
        event.preventDefault();
        setBtnParams();
        var posTop = $animationBlock.offset().top - 20;
        $('html, body').animate({
            scrollTop: posTop
        }, 1000, runAnimation);

    });
    $('#channel-name span').text(globals.channelName);
})();
