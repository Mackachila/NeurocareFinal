// display


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
  });
  
//     async function fetchAppointments() {
//       try {
//         const response = await fetch("/appointments");
//         const appointments = await response.json();
//         renderAppointments(appointments);
//       } catch (err) {
//         alert("That one faile")
//         console.error("Failed to fetch appointments", err);
//       }
//     }
  
  //   function renderAppointments(appointments) {
  //     appointmentsContainer.innerHTML = "";
  //     appointments.forEach((appointment) => {
  //       const card = document.createElement("div");
  //       card.classList.add("appointment-card");
  //       const appointmentDate = new Date(appointment.date).toLocaleString("en-US", { year: 'numeric',
  //         month: 'long',
  //         day: 'numeric',
  //         hour: 'numeric',
  //         minute: 'numeric',
  //         hour12: true, });
             
  //       card.innerHTML = `
  //         <h4 style = "border-bottom: solid lightgray 1pt; padding:5px; text-align: center">Your appointments with other people</h4>        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>You have appointment with</strong>: ${appointment.withWhom}</p>
  //         <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>On</strong>: <span class="appointment-date">${appointmentDate}</span></p>
  //         <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>About</strong>: <span class="appointment-about">${appointment.about}</span></p>
  //         <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Location</strong>: <span class="appointment-location">${appointment.location}</span></p>
  //         <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Address</strong>: <span class="appointment-address">${appointment.address}</span></p>
  //         <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Contact</strong>: ${appointment.contact}</p>
  //         <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Status</strong>: <span class="appointment-address">${appointment.status}</span></p>
  //         <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment ID</strong>: <span class="appointment-address">${appointment.appointment_id}</span></p><br>
  
  //         <div class="edit-section" style="display:none;">
  //         <h4>Edit your appointment</h4>
  //           Date:<br> <input type="datetime-local" style = "width:85%; padding:14px; border-radius: 7px" class="edit-date" value="${appointment.date.slice(0, 16)}" /><br><br>
  //           About:<br> <input type="text" style = "width:85%" class="edit-about" value="${appointment.about}" placeholder="Edit about the appointment" /><br>
  //           Location:<br> <input type="text" style = "width:85%" class="edit-location" value="${appointment.location}" placeholder="Edit appointment Location" /><br>
  //           Address:<br> <input type="text"  style = "width:85%" class="edit-address" value="${appointment.address}" placeholder="Edit apointment Address" /><br>
  //           <button class="save-edit" data-id="${appointment.appointment_id}">Save</button>
  //           <button class="cancel-edit">Cancel</button>
  //         </div>
  //         <button class="edit-btn" data-id="${appointment.appointment_id}">Edit</button>
  //         <button class ="other-btns" onclick="cancelAppointment('${appointment.appointment_id}')">Cancel</button>
  //         <button class ="other-btns2" onclick="checkIn('${appointment.appointment_id}')">Check-in</button>
  //         <button class ="other-btns3" onclick="markMissed('${appointment.appointment_id}')">Missed</button>
  //       `;
  //       appointmentsContainer.appendChild(card);
  //     });
  //     attachEditHandlers();
  //   }
  
  //   function attachEditHandlers() {
  //     document.querySelectorAll(".edit-btn").forEach((btn) => {
  //       btn.addEventListener("click", (e) => {
         
  //         const card = e.target.closest(".appointment-card");
  //         document.querySelector(".other-btns").style.display = "none";
  //         document.querySelector(".other-btns2").style.display = "none";
  //         document.querySelector(".other-btns3").style.display = "none";
  //         card.querySelector(".edit-section").style.display = "block";
  //         e.target.style.display = "none";
          
  //       });
  //     });
  
  //     document.querySelectorAll(".cancel-edit").forEach((btn) => {
  //       btn.addEventListener("click", (e) => {
  //         const card = e.target.closest(".appointment-card");
  //         card.querySelector(".edit-section").style.display = "none";
          
  //         card.querySelector(".edit-btn").style.display = "block";
  //         fetchAppointments();
  //       });
  //     });
  
  //     document.querySelectorAll(".save-edit").forEach((btn) => {
  //       btn.addEventListener("click", async (e) => {
  //         const card = e.target.closest(".appointment-card");
  //         const newDate = card.querySelector(".edit-date").value;
  //         const newAbout = card.querySelector(".edit-about").value;
  //         const newLocation = card.querySelector(".edit-location").value;
  //         const newAddress = card.querySelector(".edit-address").value;
  //         const id = e.target.getAttribute("data-id");
          
  
  //         if (newDate) {
  //           try {
  //             await fetch(`/edit-appointment/${id}`, {
  //               method: "PUT",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify({
  //                 date: new Date(newDate).toISOString().slice(0, 19).replace("T", " "),
  //                 about: newAbout,
  //                 location: newLocation,
  //                 address: newAddress,
  //               }),
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
  
  
  //   window.declineApointment = async (id) => {
  //     if (confirm("Are you sure you want to Decline this appointment?")) {
  //         try {
  //             const response = await fetch(`/decline-appointment/${id}`, { method: "POST" });
  
  //             if (!response.ok) {
  //                 const errorData = await response.json();
  //                 alert(`Error: ${errorData.message}`);
  //             } else {
  //                 const successData = await response.json();
  //                 alert(successData.message); // Display success message
  //             }
  //         } catch (error) {
  //             console.error("Request failed:", error);
  //             alert("An error occurred. Please try again later.");
  //         }
  //         fetchAppointments2();
  //     }
  // };
  
  // window.checkIn = async (id) => {
  //     if (confirm("Are you sure you want to confirm check-in? This cannot be undone")) {
  //         try {
  //             const response = await fetch(`/check-in/${id}`, { method: "POST" });
  
  //             if (!response.ok) {
  //                 const errorData = await response.json();
  //                 alert(`Error: ${errorData.message}`);
  //             } else {
  //                 const successData = await response.json();
  //                 alert(successData.message); // Display success message
  //             }
  //         } catch (error) {
  //             console.error("Request failed:", error);
  //             alert("An error occurred. Please try again later.");
  //         }
  //         fetchAppointments();
  //         fetchAppointments2();
  //     }
  // };
  
  // window.markMissed = async (id) => {
  //     if (confirm("Are you sure you missed this appointment? This cannot be undone")) {
  //         try {
  //             const response = await fetch(`/mark-missed/${id}`, { method: "POST" });
  
  //             if (!response.ok) {
  //                 const errorData = await response.json();
  //                 alert(`Error: ${errorData.message}`);
  //             } else {
  //                 const successData = await response.json();
  //                 alert(successData.message); // Display success message
  //             }
  //         } catch (error) {
  //             console.error("Request failed:", error);
  //             alert("An error occurred. Please try again later.");
  //         }
  //         fetchAppointments();
  //         fetchAppointments2();
  //     }
  // };
  
  
  //   fetchAppointments();
