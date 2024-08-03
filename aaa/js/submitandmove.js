document.addEventListener("DOMContentLoaded", function () {
  const jobForm = document.getElementById("job-form");
  if (!jobForm) {
    console.error("Form with id 'job-form' not found.");
    return;
  }

  jobForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    const jobData = {
      employer_id: 1, // Replace with dynamic value if needed
      title: formData.get("job-title"),
      description: formData.get("description"), // Get the description from the form
      location: formData.get("location"),
      salary: "Negotiable", // Assuming a fixed salary
    };

    console.log("Job data to be sent:", jobData);

    try {
      const response = await fetch(`${CONFIG.API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();

      console.log("Response from server:", result);

      if (response.ok) {
        alert("Job posted successfully!");
        // Optionally, you can redirect or clear the form here
      } else {
        alert("Failed to post job: " + result.message);
      }
    } catch (error) {
      alert("Failed to post job: " + error.message);
    }
  });
});
