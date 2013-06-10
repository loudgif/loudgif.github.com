// Get URL params
function getParam(param,url) {
    return decodeURI(
        (RegExp(param + '=' + '(.+?)(&|$)').exec(url)||[,null])[1]
    );
}

$(document).ready(function() {

var loudgifs = [];

    $.getJSON(
        'https://api.github.com/gists/a9f979bd1d815d2d9293',
        {
            'format': 'json'
        },
        function(response) {
            var popular = eval(response.files['popular.js'].content),
                $list = $('#popular-list');

            for(var i=0; i<popular.length; i++) {
                var lg = popular[i],
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
