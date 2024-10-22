(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

document.addEventListener("DOMContentLoaded", function() {
    // Get the current URL path
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();

    // Select all nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Loop through each nav link
    navLinks.forEach(link => {
        // Get the href attribute and convert it to lowercase
        const linkPath = link.getAttribute('href').toLowerCase();

        // Check if the href matches the current path
        if (linkPath === currentPath) {
            link.classList.add('active'); // Add active class to the matching link
        } else {
            link.classList.remove('active'); // Ensure other links do not have active class
        }
    });
});

         // Add an event listener to the subscribe button

         document.getElementById('subscribeButton').addEventListener('click', function() {
            // Get the email input value
            var emailInput = document.getElementById('emailInput').value;
    
            // Check if the input is not empty
            if (emailInput) {
                // Show alert if the email is entered
                alert("Subscribed to newsletter");
                // Optional: You can also clear the input after subscription
                document.getElementById('emailInput').value = ''; // Clear the input field
            } else {
                // Show alert if the input is empty
                alert("Please enter a valid email address.");
            }
        });