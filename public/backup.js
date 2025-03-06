// generalNotificationForm
// Sending /getGeneralNotifications notification
document.addEventListener('DOMContentLoaded', (event) => {
    const sendSpecificButton = document.getElementById('sendSpecificButton');
  
    sendSpecificButton.addEventListener('click', () => {
      const username = document.getElementById('specificUsernameInput').value.trim();
      const message = document.getElementById('specificMessageInput').value.trim();
  
      if (username && message) {
        validateUsername(username, (isValid) => {
          if (isValid) {
            sendSpecificNotification(username, message);
          } else {
            alert('Recipient not found. Please check email and try again');
          }
        });
      } else {
        alert('Both username and message are required.');
      }
    });
  });
  
  function validateUsername(username, callback) {
    fetch(`/validateUsername?username=${encodeURIComponent(username)}`)
      .then(response => response.json())
      .then(data => {
        callback(data.exists);
      })
      .catch(error => console.error('Error validating username:', error));
  }
  
  function sendSpecificNotification(username, message) {
    const data = { username, message };
    
    fetch('/sendSpecificNotification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Notification sent successfully.');
        updateNotificationIcon();
      } else {
        alert('Failed to send notification. This can happen if you try to notify yourself');
      }
    })
    .catch(error => console.error('Error sending notification:', error));
 }



//  // Function to handle the form submission and send the general notification request to the backend
//  document.getElementById('generalNotificationForm').addEventListener('submit', async function (event) {
//     event.preventDefault();  // Prevent default form submission
    
//     const message = document.getElementById('generalMessageInput').value;
    
//     // Check if the message is empty
//     if (!message.trim()) {
//       document.getElementById('responseMessage').innerHTML = 'Please enter notification.';
//       return;
//     }

//     try {
//       // Show loading message while waiting for the response
//       document.getElementById('responseMessage').innerHTML = 'Sending notification...';

//       // Send the notification request to the backend
//       const response = await fetch('/sendGeneralNotification', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: message }),
//       });

//       const data = await response.json();

//       // Check the response from the backend
//       if (data.success) {
//         document.getElementById('responseMessage').innerHTML = `<span style="color: green;">${data.message}</span>`;
//       } else {
//         document.getElementById('responseMessage').innerHTML = `<span style="color: red;">${data.message}</span>`;
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       document.getElementById('responseMessage').innerHTML = '<span style="color: red;">An error occurred. Please try again.</span>';
//     }
//   });


  // Function to handle the emergency form submission and send the general notification request to the backend
 document.getElementById('emergency_form').addEventListener('submit', async function (event) {
  event.preventDefault();  // Prevent default form submission
  
  const emergencymessage = document.getElementById('emergencyMessageInput').value;
  
  // Check if the emergencymessage is empty
  if (!emergencymessage.trim()) {
    document.getElementById('emergencyresponseMessage').innerHTML = 'Please enter emergency notification.';
    return;
  }

  try {
    // Show loading emergencymessage while waiting for the response
    document.getElementById('emergencyresponseMessage').innerHTML = 'Sending notification...';

    // Send the notification request to the backend
    const response = await fetch('/emergencyNotification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emergencymessage: emergencymessage }),
    });

    const data = await response.json();

    // Check the response from the backend
    if (data.success) {
      document.getElementById('emergencyresponseMessage').innerHTML = `<span style="color: green;">${data.message}</span>`;
    } else {
      document.getElementById('emergencyresponseMessage').innerHTML = `<span style="color: red;">${data.message}</span>`;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('emergencyresponseMessage').innerHTML = '<span style="color: red;">An error occurred. Please try again.</span>';
  }
});


