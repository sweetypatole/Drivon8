// // Register user
// function registerUser(event) {
//     event.preventDefault();

//     let email = document.getElementById("regEmail").value;
//     let password = document.getElementById("regPassword").value;
//     let msg = document.getElementById("msg");

//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     // Check if user already exists
//     let exists = users.find(user => user.email === email);
//     if (exists) {
//         msg.innerText = "❌ User already exists";
//         return;
//     }

//     // Save new user
//     users.push({ email, password });
//     localStorage.setItem("users", JSON.stringify(users));

//     msg.innerText = "✅ Signup successful! Go to login.";
// }
