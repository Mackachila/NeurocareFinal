const registrationForm = document.getElementById("reg-form");
// const loadingOverlay = document.getElementById("loading-overlay");
registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();


  const fullname = document.getElementById("reg_username").value.trim();
  const email = document.getElementById("reg_email").value.trim();
  const contact = document.getElementById("reg_contact").value.trim();
  const password = document.getElementById("reg_password").value.trim();
  const confirmPassword = document.getElementById("reg_cpassword").value;
  const role = document.getElementById("role").value;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  const phoneNumberRegex = /^0\d{9}$/;

//   showLoadingSpinner();
  
//   // Basic client-side validation
  if (role == "" || fullname == "" || email == "" || contact == "" || password == "" || confirmPassword == "") {
    document.getElementById("reg_error").textContent = "Please select who you are and fill all fields";
    
    return;
  }else{
    document.getElementById("reg_error").textContent = "";
  }

  if (!phoneNumberRegex.test(contact)) {
       document.getElementById("contact_reg_error").textContent = "Please provide a valid phone number";

    return;
  
}else{
    document.getElementById("contact_reg_error").textContent = "";
  }

  if (!emailRegex.test(email)) {
    document.getElementById("email_reg_error").textContent = "Please provide a valid Email address";

    return;
  
}else{
    document.getElementById("email_reg_error").textContent = "";
  }

  
  if (!passwordRegex.test(password)) {
    document.getElementById("password_reg_error").textContent = "Password must be at least 6 characters";

    return;
  
}else{
    document.getElementById("password_reg_error").textContent = "";
  }

  if (password.trim() !== confirmPassword.trim()) {
       document.getElementById("cpassword_reg_error").textContent = "Your passwords do not match";

    return;
  
}else{
    document.getElementById("cpassword_reg_error").textContent = "";
  }

  // Send data to server
  try {
    const response = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        contact: contact,
        role: role,
        password: password
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
        document.getElementById("bc_error").style.background = "green";
        document.getElementById("bc_error").style.color = "white";
        document.getElementById("bc_error").style.display = "block";
        document.getElementById("bc_error").textContent = result.message;

      setTimeout(() => {
        window.location.href = '/auth';
      }, 3000); // Redirect after 3 seconds
    } else {
       document.getElementById("bc_error").style.display = "block";
        document.getElementById("bc_error").textContent = result.error;

    }

  } catch (error) {
    alert('Something went wrong. Please try again')
  }
 
});

