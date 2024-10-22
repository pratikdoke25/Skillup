// Display the modal on page load
window.onload = function() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
};

// Close modal when the user clicks on <span> (x)
document.querySelector('.close').onclick = function() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
};

// Close modal when the user clicks anywhere outside the modal
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

function sendWhatsAppMessage() {
    // Replace 'PHONE_NUMBER' with the recipient's phone number (include country code without '+')
    // Example: 911234567890 for a phone number in India
    var phoneNumber = '9527605805';

    // Replace 'MESSAGE' with the message you want to pre-fill
    var message = encodeURIComponent("Hello! I'm interested in your services.");

    // Open WhatsApp using wa.me URL
    var whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappURL, '_blank');
}        
        function handleSubmit(event) {
            event.preventDefault(); // Prevent default form submission
        
            const form = document.getElementById('contact-form');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const courseInput = document.getElementById('course');
            const phoneInput = document.getElementById('phone');
            const accessKeyInput = form.querySelector('input[name="4393e097-cd07-4b9c-8767-3c3ca827d1da"]');
        
            // Get input values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const course = courseInput.value.trim();
            const phone = phoneInput.value.trim();
            const accessKey = accessKeyInput.value.trim(); // Access key from the form
        
            // Validate phone number
            if (phone.length < 10 || isNaN(phone)) {
                alert("Please enter a valid phone number with at least 10 digits.");
                return; // Stop the form submission
            }
        
            const formData = {
                name: name,
                email: email,
                course: course,
                phone: phone,
                access_key: accessKey // Include access key in the request
            };
        
            fetch('https://api.web3forms.com/submit', { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(async (response) => {
                if (response.ok) { // Check if the response is successful
                    console.log("Form submitted successfully");
                    alert('Thank you! Your message has been sent.');
                    form.reset(); // Reset the form fields
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.message || 'Failed to send message');
                    alert('Error: ' + (errorData.message || 'Failed to send message'));
                }
            })
            .catch((error) => {
                console.error("Something went wrong!", error);
                alert("An error occurred while submitting the form.");
            });
        }
   