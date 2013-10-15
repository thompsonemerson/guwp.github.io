(function($){
    $(document).ready(function(){

        var ghusername = 'guwordpressbrasil';
        var ghtoken = '7e89148df90b290b4953dbd58ac136b87fbbdb46';

        $('#cria-gist').on('click',function(e){
            e.preventDefault();

            var gist_description = $('#gist-description').val(),
                gist_filename = $('#gist-filename').val();
                gist_content = $('#gist-content').val();

            var data = {
                "description": gist_description,
                "public": true,
                "files": {},
                "login": ghusername,
                "token": ghtoken
            }
            var filename = gist_filename;
            data["files"][filename] = {
                "content": gist_content
            }

            $.ajax({
                url: 'https://api.github.com/gists',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data)
            })
            .success( function(e) {
                console.log(e);
            })
            .error( function(e) {
                console.warn("gist save error", e);
            });


        });

        function getgists(githubuser) {
            //$.getJSON("http://gist.github.com/api/v1/json/gists/" +githubuser+ "?callback=?", function(data) {
                $.getJSON("https://api.github.com/users/"+githubuser+"/gists", function(data) {
                console.dir(data);
                var gisthtml = '';

                $.each(data,function (index,value) {
                    console.log(index);
                    console.log(value);

                    if (value.public) {
                        criaFrame(value.id);

                        var desc = value.description;
                        if (desc === null) {
                            desc = '(no description)';
                        }
                        else {if (desc.length > 50) {
                            desc = desc.substring(0, 40).replace(/w+$/, '') + '&#133;';
                        }}
                        gisthtml += '<li class="gist"><a href="http://gist.github.com/'+githubuser+'/'+ value.id + '"><span class="gist-id">#' + value.id + ': </span>' + desc + '</a></p>';
                    }
                });
               $("#gistLista").html('<ul class="gist-list">'+gisthtml+'</ul>');
            });
        }

        getgists(ghusername);

    });
})(window.jQuery);

function criaFrame(gistId){
    // Create an iframe, append it to this document where specified
    var gistFrame = document.createElement("iframe");
    gistFrame.setAttribute("width", "100%");
    gistFrame.id = "gistFrame"+gistId;

    var zone = document.getElementById("gistZone");
    zone.innerHTML = "";
    zone.appendChild(gistFrame);

    // Create the iframe's document
    var gistFrameHTML = '<html><body onload="parent.adjustIframeSize(document.body.scrollHeight)"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/' + gistId + '.js"></sc'+'ript></body></html>';

    // Set iframe's document with a trigger for this document to adjust the height
    var gistFrameDoc = gistFrame.document;

    if (gistFrame.contentDocument) {
        gistFrameDoc = gistFrame.contentDocument;
    } else if (gistFrame.contentWindow) {
        gistFrameDoc = gistFrame.contentWindow.document;
    }

    gistFrameDoc.open();
    gistFrameDoc.writeln(gistFrameHTML);
    gistFrameDoc.close();

    console.log("iframe added");
}


function adjustIframeSize(newHeight, gistId) {
    var i = document.getElementById("gistFrame"+gistId);
    i.style.height = parseInt(newHeight) + "px";
    console.log("size adjusted", newHeight);
}