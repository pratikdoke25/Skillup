document.addEventListener('DOMContentLoaded', function() {
    const payButton = document.getElementById('payNowBtn'); // Correctly selecting the 'Pay Now' button by ID
    const modal = document.getElementById('paymentModal');  // Modal element
    const closeModal = document.querySelector('.close');    // Close button inside the modal

    // Event listener for the "Pay Now" button
    payButton.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent default behavior
        modal.style.display = 'block';  // Display the modal
    });

    // Event listener for the close (X) button inside the modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';  // Hide the modal when close button is clicked
    });

    // Event listener to close the modal if user clicks outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';  // Hide the modal
        }
    });
});
// Close Modal
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('paymentModal').style.display = 'none';
});
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the active class from all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add the active class to the clicked tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
