document.addEventListener("DOMContentLoaded", function() {
    const signupPopup = document.getElementById('signup');
    const signinPopup = document.getElementById('signin');
    const ConPopup = document.getElementById('con');

    // Show signup popup
    document.getElementById('signup-link').addEventListener('click', function() {
        signupPopup.style.display = 'block';
        signinPopup.style.display = 'none';
        ConPopup.style.display = 'flex';
    });

    // Show signin popup
    document.getElementById('login-link').addEventListener('click', function() {
        signinPopup.style.display = 'block';
        signupPopup.style.display = 'none';
        ConPopup.style.display = 'flex';
    });

    // Close signup popup
    document.querySelector('#signup .close').addEventListener('click', function() {
        signupPopup.style.display = 'none';
        ConPopup.style.display = 'none';
    });

    // Close signin popup
    document.querySelector('#signin .close').addEventListener('click', function() {
        signinPopup.style.display = 'none';
        ConPopup.style.display = 'none';
    });

    // Signup form submission
    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const user = {
            fullName: fullName,
            email: email,
            phone: phone,
            password: password
        };

        // Save user to localStorage
        localStorage.setItem(email, JSON.stringify(user));

        // Redirect to login page
        signupPopup.style.display = 'none';
        signinPopup.style.display = 'block';
    });

    // Signin form submission
    document.getElementById('signin-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        const storedUser = localStorage.getItem(email);

        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.password === password) {
                alert("Login successful");
                // Redirect to home page or do something after successful login
                window.location.href = "LogIndex.html";
            } else {
                alert("Incorrect password");
            }
        } else {
            alert("User not found");
        }
    });
});



// Login Alert//
document.addEventListener("DOMContentLoaded", function() {
    // Add click event listener to all anchor tags
    document.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            alert("Please sign up or login to access this page."); // Show alert message
        });
    });
});
