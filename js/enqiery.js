
    // Toggle form visibility
    document.getElementById('enquireButton').addEventListener('click', function() {
        var formContainer = document.getElementById('enquireFormContainer');
        formContainer.style.display = (formContainer.style.display === 'block' ? 'none' : 'block');
    });

    // Reset form and hide on cancel
    document.getElementById('cancelButton').addEventListener('click', function() {
        document.getElementById('enquireForm').reset();
        document.getElementById('errorMessage').textContent = '';
        document.getElementById('enquireFormContainer').style.display = 'none';
        document.getElementById('charCount').textContent = '0/500 characters'; // Reset character counter
    });

    // Character counter for the message field
    document.getElementById('message').addEventListener('input', function() {
        var messageLength = this.value.length;
        document.getElementById('charCount').textContent = messageLength + '/500 characters';
    });

    // Form submission handling
    document.getElementById('enquireForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
    
        var form = this;
        var formData = new FormData(form);
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.innerText = '';
    
        var fieldsValid = true;
        var fields = ['name', 'message']; // Ensure 'subject' exists in the form
        var phoneValue = document.getElementById('phone').value;
        var emailValue = document.getElementById('email').value;
    
        // Regular expressions for validation
        var startsWithLetter = /^[A-Za-z]/; // Starts with a letter
        var containsNumbers = /\d/; // Contains numbers
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // Validate name and message
        fields.forEach(function(field) {
            var value = formData.get(field);
            if (!value) {
                errorMessage.innerText += field.charAt(0).toUpperCase() + field + ' is required.\n';
                fieldsValid = false;
                return; // Exit early if field is empty
            }
            if (!startsWithLetter.test(value) || containsNumbers.test(value)) {
                errorMessage.innerText += field.charAt(0).toUpperCase() + field.slice(1) + ' must start with a letter and cannot contain numbers.\n';
                fieldsValid = false;
            }
        });
    
        // Validate phone number
        // if (!/^\d{10}$/.test(phoneValue)) {
        //     errorMessage.innerText += 'Please enter a valid 10-digit phone number.\n';
        //     fieldsValid = false;
        // }
    
        // // Validate email
        // if (!emailPattern.test(emailValue)) {
        //     errorMessage.innerText += 'Please enter a valid email address.\n';
        //     fieldsValid = false;
        // }
    
        // If any field is invalid, stop further processing
        if (!fieldsValid) {
            return;
        }

        // Handle successful validation and submission
        const accessKeyInput = form.querySelector('input[name="access_key"]');
        if (!accessKeyInput) {
            errorMessage.textContent = "Error: Form must include an 'access_key' field. Visit Docs for help.";
            return;
        }

        // Get input values
        const name = formData.get('name').trim();
        const email = emailValue.trim();
        const phone = phoneValue.trim();
        const message = formData.get('message').trim();
        const accessKey = accessKeyInput.value.trim(); // Access key from the form

        const submissionData = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            access_key: accessKey // Include access key in the request
        };

        fetch('https://api.web3forms.com/submit', { // Replace with your actual API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(submissionData)
        })
        .then(async (response) => {
            if (response.ok) { // Check if the response is successful
                console.log("Form submitted successfully");
                alert('Thank you! Your message has been sent.');
                sendWhatsAppMessage(name, phone, message); // Send WhatsApp message
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
    });

