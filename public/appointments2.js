// // display


// // generalMessageInput-container-body-form
// document.addEventListener('DOMContentLoaded', function () {
 
//     fetch('/get-user')
//       .then(response => response.json())
//       .then(data => {
//    //     console.log('Fetched username from server:', data.username, data.currentAccount, data.accountBallance, data.accountPhonenumber, data.accountEmail, data.invitationLink );
  
//   //  const username = data.username.split(" ")[0];
//   const email = data.email;
//   // const role = data.role;
  
  
//   // document.getElementById('user_name').textContent = ` ${role}`;
//   document.getElementById('emailContent').textContent = ` ${email}`;
        
//       })
//       .catch(error => {
//         console.error('Error fetching username:', error);
//         // Handle the error and maybe redirect to the login page showLoadingSpinner()
//        });
//    });


// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("appointmentForm");
//     const bookingForm = document.getElementById("bookingForm");
//     const openBookingFormBtn = document.getElementById("openBookingForm");
//     const appointmentsContainer = document.getElementById("appointmentsContainer");
  
//     openBookingFormBtn.addEventListener("click", () => {
//       bookingForm.style.display = bookingForm.style.display === "none" ? "block" : "none";
//     });
  
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const appointment = {
//         withWhom: document.getElementById("withWhom").value,
//         date: document.getElementById("appointmentDate").value,
//         location: document.getElementById("location").value,
//         contact: document.getElementById("contact").value,
//         address: document.getElementById("address").value,
//         about: document.getElementById("about").value,
//       };
  
//       try {
//         const response = await fetch("/create-appointment", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(appointment),
//         });
//         const data = await response.json();
//         alert(data.message);
//         fetchAppointments();
//         form.reset();
//         bookingForm.style.display = "none";
//       } catch (err) {
//         console.error(err);
//       }
//     });
  
//     async function fetchAppointments() {
//       try {
//         const response = await fetch("/appointments");
//         const appointments = await response.json();
//         renderAppointments(appointments);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       }
//     }
  
//     function renderAppointments(appointments) {
//       appointmentsContainer.innerHTML = "";
//       appointments.forEach((appointment) => {
//         const card = document.createElement("div");
//         card.classList.add("appointment-card");
//         const appointmentDate = new Date(appointment.date).toLocaleString("en-US", { year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//           hour: 'numeric',
//           minute: 'numeric',
//           hour12: true, });
             
//         card.innerHTML = `
//           <h4 style = "border-bottom: solid lightgray 1pt; padding:5px; text-align: center">Your appointments with other people</h4>        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>You have appointment with</strong>: ${appointment.withWhom}</p>
//           <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>On</strong>: <span class="appointment-date">${appointmentDate}</span></p>
//           <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>About</strong>: <span class="appointment-about">${appointment.about}</span></p>
//           <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Location</strong>: <span class="appointment-location">${appointment.location}</span></p>
//           <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Address</strong>: <span class="appointment-address">${appointment.address}</span></p>
//           <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Contact</strong>: ${appointment.contact}</p>
//           <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Status</strong>: <span class="appointment-address">${appointment.status}</span></p>
//           <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment ID</strong>: <span class="appointment-address">${appointment.appointment_id}</span></p><br>
  
//           <div class="edit-section" style="display:none;">
//           <h4>Edit your appointment</h4>
//             Date:<br> <input type="datetime-local" style = "width:85%; padding:14px; border-radius: 7px" class="edit-date" value="${appointment.date.slice(0, 16)}" /><br><br>
//             About:<br> <input type="text" style = "width:85%" class="edit-about" value="${appointment.about}" placeholder="Edit about the appointment" /><br>
//             Location:<br> <input type="text" style = "width:85%" class="edit-location" value="${appointment.location}" placeholder="Edit appointment Location" /><br>
//             Address:<br> <input type="text"  style = "width:85%" class="edit-address" value="${appointment.address}" placeholder="Edit apointment Address" /><br>
//             <button class="save-edit" data-id="${appointment.appointment_id}">Save</button>
//             <button class="cancel-edit">Cancel</button>
//           </div>
//           <button class="edit-btn" data-id="${appointment.appointment_id}">Edit</button>
//           <button class ="other-btns" onclick="cancelAppointment('${appointment.appointment_id}')">Cancel</button>
//           <button class ="other-btns2" onclick="checkIn('${appointment.appointment_id}')">Check-in</button>
//           <button class ="other-btns3" onclick="markMissed('${appointment.appointment_id}')">Missed</button>
//         `;
//         appointmentsContainer.appendChild(card);
//       });
//       attachEditHandlers();
//     }
  
//     function attachEditHandlers() {
//       document.querySelectorAll(".edit-btn").forEach((btn) => {
//         btn.addEventListener("click", (e) => {
         
//           const card = e.target.closest(".appointment-card");
//           document.querySelector(".other-btns").style.display = "none";
//           document.querySelector(".other-btns2").style.display = "none";
//           document.querySelector(".other-btns3").style.display = "none";
//           card.querySelector(".edit-section").style.display = "block";
//           e.target.style.display = "none";
          
//         });
//       });
  
//       document.querySelectorAll(".cancel-edit").forEach((btn) => {
//         btn.addEventListener("click", (e) => {
//           const card = e.target.closest(".appointment-card");
//           card.querySelector(".edit-section").style.display = "none";
          
//           card.querySelector(".edit-btn").style.display = "block";
//           fetchAppointments();
//         });
//       });
  
//       document.querySelectorAll(".save-edit").forEach((btn) => {
//         btn.addEventListener("click", async (e) => {
//           const card = e.target.closest(".appointment-card");
//           const newDate = card.querySelector(".edit-date").value;
//           const newAbout = card.querySelector(".edit-about").value;
//           const newLocation = card.querySelector(".edit-location").value;
//           const newAddress = card.querySelector(".edit-address").value;
//           const id = e.target.getAttribute("data-id");
          
  
//           if (newDate) {
//             try {
//               await fetch(`/edit-appointment/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   date: new Date(newDate).toISOString().slice(0, 19).replace("T", " "),
//                   about: newAbout,
//                   location: newLocation,
//                   address: newAddress,
//                 }),
//               });
//               fetchAppointments();
//             } catch (err) {
//               console.error("Failed to update appointment", err);
//             }
//           }
//         });
//       });
//     }
  
//     window.cancelAppointment = async (id) => {
//       if (confirm("Are you sure you want to cancel this appointment?")) {
//         await fetch(`/cancel-appointment/${id}`, { method: "DELETE" });
//         fetchAppointments();
//       }
//     };
  
  
//     window.declineApointment = async (id) => {
//       if (confirm("Are you sure you want to Decline this appointment?")) {
//           try {
//               const response = await fetch(`/decline-appointment/${id}`, { method: "POST" });
  
//               if (!response.ok) {
//                   const errorData = await response.json();
//                   alert(`Error: ${errorData.message}`);
//               } else {
//                   const successData = await response.json();
//                   alert(successData.message); // Display success message
//               }
//           } catch (error) {
//               console.error("Request failed:", error);
//               alert("An error occurred. Please try again later.");
//           }
          
//       }
//   };
  
//   window.checkIn = async (id) => {
//       if (confirm("Are you sure you want to confirm check-in? This cannot be undone")) {
//           try {
//               const response = await fetch(`/check-in/${id}`, { method: "POST" });
  
//               if (!response.ok) {
//                   const errorData = await response.json();
//                   alert(`Error: ${errorData.message}`);
//               } else {
//                   const successData = await response.json();
//                   alert(successData.message); // Display success message
//               }
//           } catch (error) {
//               console.error("Request failed:", error);
//               alert("An error occurred. Please try again later.");
//           }
//           fetchAppointments();
          
//       }
//   };
  
//   window.markMissed = async (id) => {
//       if (confirm("Are you sure you missed this appointment? This cannot be undone")) {
//           try {
//               const response = await fetch(`/mark-missed/${id}`, { method: "POST" });
  
//               if (!response.ok) {
//                   const errorData = await response.json();
//                   alert(`Error: ${errorData.message}`);
//               } else {
//                   const successData = await response.json();
//                   alert(successData.message); // Display success message
//               }
//           } catch (error) {
//               console.error("Request failed:", error);
//               alert("An error occurred. Please try again later.");
//           }
//           fetchAppointments();
          
//       }
//   };
  
  
//     fetchAppointments();
//   });
  
  


// generalMessageInput-container-body-form
document.addEventListener('DOMContentLoaded', function () {
 
  fetch('/get-user')
    .then(response => response.json())
    .then(data => {
 //     console.log('Fetched username from server:', data.username, data.currentAccount, data.accountBallance, data.accountPhonenumber, data.accountEmail, data.invitationLink );

//  const username = data.username.split(" ")[0];
const email = data.email;
// const role = data.role;


// document.getElementById('user_name').textContent = ` ${role}`;
document.getElementById('emailContent').textContent = ` ${email}`;
      
    })
    .catch(error => {
      console.error('Error fetching username:', error);
      // Handle the error and maybe redirect to the login page showLoadingSpinner()
     });
 });



document.addEventListener("DOMContentLoaded", () => {
  fetchSentReports(); // Load reports

  const editModal = document.getElementById("editReportModal");
  const closeModal = document.querySelector(".close-btn");
  const saveEditButton = document.getElementById("saveEdit");

  // Fetch Sent Reports
  async function fetchSentReports() {
      try {
          const response = await fetch("/fetch-sent-reports");
          const reports = await response.json();
          const reportDiv = document.getElementById("medical_report");
          reportDiv.innerHTML = "";
  
          reports.forEach(report => {
              const reportItem = document.createElement("div");
              reportItem.classList.add("report-card");
  
              const reportDate = new Date(report.date).toLocaleString();
  
              reportItem.innerHTML = `
                  <div class="report-header">
                      <p class="report-email"><strong>Patient:</strong> ${report.email}</p>
                      <p class="report-time">${reportDate}</p>
                  </div>
                  <div class="report-body">
                      <p><strong>Description:</strong> ${report.description}</p>
                      <p><strong>Status:</strong> <span class="report-status">${report.status}</span></p>
                  </div>
                  <div class="report-footer">
                      <button class="edit-btn" data-id="${report.report_id}" data-description="${report.description}" data-status="${report.status}">✏ Edit</button>
                  </div>
              `;
  
              reportDiv.appendChild(reportItem);
          });
  
          // Attach event listeners to edit buttons
          document.querySelectorAll(".edit-btn").forEach(button => {
              button.addEventListener("click", function() {
                  showEditForm(this.dataset.id, this.dataset.description, this.dataset.status);
              });
          });
      } catch (error) {
          console.error("Error fetching reports:", error);
      }
  }
  
  // Show Edit Form in Modal
  function showEditForm(report_id, description, status) {
      document.getElementById("edit_report_id").value = report_id;
      document.getElementById("edit_description").value = description;
      document.getElementById("edit_status").value = status;
      editModal.style.display = "flex"; // Show modal
  }

  // Close Modal when Clicking X
  closeModal.addEventListener("click", () => {
      editModal.style.display = "none";
  });

  // Close Modal when Clicking Outside
  window.addEventListener("click", (event) => {
      if (event.target === editModal) {
          editModal.style.display = "none";
      }
  });

  // Submit New Report
  document.getElementById("medicalreport").addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("report_email").value;
      const description = document.getElementById("report_description").value;
      const status = document.getElementById("report_status").value;

      try {
          const response = await fetch("/insert-report", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, description, status })
          });

          const data = await response.json();
          alert(data.message);

          if (response.ok) {
              this.reset(); // Clear form
              fetchSentReports(); // Reload reports
          }
      } catch (error) {
          console.error("Error submitting report:", error);
      }
  });

  // Save Changes in Modal
  saveEditButton.addEventListener("click", async function () {
      const report_id = document.getElementById("edit_report_id").value;
      const description = document.getElementById("edit_description").value;
      const status = document.getElementById("edit_status").value;

      try {
          const response = await fetch("/update-report", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ report_id, description, status })
          });

          const data = await response.json();
          alert(data.message);

          if (response.ok) {
              fetchSentReports();
              editModal.style.display = "none"; // Close modal
          }
      } catch (error) {
          console.error("Error updating report:", error);
          alert("Failed to update report.");
      }
  });

  
});



