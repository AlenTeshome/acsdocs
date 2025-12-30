/*(function ($, Drupal) {

  $(document).ready(function () {

    new Typed("#element", {
      strings: [
        "Typed.js is a JavaScript library.",
        "It types out.",
        "It types out sentences.",
        "And then deletes them.",
        "Try it out!"
      ],
      typeSpeed: 30,
      backSpeed: 20,
      loop: true
    });

  });

})(jQuery, Drupal);*/

(function ($, Drupal) {
  Drupal.behaviors.customFrontBehavior = {
    attach: function (context, settings) {

      // Get all <span> items inside #my-text-source
      const stringsArray = $('#my-text-source span', context)
        .map(function () {
          return $(this).text().trim();
        })
        .get(); // Convert to normal array

      console.log(stringsArray); // For debugging

      // Example usage: Typewriter plugin or anything that accepts "strings"
      // Replace this with your own plugin if needed.
      if (stringsArray.length > 0) {
        new Typed('#my-typing-target', {
          strings: stringsArray,
            typeSpeed: 30,
            backSpeed: 20,
            autoStart: true,
            loop: true
        });
      }

    }
  };


//sticky menu Js

  Drupal.behaviors.stickyMenu = {
    attach: function (context, settings) {

      // Run once per page load.
      $(window).on('scroll', function () {

        // Convert 10em to pixels (based on computed root font size)
        const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const triggerPoint = 10 * rootFont; // 10em in px

        if ($(this).scrollTop() > triggerPoint) {

          // Add your new class to .navigation
          $('.eklradix-navbar', context).addClass("sticky");

        } else {

          // Remove the new class
          $('.eklradix-navbar', context).removeClass("sticky");

        }

      });

    }
  };







})(jQuery, Drupal);

