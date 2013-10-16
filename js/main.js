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