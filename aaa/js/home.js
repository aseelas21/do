// Function to open the notification modal
function openNotificationModal(message) {
    const notificationModal = document.getElementById('notification-modal');
    const notificationMessage = document.getElementById('notification-message');
    notificationMessage.innerText = message;
    notificationModal.style.display = 'block';
  
    // Handle approval
    document.getElementById('approve-btn').addEventListener('click', function() {
      sendApprovalNotification();
      closeNotificationModal();
    });
  
    // Handle disapproval
    document.getElementById('disapprove-btn').addEventListener('click', function() {
      closeNotificationModal();
    });
  }
  
  // Function to close the notification modal
  function closeNotificationModal() {
    const notificationModal = document.getElementById('notification-modal');
    notificationModal.style.display = 'none';
  }
  
  // Function to handle sending the approval notification
  function sendApprovalNotification() {
    // Simulate sending notification to desktophomepage.html
    console.log('Notification sent: Your interview request has been approved.');
  }
  
  // Function to handle sending the data from the interview form
  function handleInterviewFormSubmit(event) {
    event.preventDefault();
    
    const date = document.getElementById('interview-date').value;
    const time = document.getElementById('interview-time').value;
    const note = document.getElementById('interview-note').value;
    
    const message = `Doron Avi would like to set an interview with you on date: ${date}, time: ${time}, notes: ${note}`;
    
    openNotificationModal(message);
  }
  
  // Attach event listener to the interview form submit button
  document.getElementById('interview-form').addEventListener('submit', handleInterviewFormSubmit);
  
