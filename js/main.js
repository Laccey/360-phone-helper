
(function($) {

    'use strict';

    // variables
    var $isAnimatedSecond_1 = $('.page_2 .is-animated_1'),
        $isAnimatedSecond_2 = $('.page_2 .is-animated_2'),
        $isAnimatedSecond_3 = $('.page_2 .is-animated_3'),
        $isAnimatedSecond_4 = $('.page_2 .is-animated_4'),

        $isAnimatedThird_1 = $('.page_3 .is-animated_1'),
        $isAnimatedThird_2 = $('.page_3 .is-animated_2'),
        $isAnimatedThird_3 = $('.page_3 .is-animated_3'),

        $isAnimatedFourth_1 = $('.page_4 .is-animated_1'),
        $isAnimatedFourth_2 = $('.page_4 .is-animated_2'),
        $isAnimatedFourth_3 = $('.page_4 .is-animated_3'),

        $isAnimatedFifth_1 = $('.page_5 .is-animated_1'),
        $isAnimatedFifth_2 = $('.page_5 .is-animated_2'),
        $isAnimatedFifth_3 = $('.page_5 .is-animated_3');

    // initialize fullPage
    $('#fullpage').fullpage({

        navigation: true,
        verticalCentered: false,
        onLeave: function(index, nextIndex, direction) {

            /**
             * use the following condition:
             *
             *   if( index == 1 && direction == 'down' ) {
      *
      * if you haven't enabled the dot navigation
      * or you aren't interested in the animations that occur
      * when you jump (using the dot navigation)
      * from the first section to another sections
      */

            // first animation
            if( index == 1 && nextIndex == 2 ) {
                $isAnimatedSecond_1.addClass('animated slideInRight');
                $isAnimatedSecond_2.addClass('animated rotateIn');
                $isAnimatedSecond_3.addClass('animated fadeIn').css('animation-delay', '.5s');
                $isAnimatedSecond_4.addClass('animated slideInUp');
            }

            /**
             * use the following condition:
             *
             *   else if( index == 2 && direction == 'down' ) {
      *
      * if you haven't enabled the dot navigation
      * or you aren't interested in the animations that occur
      * when you jump (using the dot navigation) from the first section to the third one
      */

            // second animation
            else if( ( index == 1 || index == 2 ) && nextIndex == 3 ) {
                $isAnimatedThird_1.addClass('animated slideInUp');
                $isAnimatedThird_2.addClass('animated slideInDown');
                $isAnimatedThird_3.addClass('animated slideInLeft');
            }


            /**
             * use the following condition:
             *
             *   else if( index == 3 && direction == 'down' ) {
      *
      * if you haven't enabled the dot navigation
      * or you aren't interested in the animations that occur
      * when you jump (using the dot navigation)
      * from the first or second section to the fourth one
      */

            // third animation
            else if( ( index == 1 || index == 2 || index == 3 ) && nextIndex == 4 ) {
                $isAnimatedFourth_1.addClass('animated rotateInPoint_1');
                $isAnimatedFourth_2.addClass('animated rotateInPoint_2');
                $isAnimatedFourth_3.addClass('animated slideInRight');
            }

            // third animation
            else if( ( index == 1 || index == 2 || index == 3 ||index == 4 ) && nextIndex == 5 ) {
                $isAnimatedFifth_1.addClass('animated slideInDown');
                $isAnimatedFifth_2.addClass('animated slideInUp');
                $isAnimatedFifth_3.addClass('animated slideInRight');
            }
        },
        afterResize:function () {
            $('.page').attr('style','transform:scale(' + (document.body || document.documentElement).clientHeight / 1082 +')');
        },
        afterRender:function () {
            var winHeight = document.documentElement.clientHeight;
            $('.page').attr('style','transform:scale(' + winHeight / 1082 +')');
        }
    });
})(jQuery);


