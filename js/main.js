( function( $, _ ){
    $(document).ready(function(){

        /**
         * Randomly Arrange the Organizers
         */
        var $organizersList = $( '.organizers-list' ),
            $organizers = $organizersList.children( '.member' ),
            avatarSize = $organizersList.find( '.wp-thumb-round img' ).width(),
            heights = [];

        $organizers.each( function() {
            heights.push( $( this ).find( '.wp-desc' ).outerHeight( true ) + avatarSize );
        } ).height( _.max( heights ) ).detach().sort(function(a,b){
            // Get a random number between 0 and 10
            var temp = parseInt( Math.random() * 10, 10 ),
                isOddOrEven = temp%2,
                isPosOrNeg = temp > 5 ? 1 : -1;

            // Return -1, 0, or +1
            return ( isOddOrEven*isPosOrNeg );
        });

        $organizers.prependTo( $organizersList );

        /**
         * Milestone counters
         */
        $('.milestone-counter').appear(function() {
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
} )( window.jQuery, window._ );