document.addEventListener("DOMContentLoaded", () => {
  fetchSentReports2(); // Load reports

  // Fetch Sent Reports
  async function fetchSentReports2() {
      try {
          const response = await fetch("/fetch-sent-reports2");
          const reports2 = await response.json();
          const reportDiv = document.getElementById("medical_report2");
          reportDiv.innerHTML = "";
  
          reports2.forEach(report => {
              const reportItem = document.createElement("div");
              reportItem.classList.add("report-card");
  
              const reportDate = new Date(report.date).toLocaleString();
  
              reportItem.innerHTML = `
                  <div class="report-header">
                      <p class="report-email"><strong>Dr.</strong> ${report.username}</p>
                      <p class="report-time">${reportDate}</p>
                  </div>
                  <div class="report-body">
                      <p><strong>Description:</strong> ${report.description}</p>
                      <p><strong>Status:</strong> <span class="report-status">${report.status}</span></p>
                      <p><strong>Type:</strong> <span class="report-status">Medical Report</span></p>

                  </div>
                  <div class="report-footer">
                    
                  </div>
              `;
  
              reportDiv.appendChild(reportItem);
          });
  
      } catch (error) {
          console.error("Error fetching reports:", error);
      }
  }
  

  
});


const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', async () => {
// Confirming if user realy wants to logout
const confirmLogout = window.confirm('Are you sure you want to logout?');

if (confirmLogout) {
// If the user confirms, make a request to the logout route on the server
const response = await fetch('/logout', { method: 'GET' });

if (response.ok) {
  // If the logout was successful, redirect the user to the login page
  window.location.href = '/auth';
} else {
  // Handle any errors that occurred during logout
  console.error('Error during logout:', response.statusText);
  // Displaying any error message
}
}
// Handling incase the user cancels
 });