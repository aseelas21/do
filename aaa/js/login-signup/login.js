document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create the payload
    const payload = { email, password };

    console.log(`Submitting to: ${CONFIG.API_URL}/auth/login`);
    console.log("Payload:", payload);

    // Send the data to the server
    try {
      const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Print the raw response for debugging
      console.log("Raw response:", response);

      const result = await response.json();

      if (response.ok) {
        // Store user information in local storage
        localStorage.setItem("user", JSON.stringify(result.user));

        // Display success message
        const successDiv = document.getElementById("login-success");
        successDiv.style.display = "block";
        successDiv.textContent =
          "Login successful! Redirecting to home page...";

        // Redirect to appropriate page based on userType
        const userType = result.user.userType;
        console.log("User type:", userType);
        let redirectUrl = "desktophomepage.html"; // Default redirect for job seekers

        if (userType === "employee") {
          redirectUrl = "home.html"; // Redirect for employee seekers
        }

        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 3000);
      } else {
        const errorDiv = document.getElementById("login-error");
        errorDiv.style.display = "block";
        errorDiv.textContent = "Login failed: " + result.message;
      }
    } catch (error) {
      const errorDiv = document.getElementById("login-error");
      errorDiv.style.display = "block";
      errorDiv.textContent = "Login failed: " + error.message;
    }
  });
