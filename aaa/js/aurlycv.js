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
  
