function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Assuming you have input fields with id "username" and "password"
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Define the URL where your login API or server endpoint is located
    const loginUrl = "https://example.com/login"; // Replace with your actual URL

    // Create an object to store the login data
    const loginData = {
        username: username,
        password: password
    };

    // Make an AJAX or Fetch request to perform the login
    fetch(loginUrl, {
        method: 'POST', // Use POST request to send login data
        headers: {
            'Content-Type': 'application/json' // Set the content type
        },
        body: JSON.stringify(loginData) // Send login data as JSON
    })
    .then(response => {
        if (response.ok) {
            // Login successful
            setFormMessage(loginForm, "success", "Login successful");
        } else {
            // Login failed
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }
    })
    .catch(error => {
        // An error occurred during the request
        console.error("Login request error: " + error);
        setFormMessage(loginForm, "error", "An error occurred during login");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});