async function fetchemergencys() {
  try {
      const response = await fetch(`/emergencys`);
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const emergencys = await response.json();

      const emergencylist = document.getElementById("emergencylist");
      emergencylist.innerHTML = "";

      emergencys.forEach(emergency => {
          const li = document.createElement("li");
          const emergencyDate = new Date(emergency.timestamp).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,  // This ensures AM/PM format
        });
        
          li.innerHTML = `${emergency.emergency} <br> ${emergencyDate} 
                          <button onclick="deleteemergency(${emergency.id})">Delete if solved</button>`;
          emergencylist.appendChild(li);
      });
  } catch (error) {
      console.error(error);
      document.getElementById("emergencylist").textContent = "Failed to load emergencies.";
      // alert("Failed to load emergencies.");
  }
}


// Delete an emergency with confirmation and proper error handling
async function deleteemergency(emergencyId) {
  if (!confirm("Are you sure you want to delete this emergency?")) {
      return; // Stop if user cancels
  }

  try {
      const response = await fetch("/delete-emergency", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emergency_id: emergencyId }) // Removed email
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete emergency.");
      }

      const data = await response.json();
      alert(data.message);
      fetchemergencys(); // Refresh emergency list
  } catch (error) {
      console.error(error);
      alert(`Error deleting emergency: ${error.message}`);
  }
}



async function fetchemergencys2() {
  try {
      const response = await fetch(`/emergencys2`);
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const emergencys2 = await response.json();

      const emergencylist2 = document.getElementById("emergencylist2");
      emergencylist2.innerHTML = "";

      emergencys2.forEach(emergency2 => {
          const li = document.createElement("li");
          const emergency2Date = new Date(emergency2.timestamp).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,  // This ensures AM/PM format
        });
        
          li.innerHTML = `${emergency2.emergency} <br> This is a: ${emergency2.role} <br>  Contact: ${emergency2.contact}  <br> ${emergency2Date}
                                    <button>I still need help</button>`;

          emergencylist2.appendChild(li);
      });
  } catch (error) {
      console.error(error);
      document.getElementById("emergencylist2").textContent = "Failed to load other peoples emergencies.";
      // alert("Failed to load emergencies.");
  }
}


// // Delete an emergency with confirmation and proper error handling
// async function deleteemergency2(emergency2Id) {
//   if (!confirm("Are you sure you want to delete this emergency?")) {
//       return; // Stop if user cancels
//   }

//   try {
//       const response = await fetch("/delete-emergency", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ emergency2_id: emergency2Id }) // Removed email
//       });

//       if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Failed to delete emergency.");
//       }

//       const data = await response.json();
//       alert(data.message);
//       fetchemergencys(); // Refresh emergency list
//   } catch (error) {
//       console.error(error);
//       alert(`Error deleting emergency: ${error.message}`);
//   }
// }

// emergency Schedule

document.addEventListener("DOMContentLoaded", function () {
  fetchemergencys();
  fetchemergencys2();
});




