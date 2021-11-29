
//custom animation
function slideAppear() {
  var section = document.querySelectorAll(".slideInTop");
  section.forEach((singleSection) => {
    var sectionPosition = singleSection.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.1;
    if (sectionPosition < screenPosition) {
      singleSection.classList.add("animateSlideInTop");
    }
  });
}
window.addEventListener("scroll", slideAppear);

function changeYear(){
  const yearSpan = document.querySelector(".year");
  const year = new Date().getFullYear();
  yearSpan.textContent=year;
}
changeYear();

(function ($) {
  ("use strict");

  //lightbox

  $(".magnify-lightbox").magnificPopup({
    delegate: "a", // child items selector, by clicking on it popup will open
    type: "image",
    gallery: {
      enabled: true, // set to true to enable gallery

      // read about this option in next Lazy-loading section

      navigateByImgClick: true,

      //arrowMarkup:
      // '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

      tPrev: "Previous (Left arrow key)", // title for left button
      tNext: "Next (Right arrow key)", // title for right button
      //tCounter:false,
      //tCounter: '<span class="mfp-counter">%curr% of %total%</span>', // markup of counter
    },
    // other options
  });
  //owl carousel

  $(".owl-carousel").owlCarousel({
    navigation: false,
    dots: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    margin: 0,
    responsiveClass: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 5,
        nav: false,
      },
    },
  });

  function initNavbar() {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 50) {
        $(".sticky").addClass("nav-sticky");
      } else {
        $(".sticky").removeClass("nav-sticky");
      }
    });
  }

  function initNavitemActive() {
    $(".navbar-nav a").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 0,
          },
          1500,
          "easeInOutExpo"
        );
      event.preventDefault();
    });
  }

  function initScrollSpy() {
    $("#navbarCollapse").scrollspy({
      offset: 70,
    });
  }

  function initMfpVideo() {
    $(".video-play-icon").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  }

  function initBacktoTop() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $(".back-to-top").fadeIn();
      } else {
        $(".back-to-top").fadeOut();
      }
    });
    $(".back-to-top").click(function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        1000
      );
      return false;
    });
  }

  function initContact() {
    $("#contact-form").submit(function () {
      var action = $(this).attr("action");

      $("#message").slideUp(750, function () {
        $("#message").hide();

        $("#submit")
          .before('<img src="images/ajax-loader.gif" class="contact-loader" />')
          .attr("disabled", "disabled");

        $.post(
          action,
          {
            name: $("#name").val(),
            email: $("#email").val(),
            comments: $("#comments").val(),
            mobile:$("#mobile").val(),
          },
          function (data) {
            document.getElementById("message").innerHTML = data;
            $("#message").slideDown("slow");
            $("#cform img.contact-loader").fadeOut("slow", function () {
              $(this).remove();
            });
            $("#submit").removeAttr("disabled");
            if (data.match("success") != null) $("#cform").slideUp("slow");
          }
        );
      });

      return false;
    });
  }

  function init() {
    initNavbar();
    initNavitemActive();
    initScrollSpy();
    initMfpVideo();
    initBacktoTop();
    initContact();
  }

  init();
})(jQuery);
