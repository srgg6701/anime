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
    var $visualSpecification = $('#visual-specification'),
        level = location.host.indexOf('.github.') ? '../' : '../../';
    $.get(`${level}devices/css-service.css`, function (css) {
        $('#service-styles').append(css);
        $.get(level+'devices/service/top.html', function (panel) {
            $('#service-html').prepend(panel);
        });
        if (contentsFileName){
            $.get(`${level}scripts/${contentsFileName}.html`, function (content) {
                $visualSpecification.append(content);
            });
        }
        $.get(`${level}js/components/service.js`, function () {
            console.log('Initialized!');
        });
    });
});
