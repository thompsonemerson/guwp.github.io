(function($){
    $(document).ready(function(){

        $('.button').hadouken({
            'enterOn' : 'hadouken'
        });

        jQuery('.milestone-counter').appear(function() {
            $('.milestone-counter').each(function(){
                dataperc = $(this).attr('data-perc'),
                $(this).find('.milestone-count').delay(6000).countTo({
                    from: 0,
                    to: dataperc,
                    speed: 2000,
                    refreshInterval: 100
                });
            });
        });

    });
})(window.jQuery);


/*
 * jQuery hadouken Plugin 1.0
 * Copyright 2013, Rafael Ehlers
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {

    $.fn.hadouken = function(options) {

        var defaults = {
            enterOn: 'click',
            delayTime: 5000
            };

        var options = $.extend(defaults, options);

        return this.each(function() {

            var _this = $(this);
            var audioSupported = false;
            //Stupid Browser Checking which should be in jQuery Support
            if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) {
                audioSupported = true;
            }

            //ryu Vars
            var ryuImageMarkup = '<img id="ryu" style="display: none" src="img/hadouken/hadouken.gif" />'
            var ryuAudioMarkup = '<audio id="hadoukensound" preload="auto"><source src="img/hadouken/hadouken.mp3" /></audio>';
            var locked = false;

            //Append ryu and Style
            $('body').append(ryuImageMarkup);
            if(audioSupported) { $('body').append(ryuAudioMarkup); }
            var ryu = $('#ryu').css({
                "position":"fixed",
                "bottom": "0",
                "left" : "-194px",
                "display" : "block"
            })

            // Animating Code
            function init() {
                locked = true;

                //Sound Hilarity
                if(audioSupported) {
                    function playSound() {
                        document.getElementById('hadoukensound').play();
                    }
                    playSound();
                }

                // Movement Hilarity
                ryu.animate({
                    "left" : "0"
                }, 200, function() {
                    $(this).delay(1250).animate({
                        "left" : "-194px"
                    }, 200, function() {
                        //var offset = (($(this).position().left)+400);
                        //$(this).delay(300).animate({
                        //  "left" : offset
                        //}, 2200, function() {
                            ryu = $('#ryu').css({
                                "left" : "-194px"
                            })
                            locked = false;
                        //})
                    });
                });
            }

            if(options.enterOn == 'timer') {
                setTimeout(init, options.delayTime);
            } else if(options.enterOn == 'click') {
                _this.bind('click', function(e) {
                    e.preventDefault();
                    if(!locked) {
                        init();
                    }
                })
            } else if(options.enterOn == 'hadouken'){
                var kkeys = [], hadouken = "40,39,65";
                $(window).bind("keydown.ryu", function(e){
                    kkeys.push( e.keyCode );
                    if ( kkeys.toString().indexOf( hadouken ) >= 0 ) {
                        init();
                        $(window).unbind('keydown.ryu');
                    }
                }, true);

            }

        });
    }
})(window.jQuery);

