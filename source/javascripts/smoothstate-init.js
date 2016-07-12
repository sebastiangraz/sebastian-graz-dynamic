jQuery(function($) {
  'use strict';

  function scrollmagic() {
    var controller = new ScrollMagic.Controller();
    // create a scene
    new ScrollMagic.Scene({
            duration: 100,    // the scene should last for a scroll distance of 100px
            offset: 50        // start this scene after scrolling for 50px
        })
        .setPin("#my") // pins the element for the the scene's duration
        .addTo(controller); // assign the scene to the controller
  };

  scrollmagic()

  var $page, options, smoothState;
  $page = $('#main');
  options = {
    debug: true,
    prefetch: true,
    cacheLength: 2,
    onStart: {
      duration: 200,
      render: function($container) {
        $container.addClass('is-exiting');
        smoothState.restartCSSAnimations();
      }
    },
    onReady: {
      duration: 0,
      render: function($container, $newContent) {
        $container.removeClass('is-exiting');
        $container.html($newContent);
        $('html, body').animate({ scrollTop: 0 }, 0);
      }
    },
    onAfter: function($container, $newContent) {
      console.log('animations finished')
      // scrollmagic();
    }
  };
  smoothState = $page.smoothState(options).data('smoothState');
});
