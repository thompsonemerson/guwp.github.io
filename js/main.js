/**
 * Parallax Scrolling Tutorial
 * For NetTuts+
 *
 * Author: Mohiuddin Parekh
 *  http://www.mohi.me
 *  @mohiuddinparekh
 */


$(document).ready(function(){
    // Cache the Window object
    var $window = $(window);

    $('.background').each(function(){
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function() {
            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!
            //var yPos = -($window.scrollTop() / $bgobj.data('speed'));
            var yPos = -( ($window.scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });

        }); // window scroll Ends

    });

});