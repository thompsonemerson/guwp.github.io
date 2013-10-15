(function($){
    $(document).ready(function(){

        var ghusername = 'guwordpressbrasil';

        function getgists(githubuser) {
            //$.getJSON("http://gist.github.com/api/v1/json/gists/" +githubuser+ "?callback=?", function(data) {
                $.getJSON("https://api.github.com/users/"+githubuser+"/gists", function(data) {
                var gisthtml = '';
                for (var i = 0; i < 10;) {
                    var item = data.gists[i];
                    if (item.public) {
                        i++;
                        var desc = item.description;
                        if (desc === null) {
                            desc = '(no description)';
                        }
                        else {if (desc.length > 50) {
                            desc = desc.substring(0, 40).replace(/w+$/, '') + '&#133;';
                        }}
                        gisthtml += '<li class="gist"><a href="http://gist.github.com/' + item.repo + '"><span class="gist-id">#' + item.repo + ': </span>' + desc + '</a></p>';
                    }
                };
                if (data.gists.length > 10) {gisthtml += '<li class="gist gist-more"><a href="http://gist.github.com/' + githubuser + '">More snippets&#133;</a>'};
               $("#gists").html('<ul class="gist-list">'+gisthtml+'</ul>');
            });
        }

        getgists(ghusername);

    });
})(window.jQuery);