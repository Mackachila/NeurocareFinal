
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


document.addEventListener("DOMContentLoaded", function () {
  fetchemergencys();
  fetchemergencys2();
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