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
