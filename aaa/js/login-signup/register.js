document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const fullName = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    // Determine the API endpoint based on the role
    let apiEndpoint = `${CONFIG.API_URL}`;
    if (role === "manager") {
      apiEndpoint = `${apiEndpoint}/employeeSeekers`; // Replace with your manager registration API
    } else if (role === "worker") {
      apiEndpoint = `${apiEndpoint}/jobSeekers`; // Replace with your worker registration API
    } else {
      alert("Invalid role selected");
      return;
    }

    // Create the payload
    const payload = {
      username: fullName,
      email: email,
      password: password,
      role: role,
    };

    console.log("Submitting to:", apiEndpoint);
    console.log("Payload:", payload);

    // Send the data to the server
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Print the raw response for debugging
      console.log("Raw response:", response);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();

        // Print the JSON result for debugging
        console.log("JSON response:", result);

        if (response.ok) {
          // Display success message
          const messageDiv = document.getElementById("message");
          messageDiv.style.display = "block";
          messageDiv.classList.add("alert-success");
          messageDiv.textContent =
            "Registration successful! Redirecting to login page...";

          // Redirect to login page after 3 seconds
          setTimeout(() => {
            window.location.href = "index.html";
          }, 3000);
        } else {
          const messageDiv = document.getElementById("message");
          messageDiv.style.display = "block";
          messageDiv.classList.add("alert-danger");
          messageDiv.textContent = "Registration failed: " + result.message;
        }
      } else {
        const text = await response.text();
        console.log("Text response:", text);
        const messageDiv = document.getElementById("message");
        messageDiv.style.display = "block";
        messageDiv.classList.add("alert-danger");
        messageDiv.textContent =
          "Registration failed: Unexpected response format";
      }
    } catch (error) {
      console.error("Error:", error);
      const messageDiv = document.getElementById("message");
      messageDiv.style.display = "block";
      messageDiv.classList.add("alert-danger");
      messageDiv.textContent = "Registration failed: " + error.message;
    }
  });
