$(function() {
    // Fixed Header

    let header = $("#header");
    let intro = $("#intro");
    let introH = intro.innerHeight();
    let scrollPos = $(window).scrollTop();

    $(window).on("scroll load resize", function() {
        introH = intro.innerHeight();
        scrollPos = $(this).scrollTop();
        
        if (scrollPos > introH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    });

    //Scrolling
    let nav = $("#nav")
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        let elementID = $(this).data('scroll');
        let elementOffset = $(elementID).offset().top;

        nav.removeClass("show");

        $("html, body").animate({
            scrollTop: elementOffset - 80
        }, 600);
    });

    //Burger
    $("#burger").on("click", function(event) {
        event.preventDefault();

        nav.toggleClass("show");
    });
});