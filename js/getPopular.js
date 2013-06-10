
$(document).ready(function() {

var loudgifs = [];

    $.getJSON(
        'https://api-ssl.bitly.com/v3/user/popular_links',
        {
            'format': 'json',
            'access_token': '50adfb7be005f4a3d8f8005ff98939e844016675',
        },
        function(response) {

            var data = response.data.popular_links;

            for (var i=0; i < data.length; i++) {
                // Expand each bitly link
                 $.getJSON(
                    'https://api-ssl.bitly.com/v3/expand',
                    {
                        'format': 'json',
                        'access_token': '50adfb7be005f4a3d8f8005ff98939e844016675',
                        'shortUrl': data[i].link
                    },
                    function(response) {
                        var loudgif = response.data.expand[0];

                        loudgifs.push(loudgif);

                        console.log(JSON.stringify(loudgifs));


                    }
                );
            }


        }
    );



});
