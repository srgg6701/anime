var globals = {
    channelName: 'elgigantenSE'
};
if (typeof $ == 'undefined') {
    if (typeof jQuery == 'undefined') {
        console.error('Have no jQuery');
    } else {
        const $ = jQuery;
    }
}
// content level to (un)fold in scripts: 4
$(function () {
    $.get('../../devices/css-service.css', function (css) {
        $('#service-styles').append(css);
        $.get('../../devices/service/top.html', function (panel) {
            $('#service-html').prepend(panel);
        })
        $.get(`../../scripts/${contentsFileName}.html`, function (content) {
            $('#visual-specification').append(content);
            $.get('../../js/components/service.js', function (init) {
                console.log('Initialized!');
            });
        });
    });
});