document.addEventListener('DOMContentLoaded', () => {
  const usernameElement = document.getElementById('emailContent');
  const notificationIcon = document.querySelector('.notification-icon');
  const notificationsContainer = document.querySelector('.notifications2-container');
  const notificationsBody = document.querySelector('.notifications-body');

  if (usernameElement) {
      const observer = new MutationObserver(() => {
          const username = usernameElement.textContent.trim();
          if (username) {
              observer.disconnect(); // Stop observing once the username is found

              // Fetch unread notifications count on page load
              fetch(`/unreadNotificationsCount?username=${encodeURIComponent(username)}`)
                  .then(response => response.json())
                  .then(data => {
                      if (data.success) {
                          document.querySelector('.notification-count').textContent = data.unreadCount;
                      }
                  })
                  .catch(error => console.error('Error fetching unread notifications count:', error));

              // Show notifications dropdown when the notification icon is clicked
              notificationIcon.addEventListener('click', () => {
                  notificationsContainer.classList.toggle('visible');

                  // Fetch and display notifications
                  if (notificationsContainer.classList.contains('visible')) {
                      fetch(`/getNotifications?username=${encodeURIComponent(username)}`)
                          .then(response => response.json())
                          .then(data => {
                              if (data.success) {
                                  notificationsBody.innerHTML = ''; // Clear previous notifications
                                  data.notifications.forEach(notification => {
                                      const notificationElement = document.createElement('div');
                                      notificationElement.className = 'notification-item';

                                      // Apply styles based on the is_read status from the database
                                      if (notification.is_read === 1) {
                                          notificationElement.classList.add('read');
                                      } else {
                                          notificationElement.classList.add('unread');
                                      }

                                      // Container for message and timestamp
                                      const contentContainer = document.createElement('div');
                                      contentContainer.className = 'notification-content';

                                      // Format the notification content
                                      const messageContent = document.createElement('p');
                                      messageContent.textContent = notification.message;

                                      // Format the notification content
                                      const messageSender = document.createElement('p');
                                      messageSender.textContent = `Sent by: ${notification.contact}`;

                                      // Format the timestamp
                                      const timestampElement = document.createElement('p');
                                      timestampElement.className = 'timestamp';
                                      const timestamp = new Date(notification.timestamp);
                                      timestampElement.textContent = timestamp.toLocaleString(); // Display date and time

                                      // Append elements to the notification container
                                      contentContainer.appendChild(messageContent);
                                      contentContainer.appendChild(messageSender);
                                      contentContainer.appendChild(timestampElement);
                                      notificationElement.appendChild(contentContainer);

                                      // Add a "Mark as Read" button only if the notification is unread
                                      if (notification.is_read === 0) {
                                          const markAsReadButton = document.createElement('button');
                                          markAsReadButton.textContent = 'Read';
                                          markAsReadButton.className = 'mark-as-read-btn';
                                          markAsReadButton.addEventListener('click', () => {
                                              fetch('/markAsRead', {
                                                  method: 'POST',
                                                  headers: {
                                                      'Content-Type': 'application/json',
                                                  },
                                                  body: JSON.stringify({ notificationId: notification.id }),
                                              })
                                              .then(response => response.json())
                                              .then(data => {
                                                  if (data.success) {
                                                      notificationElement.classList.remove('unread');
                                                      notificationElement.classList.add('read');
                                                      updateUnreadCount(username); // Update the unread count
                                                      markAsReadButton.remove(); // Remove the button after marking as read
                                                  }
                                              })
                                              .catch(error => console.error('Error marking notification as read:', error));
                                          });
                                          notificationElement.appendChild(markAsReadButton);
                                      }

                                      notificationsBody.appendChild(notificationElement);
                                  });
                              }
                          })
                          .catch(error => console.error('Error fetching notifications:', error));
                  }
              });

              // Close the dropdown when clicking outside of it
              document.addEventListener('click', (event) => {
                  if (!notificationsContainer.contains(event.target) && !notificationIcon.contains(event.target)) {
                      notificationsContainer.classList.remove('visible');
                  }
              });
          }
      });

      observer.observe(usernameElement, { childList: true, subtree: true });
  } else {
      console.error('Username display element not found');
  }

  // Helper function to update unread notifications count
  function updateUnreadCount(username) {
      fetch(`/unreadNotificationsCount?username=${encodeURIComponent(username)}`)
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  document.querySelector('.notification-count').textContent = data.unreadCount;
              }
          })
          .catch(error => console.error('Error updating unread notifications count:', error));
  }
});



// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("appointmentForm");
//   const bookingForm = document.getElementById("bookingForm");
//   const openBookingFormBtn = document.getElementById("openBookingForm");
//   const appointmentsContainer = document.getElementById("appointmentsContainer");

