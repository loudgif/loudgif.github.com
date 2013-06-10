// Get URL params
function getParam(param,url) {
    return decodeURI(
        (RegExp(param + '=' + '(.+?)(&|$)').exec(url)||[,null])[1]
    );
}

$(document).ready(function() {

var loudgifs = [];

    $.getJSON(
        'js/popular.json',
        {
            'format': 'json'
        },
        function(response) {
            var $list = $('#popular-list');

            for(var i=0; i<response.length; i++) {
                var lg = response[i],
                    $loudgif = $('<a href="http://a.loudgif.com/' + lg.user_hash + '" class="col12 clearfix">'),
                    image_url = getParam('g',lg.long_url);

                $loudgif
                    .css('background-image', 'url(' + image_url + ')')
                    .append('<div class="text">' +
                                '<span class="num">#' + (i+1) + '</span>' +
                                // '<span class="url">a.loudgif.com/' + lg.user_hash + '</span>' +
                            '</div>')


                $loudgif.appendTo('#popular-list');
            }

        }
    );



});
