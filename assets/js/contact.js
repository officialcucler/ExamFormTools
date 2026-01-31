// Contact form logic
document.addEventListener('DOMContentLoaded', function() {
    const supportForm = document.getElementById('support-form');
    if (!supportForm) return;

    supportForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(supportForm);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!validateForm(data)) {
            return;
        }

        // Construct mailto URL
        const mailtoURL = `mailto:examformtools.in@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;

        // Open mail client
        window.location.href = mailtoURL;

        // Reset form
        supportForm.reset();

        // Show success message
        showMessage('Your email client has been opened with your message. Please send the email to complete submission.', 'success');
    });

    function validateForm(data) {
        const errors = [];

        // Name validation
        if (!data.name.trim()) {
            errors.push('Name is required');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email.trim()) {
            errors.push('Email is required');
        } else if (!emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
        }

        // Subject validation
        if (!data.subject.trim()) {
            errors.push('Subject is required');
        }

        // Message validation
        if (!data.message.trim()) {
            errors.push('Message is required');
        } else if (data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        if (errors.length > 0) {
            showMessage(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.innerHTML = message;

        // Insert before form
        supportForm.parentNode.insertBefore(messageEl, supportForm);

        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                messageEl.remove();
            }, 5000);
        }
    }
});
