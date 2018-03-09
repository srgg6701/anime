// order of loads:
// 1. contents-loader.js
(function init() {
    let cnt = 0;
    const intv = setInterval(function () {
        const $animationBlock = $('#device-infographic-wrap');
        if ($animationBlock.length) {
            clearInterval(intv);

            // console.log('got it! this, $animationBlock =>', $animationBlock);

            const $btn = $('#tab-specs-trigger'),
                $btnWrapper = $btn.parent('li.tab'),
                tab_specs_triggerName = '#tab-specs-trigger-xtra',
                $btnDrop = $('#tab-specs-drop'),
                $btnDropWrapper = $btnDrop.parent('li.tab'),
                $btnShowSpec = $('#show-spec'),
                tab_titleName = 'tab-title',
                activeClass = 'active',
                $check = $('#tab-specs-trigger-label'),

                runAnimation = function () {
                    // console.log('%cScroll window!', 'background: violet', posTop);
                    $animationBlock.addClass(activeClass);
                };
            function setBtnParams() {
                $btnWrapper.addClass(activeClass);
                $btnDropWrapper.removeClass(activeClass);
            }
            // 
            $btn.on('click', function () { //console.log('Clicked!');
                setBtnParams();
                !$animationBlock.hasClass(activeClass) && $animationBlock.addClass(activeClass);
            });
            $btnDrop.on('click', function () { //console.log('clicked', {$btnWrapper:$btnWrapper,$btnDropWrapper:$btnDropWrapper});
                $btnWrapper.removeClass(activeClass);
                $btnDropWrapper.addClass(activeClass);
                $animationBlock.removeClass(activeClass);
            });
            $btnShowSpec.on('click', function () {
                $btnWrapper.addClass(activeClass);
                $btnDropWrapper.removeClass(activeClass);
                runAnimation();
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
            $('#channel-name span').text(globals.channelName || 'default (no)');
        };
        ++cnt;
        if (cnt >= 50) {
            clearInterval(intv);
            console.warn('Cannot load #device-infographic-wrap...');
        }
    }, 100);
    $('#service-html h2').fadeTo('slow', 0.1, function(){
        $('.spec-wrap').eq(0).prev('h2').fadeTo('slow', 1);
    });
})();
