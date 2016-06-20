global.jQuery = require('jquery');
// var moment = require('moment');

jQuery(function() {
  'use strict';
  var $page, options, smoothState;
  $page = jQuery('#main');
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
      }
    }
  };
  smoothState = $page.smoothState(options).data('smoothState');
});
