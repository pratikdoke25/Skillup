
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
        event.preventDefault();
        var formData = new FormData(this);

        // Validate form fields
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.innerText = '';

        var fieldsValid = true;
        var fields = ['name', 'subject', 'message'];
        var phoneInput = document.getElementById('phone');
        var phoneValue = phoneInput.value;
        var emailInput = document.getElementById('email');
        var emailValue = emailInput.value;

        // Regular expressions for validation
        var startsWithLetter = /^[A-Za-z]/; // Starts with a letter
        var containsNumbers = /\d/; // Contains numbers
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validate name, subject, and message
        fields.forEach(function(field) {
            var value = formData.get(field);
            if (field === 'subject' && value.length < 4) {
                errorMessage.innerText += 'Subject must be at least 4 characters long.\n';
                fieldsValid = false;
            } else if (!startsWithLetter.test(value) || containsNumbers.test(value)) {
                errorMessage.innerText += field.charAt(0).toUpperCase() + field.slice(1) + ' must start with a letter and cannot contain numbers.\n';
                fieldsValid = false;
            }
        });

        // Validate phone number
        if (!/^\d{10}$/.test(phoneValue)) {
            errorMessage.innerText += 'Please enter a valid 10-digit phone number.\n';
            fieldsValid = false;
        }

        // Validate email
        if (!emailPattern.test(emailValue)) {
            errorMessage.innerText += 'Please enter a valid email address.\n';
            fieldsValid = false;
        }

        // If all fields are valid, submit the form
        if (fieldsValid) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'submit.php', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        // Show success message in pop-up box
                        var successMessage = document.createElement('div');
                        successMessage.classList.add('success-message');
                        successMessage.innerText = response.message;
                        document.body.appendChild(successMessage);
                        setTimeout(function() {
                            successMessage.remove();
                        }, 5000); // Remove the success message after 5 seconds

                        // Reset form
                        document.getElementById('enquireForm').reset();
                        document.getElementById('charCount').textContent = '0/500 characters'; // Reset character counter
                    } else {
                        errorMessage.innerText = 'An error occurred while submitting the form. Please try again.';
                    }
                } else {
                    errorMessage.innerText = 'An error occurred while submitting the form. Please try again.';
                }
            };
            xhr.send(formData);
        }
    });

