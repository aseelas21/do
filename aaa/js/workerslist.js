document.addEventListener("DOMContentLoaded", function () {
  console.log("Document loaded");
  fetchWorkers();
  setupModal();
});

function fetchWorkers() {
  console.log("Fetching workers...");
  fetch(`${CONFIG.API_URL}/jobSeekers`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((workers) => {
      console.log("Workers fetched:", workers);
      const allWorkersList = document.querySelector("#all-workers .workers-list");
      const suitableWorkersList = document.querySelector("#suitable-workers .workers-list");

      allWorkersList.innerHTML = "";
      suitableWorkersList.innerHTML = "";

      workers.forEach((worker) => {
        const workerItem = document.createElement("div");
        workerItem.className = "worker-item";

        const profilePictureUrl = worker.profile_picture
          ? `${CONFIG.API_URL}/uploads/${worker.profile_picture}`
          : "images/default-profile.png";

        workerItem.innerHTML = `
          <img src="${profilePictureUrl}" alt="Profile Picture">
          <div class="worker-details">
            <h3>${worker.username}</h3>
            <p><strong>Email:</strong> ${worker.email}</p>
            <p><strong>Skills:</strong> ${worker.skills || "Not provided"}</p>
            <i class="fas fa-file-alt document-icon" data-worker-id="${worker.id}"></i>
          </div>
        `;

        allWorkersList.appendChild(workerItem);
      });

      // Attach event listeners to document icons
      const documentIcons = document.querySelectorAll('.document-icon');
      documentIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
          const workerId = event.target.dataset.workerId;
          openModal(workerId);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching workers:", error);
    });
}

function setupModal() {
  const modal = document.getElementById('cv-modal');
  const closeButton = document.querySelector('.close-button');

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Function to open the CV modal
function openModal(workerId) {
  const modal = document.getElementById('cv-modal');
  const cvContent = document.getElementById('cv-content');
  const setInterviewBtn = document.getElementById('set-interview-btn');

  fetch('aurlycv.html')
    .then(response => response.text())
    .then(htmlContent => {
      cvContent.innerHTML = htmlContent;
      modal.style.display = 'block';

      // Add an event listener to the "Set Interview" button
      setInterviewBtn.addEventListener('click', function() {
        openInterviewModal();
      });
    })
    .catch(error => {
      console.error('Error loading CV content:', error);
    });
}

// Function to open the interview modal
function openInterviewModal() {
  const interviewModal = document.getElementById('interview-modal');
  interviewModal.style.display = 'block';
}

// Function to close modals
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

// Close interview modal when close button is clicked
document.querySelector('#interview-modal .close-button').addEventListener('click', function() {
  closeModal('interview-modal');
});

// Close CV modal when close button is clicked
document.querySelector('#cv-modal .close-button').addEventListener('click', function() {
  closeModal('cv-modal');
});