//   openBookingFormBtn.addEventListener("click", () => {
//     bookingForm.style.display = bookingForm.style.display === "none" ? "block" : "none";
//   });

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const appointment = {
//       withWhom: document.getElementById("withWhom").value,
//       date: document.getElementById("appointmentDate").value,
//       location: document.getElementById("location").value,
//       contact: document.getElementById("contact").value,
//       address: document.getElementById("address").value,
//       about: document.getElementById("about").value,
//     };

//     try {
//       const response = await fetch("/create-appointment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(appointment),
//       });
//       const data = await response.json();
//       alert(data.message);
//       fetchAppointments();
//       form.reset();
//       bookingForm.style.display = "none";
//     } catch (err) {
//       console.error(err);
//     }
//   });

//   async function fetchAppointments() {
//     try {
//       const response = await fetch("/appointments");
//       const appointments = await response.json();
//       renderAppointments(appointments);
//     } catch (err) {
//       console.error("Failed to fetch appointments", err);
//     }
//   }

//   function renderAppointments(appointments) {
//     appointmentsContainer.innerHTML = "";
//     appointments.forEach((appointment) => {
//       const card = document.createElement("div");
//       card.classList.add("appointment-card");
//       const appointmentDate = new Date(appointment.date).toLocaleString("en-US", { hour12: true });

//       card.innerHTML = `
//         <h4>With: ${appointment.withWhom}</h4>
//         <p>Date: <span class="appointment-date">${appointmentDate}</span></p>
//         <p>About: ${appointment.about}</p>
//         <p>Location: ${appointment.location}</p>
//         <p>Contact: ${appointment.contact}</p>
//         <p>Address: ${appointment.address}</p>
//         <div class="edit-section" style="display:none;">
//           <input type="datetime-local" class="edit-date" value="${appointment.date.slice(0, 16)}" />
//           <button class="save-edit" data-id="${appointment.appointment_id}">Save</button>
//           <button class="cancel-edit">Cancel</button>
//         </div>
//         <button class="edit-btn" data-id="${appointment.appointment_id}">Edit</button>
//         <button onclick="cancelAppointment('${appointment.appointment_id}')">Cancel</button>
//         <button onclick="checkIn('${appointment.appointment_id}')">Check-in</button>
//         <button onclick="markMissed('${appointment.appointment_id}')">Missed</button>
//       `;
//       appointmentsContainer.appendChild(card);
//     });
//     attachEditHandlers();
//   }

//   function attachEditHandlers() {
//     document.querySelectorAll(".edit-btn").forEach((btn) => {
//       btn.addEventListener("click", (e) => {
//         const card = e.target.closest(".appointment-card");
//         card.querySelector(".edit-section").style.display = "block";
//         e.target.style.display = "none";
//       });
//     });

//     document.querySelectorAll(".cancel-edit").forEach((btn) => {
//       btn.addEventListener("click", (e) => {
//         const card = e.target.closest(".appointment-card");
//         card.querySelector(".edit-section").style.display = "none";
//         card.querySelector(".edit-btn").style.display = "block";
//       });
//     });

//     document.querySelectorAll(".save-edit").forEach((btn) => {
//       btn.addEventListener("click", async (e) => {
//         const card = e.target.closest(".appointment-card");
//         const newDate = card.querySelector(".edit-date").value;
//         const id = e.target.getAttribute("data-id");
//         if (newDate) {
//           try {
//             await fetch(`/edit-appointment/${id}`, {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ date: new Date(newDate).toISOString().slice(0, 19).replace("T", " ") }),
//             });
//             fetchAppointments();
//           } catch (err) {
//             console.error("Failed to update appointment", err);
//           }
//         }
//       });
//     });
//   }

//   window.cancelAppointment = async (id) => {
//     if (confirm("Are you sure you want to cancel this appointment?")) {
//       await fetch(`/cancel-appointment/${id}`, { method: "DELETE" });
//       fetchAppointments();
//     }
//   };

//   window.checkIn = async (id) => {
//     await fetch(`/check-in/${id}`, { method: "POST" });
//     fetchAppointments();
//   };

//   window.markMissed = async (id) => {
//     await fetch(`/mark-missed/${id}`, { method: "POST" });
//     fetchAppointments();
//   };

//   fetchAppointments();
// });



document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");
  const bookingForm = document.getElementById("bookingForm");
  const openBookingFormBtn = document.getElementById("openBookingForm");
  const appointmentsContainer = document.getElementById("appointmentsContainer");

  openBookingFormBtn.addEventListener("click", () => {
    bookingForm.style.display = bookingForm.style.display === "none" ? "block" : "none";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const appointment = {
      withWhom: document.getElementById("withWhom").value,
      date: document.getElementById("appointmentDate").value,
      location: document.getElementById("location").value,
      contact: document.getElementById("contact").value,
      address: document.getElementById("address").value,
      about: document.getElementById("about").value,
    };

    try {
      const response = await fetch("/create-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });
      const data = await response.json();
      alert(data.message);
      fetchAppointments();
      form.reset();
      bookingForm.style.display = "none";
    } catch (err) {
      console.error(err);
    }
  });

  async function fetchAppointments() {
    try {
      const response = await fetch("/appointments");
      const appointments = await response.json();
      renderAppointments(appointments);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  }

  function renderAppointments(appointments) {
    appointmentsContainer.innerHTML = "";
    appointments.forEach((appointment) => {
      const card = document.createElement("div");
      card.classList.add("appointment-card");
      const appointmentDate = new Date(appointment.date).toLocaleString("en-US", { year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, });
           
      card.innerHTML = `
        <h4 style = "border-bottom: solid lightgray 1pt; padding:5px; text-align: center">Your appointments with other people</h4>        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>You have appointment with</strong>: ${appointment.withWhom}</p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>On</strong>: <span class="appointment-date">${appointmentDate}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>About</strong>: <span class="appointment-about">${appointment.about}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Location</strong>: <span class="appointment-location">${appointment.location}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Address</strong>: <span class="appointment-address">${appointment.address}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Contact</strong>: ${appointment.contact}</p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Status</strong>: <span class="appointment-address">${appointment.status}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment ID</strong>: <span class="appointment-address">${appointment.appointment_id}</span></p>

        <div class="edit-section" style="display:none;">
        <h4>Edit your appointment</h4>
          Date:<br> <input type="datetime-local" style = "width:85%; padding:14px; border-radius: 7px" class="edit-date" value="${appointment.date.slice(0, 16)}" /><br><br>
          About:<br> <input type="text" style = "width:85%" class="edit-about" value="${appointment.about}" placeholder="Edit about the appointment" /><br>
          Location:<br> <input type="text" style = "width:85%" class="edit-location" value="${appointment.location}" placeholder="Edit appointment Location" /><br>
          Address:<br> <input type="text"  style = "width:85%" class="edit-address" value="${appointment.address}" placeholder="Edit apointment Address" /><br>
          <button class="save-edit" data-id="${appointment.appointment_id}">Save</button>
          <button class="cancel-edit">Cancel</button>
        </div>
        <button class="edit-btn" data-id="${appointment.appointment_id}">Edit</button>
        <button class ="other-btns" onclick="cancelAppointment('${appointment.appointment_id}')">Cancel</button>
        <button class ="other-btns2" onclick="checkIn('${appointment.appointment_id}')">Check-in</button>
        <button class ="other-btns3" onclick="markMissed('${appointment.appointment_id}')">Missed</button>
      `;
      appointmentsContainer.appendChild(card);
    });
    attachEditHandlers();
  }

  function attachEditHandlers() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
       
        const card = e.target.closest(".appointment-card");
        document.querySelector(".other-btns").style.display = "none";
        document.querySelector(".other-btns2").style.display = "none";
        document.querySelector(".other-btns3").style.display = "none";
        card.querySelector(".edit-section").style.display = "block";
        e.target.style.display = "none";
        
      });
    });

    document.querySelectorAll(".cancel-edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".appointment-card");
        card.querySelector(".edit-section").style.display = "none";
        
        card.querySelector(".edit-btn").style.display = "block";
        fetchAppointments();
      });
    });

    document.querySelectorAll(".save-edit").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const card = e.target.closest(".appointment-card");
        const newDate = card.querySelector(".edit-date").value;
        const newAbout = card.querySelector(".edit-about").value;
        const newLocation = card.querySelector(".edit-location").value;
        const newAddress = card.querySelector(".edit-address").value;
        const id = e.target.getAttribute("data-id");
        

        if (newDate) {
          try {
            await fetch(`/edit-appointment/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                date: new Date(newDate).toISOString().slice(0, 19).replace("T", " "),
                about: newAbout,
                location: newLocation,
                address: newAddress,
              }),
            });
            fetchAppointments();
          } catch (err) {
            console.error("Failed to update appointment", err);
          }
        }
      });
    });
  }

  window.cancelAppointment = async (id) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      await fetch(`/cancel-appointment/${id}`, { method: "DELETE" });
      fetchAppointments();
    }
  };


  window.declineApointment = async (id) => {
    if (confirm("Are you sure you want to Decline this appointment?")) {
        try {
            const response = await fetch(`/decline-appointment/${id}`, { method: "POST" });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            } else {
                const successData = await response.json();
                alert(successData.message); // Display success message
            }
        } catch (error) {
            console.error("Request failed:", error);
            alert("An error occurred. Please try again later.");
        }
        fetchAppointments2();
    }
};

window.checkIn = async (id) => {
    if (confirm("Are you sure you want to confirm check-in? This cannot be undone")) {
        try {
            const response = await fetch(`/check-in/${id}`, { method: "POST" });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            } else {
                const successData = await response.json();
                alert(successData.message); // Display success message
            }
        } catch (error) {
            console.error("Request failed:", error);
            alert("An error occurred. Please try again later.");
        }
        fetchAppointments();
        fetchAppointments2();
    }
};

window.markMissed = async (id) => {
    if (confirm("Are you sure you missed this appointment? This cannot be undone")) {
        try {
            const response = await fetch(`/mark-missed/${id}`, { method: "POST" });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            } else {
                const successData = await response.json();
                alert(successData.message); // Display success message
            }
        } catch (error) {
            console.error("Request failed:", error);
            alert("An error occurred. Please try again later.");
        }
        fetchAppointments();
        fetchAppointments2();
    }
};


  fetchAppointments();
});



// appointments 2
async function fetchAppointments2() {
  try {
    const response = await fetch("/appointments2");
    const appointments2 = await response.json();
    renderAppointments2(appointments2);
  } catch (err) {
    console.error("Failed to fetch appointments2", err);
  }
}

function renderAppointments2(appointments2) {
  appointmentsContainer2.innerHTML = "";
  appointments2.forEach((appointment2) => {
    const card2 = document.createElement("div");
    card2.classList.add("appointment-card2");
    const appointmentDate2 = new Date(appointment2.date).toLocaleString("en-US", { year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, });
         
    card2.innerHTML = `
    <h4 style = "border-bottom: solid lightgray 1pt; padding:5px; text-align: center">Other people's Appointment with you</h4>
      <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>${appointment2.email} </strong> Has scheduled appointment with you</p>
      <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>On</strong>: <span class="appointment-date">${appointmentDate2}</span></p>
      <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>About</strong>: <span class="appointment-about">${appointment2.about}</span></p>
      <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Location</strong>: <span class="appointment-location">${appointment2.location}</span></p>
      <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Address</strong>: <span class="appointment-address">${appointment2.address}</span></p>
      <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Contact</strong>: ${appointment2.contact}</p>
      <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Status</strong>: <span class="appointment-address">${appointment2.status}</span></p>
      <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment ID</strong>: <span class="appointment-address">${appointment2.appointment_id}</span></p>


      <button onclick="declineApointment('${appointment2.appointment_id}')">Decline</button>
      <button onclick="checkIn('${appointment2.appointment_id}')">Check-in</button>
      <button onclick="markMissed('${appointment2.appointment_id}')">Missed</button>
    `;
    appointmentsContainer2.appendChild(card2);
  });
  
  attachEditHandlers2();
}
fetchAppointments2();
