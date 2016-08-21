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
                    cacheLength: 0,
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
        initImagesLoaded: function () {
          $('#main').imagesLoaded()
          .always( function( instance ) {
            console.log('all images loaded');
            console.log()
          })
          .done( function( instance, image ) {
            console.log('all images successfully loaded');
            $('img.loadme').each( function(){
              $(this).addClass('image-loaded');
            });
            var $logo = $('#logo');
            $logo.removeClass('is-loading');
          })
          .fail( function() {
            console.log('all images loaded, at least one is broken');
          })
          .progress( function( instance, image ) {
            var result = image.isLoaded ? 'loaded' : 'broken';
            console.log( 'image is ' + result + ' for ' + image.img.src );
            var $logo = $('#logo');
            $logo.addClass('is-loading');
          });
        },
        parallax: function () {
          $(window).scroll(function(){

            if($(this).scrollTop() < $(this).height()) {
              var x = $(this).scrollTop(),
              transY = (x * 0.15),
              transform = 'translateY('+ -transY+'px)';
              $('.hero-phone img').css({
                transition: 'none',
                transform: transform
              });
            }
          });
        }
    };

    /** [3] */
    $doc.ready(function() {
        console.log('Initial Document Ready');
        $.readyFn.execute();
    });

    /** [4] */
    $.fn.ready = $.readyFn.register;

    $(function() {
      app.initSmoothState();
      app.initImagesLoaded();
      app.parallax();
    });

})(jQuery);
