function submitLogin() {
  // Get form data
  const phone = document.querySelector('input[name="phone"]').value;
  const password = document.querySelector('input[name="password"]').value;
  console.log("test");
  // Send POST request to the backend
  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: phone,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        // Store user data in local storage
        if (data.token) {
          const { userName, name, id } = data;

          // Store user data in local storage
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", userName);
          localStorage.setItem("name", name);
          localStorage.setItem("userId", id);

          // Optionally, you can also set an expiration time for the token
          const expirationTime = new Date().getTime() + 60 * 30 * 1000; // 30 minutes
          localStorage.setItem("tokenExpiration", expirationTime);

          console.log("Token and user data stored successfully");
        } else {
          // Handle the case where no token is received
          console.error("No token received from the server");
        }

        // localStorage.setItem("token", data.token);
        // localStorage.setItem("userName", data.userName);
        // localStorage.setItem("name", data.name);
        // localStorage.setItem("userId", data.id);
        if (data.userType === "admin") {
          // Redirect to the desired page (e.g., customer.html)

          window.location.href =
            "http://localhost:5502/responsive-admin-dashboard/index.html";
        } else {
          window.location.href = "http://localhost:5501/index.html";
        }
      } else {
        // Handle invalid login
        alert(data.error || "Invalid credentials. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}
