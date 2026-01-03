// function loginUser(event) {
//     event.preventDefault();

//     let email = document.getElementById("email").value.trim();
//     let password = document.getElementById("password").value.trim();
//     let error = document.getElementById("error-msg");

    // Empty check
    // if (email === "" || password === "") {
    //     error.innerText = "⚠️ Please fill all fields";
    //     return;
    // }

    // Dummy credentials (for demo)
//     if (email === "user@drivon.com" && password === "12345") {
//         alert("Login Successful!");
//         window.location.href = "index.html"; // your homepage
//     } else {
//         error.innerText = "❌ Invalid Email or Password";
//     }
// }
function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    if (!email || !password) {
        errorMsg.style.color = "red";
        errorMsg.textContent = "Please enter both email and password.";
        return;
    }

    // Get users array from localStorage or initialize empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        // User exists, check password
        if (existingUser.password === password) {
            errorMsg.style.color = "green";
            errorMsg.textContent = "Login successful! Redirecting...";
            
            // Redirect to your homepage after 1 second
            setTimeout(() => {
                window.location.href = "index.html"; // <-- Change this to your home page
            }, 1000);
        } else {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Incorrect password.";
        }
    } else {
        // New user, register automatically
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));

        errorMsg.style.color = "green";
        errorMsg.textContent = "New user registered! Redirecting...";

        // Redirect to homepage after 1 second
        setTimeout(() => {
            window.location.href = "index.html"; // <-- Change this to your home page
        }, 1000);
    }

    // Optional: clear inputs
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}



