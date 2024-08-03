document.addEventListener("DOMContentLoaded", function () {
    const cvModal = document.getElementById("cv-modal");
    const interviewModal = document.getElementById("interview-modal");
    const cvCloseButton = cvModal.querySelector(".close-button");
    const interviewCloseButton = interviewModal.querySelector(".close-button");
    const setInterviewBtn = document.getElementById("set-interview-btn");
    const interviewForm = document.getElementById("interview-form");

    // Open CV modal and load CV content
    function openCvModal(content) {
        const cvContentDiv = document.getElementById("cv-content");
        cvContentDiv.innerHTML = content;
        cvModal.style.display = "block";
    }

    // Open Interview modal
    function openInterviewModal() {
        interviewModal.style.display = "block";

        interviewForm.onsubmit = function (event) {
            event.preventDefault();

            const date = document.getElementById("interview-date").value;
            const time = document.getElementById("interview-time").value;
            const note = document.getElementById("interview-note").value;

            sendInterviewRequest(date, time, note);
        };
    }

    // Close CV modal
    cvCloseButton.addEventListener("click", function () {
        cvModal.style.display = "none";
    });

    // Close Interview modal
    interviewCloseButton.addEventListener("click", function () {
        interviewModal.style.display = "none";
    });

    // Close modals when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === cvModal) {
            cvModal.style.display = "none";
        }
        if (event.target === interviewModal) {
            interviewModal.style.display = "none";
        }
    });

    // Show Interview modal when button is clicked
    setInterviewBtn.addEventListener("click", function () {
        openInterviewModal();
    });

    function sendInterviewRequest(date, time, note) {
        fetch('api/notify-interview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date,
                time,
                note
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Redirect to home page or show success message
            window.location.href = 'home.index.html';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});