//   });
  
  
  
  // appointments 2 appointmentsContainer2
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
      <h4 style = "border-bottom: solid lightgray 1pt; padding:5px; text-align: center">Upcoming Appointments</h4>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>${appointment2.email} </strong> Has scheduled appointment with you</p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>On</strong>: <span class="appointment-date">${appointmentDate2}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>About</strong>: <span class="appointment-about">${appointment2.about}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Location</strong>: <span class="appointment-location">${appointment2.location}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Address</strong>: <span class="appointment-address">${appointment2.address}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Contact</strong>: ${appointment2.contact}</p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment Status</strong>: <span class="appointment-address">${appointment2.status}</span></p>
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment ID</strong>: <span class="appointment-address">${appointment2.appointment_id}</span></p><br>
  
  
        <button onclick="declineApointment('${appointment2.appointment_id}')">Decline</button>
        <button onclick="checkIn('${appointment2.appointment_id}')">Check-in</button>
        <button onclick="markMissed('${appointment2.appointment_id}')">Missed</button>
      `;
      appointmentsContainer2.appendChild(card2);
    });
    
    // attachEditHandlers2();
  }
  fetchAppointments2();



  // appointments 2 appointmentsContainer2
  async function fetchAppointments() {
    try {
      const response = await fetch("/appointments4");
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
        <p style = "border-bottom: solid lightgray 1pt; padding:5px"><strong>Appointment ID</strong>: <span class="appointment-address">${appointment.appointment_id}</span></p><br>

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