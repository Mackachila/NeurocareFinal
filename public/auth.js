// const loginForm = document.getElementById("auth-form");
// // const loadingOverlay = document.getElementById("loading-overlay");
// loginForm.addEventListener("submit", async (event) => {
//   event.preventDefault();


//   const email = document.getElementById("log_email").value.trim();
//   const password = document.getElementById("log_password").value.trim();
//   const role =  document.getElementById("role").value.trim();
  
  
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  

// //   showLoadingSpinner();
  
// //   // Basic client-side validation
//   if (email == "" || password == "" || role == "") {
//     document.getElementById("log_error").textContent = "Please fill all the fields and select who you are";
    
//     return;
//   }else{
//     document.getElementById("log_error").textContent = "";
//   }

 

//   if (!emailRegex.test(email)) {
//     document.getElementById("email_log_error").textContent = "Please provide a valid Email address";

//     return;
  
// }else{
//     document.getElementById("email_log_error").textContent = "";
//   }

//   document.getElementById("log_bc_error").style.display = "none";
//   // Send data to server
//   try {
//     const response = await fetch('/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//         role: role
        
//       }),
//     });

//     const result = await response.json();
    
//     if (response.ok) {
//         document.getElementById("log_bc_error").style.background = "green";
//         document.getElementById("log_bc_error").style.color = "white";
//         document.getElementById("log_bc_error").style.display = "block";
//         document.getElementById("log_bc_error").textContent = result.message;

//       setTimeout(() => {
//         window.location.href = '/patient';
//       }, 2000); // Redirect after 3 seconds
//     } else {
//         document.getElementById("log_bc_error").style.display = "block";
//         document.getElementById("log_bc_error").textContent = result.error;
//     }

//   } catch (error) {
//     displayFloatingCard('An error occurred. Please try again later.', 'error');
//   }
//   hideLoadingSpinner();
// });

const loginForm = document.getElementById("auth-form");
// const loadingOverlay = document.getElementById("loading-overlay");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("log_email").value.trim();
  const password = document.getElementById("log_password").value.trim();
  const role = document.getElementById("role").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Basic client-side validation
  if (email == "" || password == "" || role == "") {
    document.getElementById("log_error").textContent = "Please fill all the fields and select who you are";
    return;
  } else {
    document.getElementById("log_error").textContent = "";
  }

  if (!emailRegex.test(email)) {
    document.getElementById("email_log_error").textContent = "Please provide a valid Email address";
    return;
  } else {
    document.getElementById("email_log_error").textContent = "";
  }

  document.getElementById("log_bc_error").style.display = "none"; // Hide the previous error message

  // Send data to server
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
      }),
    });

    const result = await response.json();

    // Handle the response
    if (response.ok) {
      // Display success message
      document.getElementById("log_bc_error").style.background = "green";
      document.getElementById("log_bc_error").style.color = "white";
      document.getElementById("log_bc_error").style.display = "block";
      document.getElementById("log_bc_error").textContent = result.message;

      // Redirect to the appropriate page based on the role
      setTimeout(() => {
        if (role === 'Doctor') {
          window.location.href = '/gpscenter_dr';
        } else if (role === 'CareGiver') {
          window.location.href = '/gpscenter_cg';
        } else if (role === 'Patient') {
          window.location.href = '/gpscenter';
        }
      }, 2000); // Redirect after 2 seconds
    } else {
      // Display error message
      document.getElementById("log_bc_error").style.background = "red";
      document.getElementById("log_bc_error").style.color = "white";
      document.getElementById("log_bc_error").style.display = "block";
      document.getElementById("log_bc_error").textContent = result.error;
    }

  } catch (error) {
    // Handle errors that might occur during the fetch request
    displayFloatingCard('An error occurred. Please try again later.', 'error');
  }
  // hideLoadingSpinner();
});


function showLoadingSpinner() {
    loadingOverlay.classList.add('active');
  }
  
  function hideLoadingSpinner() {
    loadingOverlay.classList.remove('active');
  }

function displayFloatingCard(message, type) {
  const card = document.createElement('div');
  card.className = floating-card `${type}`;
  
  const icon = document.createElement('img');
  icon.className = 'card-icon';
  
  if (type === 'error') {
    icon.src = 'error.png';  // Assuming error.png is in the same directory
  } else if (type === 'success') {
    icon.src = 'tick.png';  // Assuming success.png is in the same directory
  }

  const text = document.createElement('span');
  text.className = 'card-message';
  text.textContent = message;

  const closeBtn = document.createElement('span');
  closeBtn.className = 'close-btn';
  closeBtn.textContent = '✕';
  closeBtn.onclick = () => {
    card.remove();
  };

  card.appendChild(icon);
  card.appendChild(text);
  card.appendChild(closeBtn);
  
  document.body.appendChild(card);

  // Automatically remove the card after 3 seconds
  setTimeout(() => {
    card.remove();
  }, 4000);
}