var app = {};

;(function($) {

    var $doc = $(document);

    /** [1] */
    $.readyFn = {
        list: [],
        register: function(fn) {
            console.log('Module Registered');

            $.readyFn.list.push(fn);
        },
        execute: function() {
            console.log('Modules Executing');

            for (var i = 0; i < $.readyFn.list.length; i++) {
                try {
                    $.readyFn.list[i].apply(document, [$]);
                } catch (e) {
                    throw e;
                }
            };
        }
    };

    /** [2] */
    app = {
        initSmoothState: function () {
            console.log('Module Executed: Smooth State');

            var $page = $('#main'),
                options = {
                    debug: true,
                    prefetch: true,
                    cacheLength: 2,
                    onStart: {
                        duration: 500,
                        render: function($container) {
                            // Add your CSS animation reversing class
                            $container.addClass('is-exiting');
                            // Restart your animation
                            app.smoothState.restartCSSAnimations();
                        }
                    },
                    onReady: {
                        duration: 0,
                        render: function($container, $newContent) {
                            // Remove your CSS animation reversing class
                            $container.removeClass('is-exiting');
                            // Inject the new content
                            $container.html($newContent);
                            $('html, body').animate({ scrollTop: 0 }, 0);
                        }
                    },
                    onAfter: function($container, $newContent) {
                        $.readyFn.execute();
                    }
                };

            this.smoothState = $page.smoothState(options).data('smoothState');
        },
        initMagicScroll: function () {
          console.log('magicScroll Executed');
          var controller = new ScrollMagic.Controller();
          // create a scene
          new ScrollMagic.Scene({
                  duration: 200,    // the scene should last for a scroll distance of 100px
                  offset: 400        // start this scene after scrolling for 50px
              })
              .setPin(".computer-bottom") // pins the element for the the scene's duration
              .addTo(controller); // assign the scene to the controller
        }
    };

    /** [3] */
    $doc.ready(function() {
        console.log('Initial Document Ready');
        app.initSmoothState();
        $.readyFn.execute();
    });

    /** [4] */
    $.fn.ready = $.readyFn.register;

    $(function() {
      app.initMagicScroll();
    });

})(jQuery);









// jQuery(function($) {
//   'use strict';
//
  // function scrollmagic() {
  //   var controller = new ScrollMagic.Controller();
  //   // create a scene
  //   new ScrollMagic.Scene({
  //           duration: 100,    // the scene should last for a scroll distance of 100px
  //           offset: 50        // start this scene after scrolling for 50px
  //       })
  //       .setPin("#my") // pins the element for the the scene's duration
  //       .addTo(controller); // assign the scene to the controller
  // };
//
//   scrollmagic()
//
//   var $page, options, smoothState;
//   $page = $('#main');
//   options = {
//     debug: true,
//     prefetch: true,
//     cacheLength: 2,
//     onStart: {
//       duration: 200,
//       render: function($container) {
//         $container.addClass('is-exiting');
//         smoothState.restartCSSAnimations();
//       }
//     },
//     onReady: {
//       duration: 0,
//       render: function($container, $newContent) {
//         $container.removeClass('is-exiting');
//         $container.html($newContent);
//         $('html, body').animate({ scrollTop: 0 }, 0);
//       }
//     },
//     onAfter: function($container, $newContent) {
//       console.log('animations finished')
//       // scrollmagic();
//     }
//   };
//   smoothState = $page.smoothState(options).data('smoothState');
// });
