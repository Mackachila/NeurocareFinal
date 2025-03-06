// document.addEventListener("DOMContentLoaded", function () {
//     console.log("JavaScript Loaded Successfully");

//     // Mobile Navigation Toggle
//     const navToggle = document.createElement("button");
//     navToggle.innerHTML = "☰";
//     navToggle.classList.add("menu-toggle");
//     document.querySelector("header").insertBefore(navToggle, document.querySelector("nav"));

//     const nav = document.querySelector("nav ul");
//     navToggle.addEventListener("click", function () {
//         nav.classList.toggle("show");
//         navToggle.classList.toggle("open");
//     });

//     // Close menu when a link is clicked (for better UX)
//     document.querySelectorAll("nav ul li a").forEach(link => {
//         link.addEventListener("click", function () {
//             nav.classList.remove("show");
//             navToggle.classList.remove("open");
//         });
//     });

//     // Smooth Scroll for Navigation Links
//     document.querySelectorAll("nav ul li a").forEach(link => {
//         link.addEventListener("click", function (event) {
//             event.preventDefault();
//             const targetId = this.getAttribute("href").substring(1);
//             document.getElementById(targetId).scrollIntoView({
//                 behavior: "smooth",
//                 block: "start"
//             });
//         });
//     });

//     // Adjust Hero Section Image Size on Resize
//     function adjustHeroImage() {
//         const heroImg = document.querySelector(".hero img");
//         if (!heroImg) return;
//         heroImg.style.width = window.innerWidth < 768 ? "80%" : "400px";
//     }

//     window.addEventListener("resize", adjustHeroImage);
//     adjustHeroImage();

//     // Lazy Load Images for Performance
//     document.querySelectorAll("img").forEach(img => {
//         img.setAttribute("loading", "lazy");
//     });

//     // Expand Sections for Better Mobile UX
//     document.querySelectorAll("section").forEach(section => {
//         section.addEventListener("click", function () {
//             this.classList.toggle("expanded");
//         });
//     });

//     // Handle Authentication Form Submission
//     const authForm = document.getElementById("auth-form");
//     if (authForm) {
//         authForm.addEventListener("submit", function (event) {
//             event.preventDefault();
            
//             const username = document.getElementById("username").value;
//             const password = document.getElementById("password").value;
            
//             if (username && password) {
//                 alert("Login Successful! Redirecting...");
//                 window.location.href = "dashboard.html"; // Redirect to user dashboard
//             } else {
//                 alert("Please enter valid credentials!");
//             }
//         });
//     }

//     // SOS Button for Patients
//     const sosButton = document.getElementById("sos-button");
//     if (sosButton) {
//         sosButton.addEventListener("click", function () {
//             fetch("/send_sos/", {
//                 method: "POST",
//                 headers: {
//                     "X-CSRFToken": getCookie("csrftoken"),
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ "message": "Emergency! Patient needs help!" })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 alert("SOS sent to caregiver!");
//             })
//             .catch(error => console.error("Error:", error));
//         });
//     }
// });


