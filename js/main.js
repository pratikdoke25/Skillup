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
    const currentPath = window.location.pathname.split('/').pop();

    // Select all nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        // Check if the link's href matches the current path
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active'); // Add active class to the matching link
        } else {
            link.classList.remove('active'); // Ensure other links do not have active class
        }
    });
});

function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById('contact-form');
    const phoneInput = document.querySelector('input[name="phone"]');
    const messageInput = document.querySelector('textarea[name="message"]');
    const phoneNumber = phoneInput.value.trim();
    const message = messageInput.value.trim();

    // Validate phone number
    if (phoneNumber.length < 10 || isNaN(phoneNumber)) {
        alert("Please enter a valid phone number with at least 10 digits.");
        return; // Stop the form submission
    }

    // Validate message length
    if (message.length < 200) {
        alert("Your message must be at least 200 characters long.");
        return; // Stop the form submission
    }

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        if (response.ok) { // Check if the response is successful
            console.log("Form submitted successfully");
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('success-modal').style.display = 'flex';
            setTimeout(() => {
                document.getElementById('success-modal').style.display = 'none';
            }, 3000); // Auto hide modal after 3 seconds
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message || 'Failed to send message');
            alert('Error: ' + (errorData.message || 'Failed to send message'));
        }
    })
    .catch((error) => {
        console.error("Something went wrong!", error);
        alert("An error occurred while submitting the form.");
    })
    .then(() => {
        form.reset(); // Reset the form fields
    });
}

function updateCharacterCount() {
    const messageInput = document.getElementById('message');
    const characterCountDisplay = document.getElementById('character-count');
    const messageLength = messageInput.value.length;
    characterCountDisplay.textContent = `${messageLength}/200`; // Update character count
}
