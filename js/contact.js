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
function isValidEmail(email) {
    // Regular expression for validating an email address
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById('contact-form');
    const phoneInput = document.querySelector('input[name="phone"]');
    const emailInput = document.querySelector('input[name="email"]'); // Add email input
    const messageInput = document.querySelector('textarea[name="message"]');
    
    const phoneNumber = phoneInput.value.trim();
    const email = emailInput.value.trim(); // Get email input value
    const message = messageInput.value.trim();

    // Validate phone number
    if (phoneNumber.length < 10 || isNaN(phoneNumber)) {
        alert("Please enter a valid phone number with at least 10 digits.");
        return; // Stop the form submission
    }

    // Validate email
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
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
