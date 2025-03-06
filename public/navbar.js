//logout

document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbarContainer');
    if (navbarContainer) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarContainer.innerHTML = html;
                initializeNavbar();
                loadDynamicLinks(); // Load different links per page
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
            });
    }

    function initializeNavbar() {
        const navToggle = document.getElementById('navToggle');
        const mobileNav = document.getElementById('mobileNav');
        const navbaroverlay = document.getElementById('navbar-overlay');

        // Mobile navigation toggle (only needed for larger screens)
        navToggle.addEventListener('click', () => {
            const isOpen = mobileNav.style.right === '0px';
            mobileNav.style.right = isOpen ? '-100%' : '0px';
            navbaroverlay.style.visibility = isOpen ? 'hidden' : 'visible';
            navbaroverlay.style.opacity = isOpen ? '0' : '1';

            // Toggle icon class
            if (isOpen) {
                navToggle.classList.remove('open');
            } else {
                navToggle.classList.add('open');
            }
        });

        // Close mobile navbar when overlay is clicked
        navbaroverlay.addEventListener('click', () => {
            mobileNav.style.right = '-100%';
            navbaroverlay.style.visibility = 'hidden';
            navbaroverlay.style.opacity = '0';
            navToggle.classList.remove('open');
        });

        // Highlight active link
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.style.fontWeight = 'bold';
            }
        });

        // Function to manage visibility based on screen size
        function handleResize() {
            const sections = document.querySelectorAll('.section');
            if (window.innerWidth <= 768) {
                // On small screens, show all sections
                sections.forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                // On larger screens, hide all sections and show only the default one
                const defaultSection = document.getElementById('section1');
                sections.forEach(section => {
                    section.style.display = 'none';
                });
                if (defaultSection) {
                    defaultSection.style.display = 'block'; // Show section2 by default
                }
            }
        }

        // Call the resize handler on load
        handleResize();

        // Listen for window resizing to adjust sections
        window.addEventListener('resize', handleResize);

        // Add section toggling event listeners (only for larger screens)
        navLinks.forEach(link => { // Use navLinks declared earlier
            link.addEventListener('click', (event) => {
                event.preventDefault();

                // Get the target section ID from data-target
                const targetSectionId = event.target.getAttribute('data-target');
                const sections = document.querySelectorAll('.section');

                // Hide all sections
                sections.forEach(section => {
                    section.style.display = 'none';
                });

                // Show the targeted section
                const targetSection = document.getElementById(targetSectionId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
            });
        });
    }


    function loadDynamicLinks() {
        const currentPage = window.location.pathname.split('/').pop().split('.')[0]; // Get filename without .html
        const navLinksContainer = document.querySelector('.nav-links ul');
    
        if (!navLinksContainer) return;
    

        // Define navbar links for each page
        const navLinksData = {  
            "index": [
                { text: "About", target: "section1" },
                { text: "Features", target: "section2" },
                { text: "How it works", target: "section3" },
                { text: "Testimonials", target: "section4" },
                { text: "Contact", target: "section5" },
                { text: "Sign Up", href: "registration" }
                
            ],
            "auth": [
                // document.getElementById("navToggle").style.display = "none" ,
                { text: "Home", href: "/index" },
                { text: "Sign up", target: "/registration" }
               // Hide the previous error message
                
            ],
            "patient": [
                { text: "GPS center", target: "section1" },
                { text: "Notifications", target: "section2" },
                { text: "Analysis", target: "section3" },
                { text: "Emergency", target: "section4" },
                { text: "Reports", target: "section5" },
                { text: "Apointments", target: "section6" }
                
            ],

            "caregiver": [
                { text: "Analysis", target: "section1" },
                { text: "Notifications", target: "section2" },
                { text: "GPS center", target: "section3" },
                { text: "Emergency", target: "section4" },
                { text: "Clinic", target: "section5" },
                { text: "Apointments", target: "section6" }
            ],


            "doctor": [
                { text: "Analysis", target: "section1" },
                { text: "Notifications", target: "section2" },
                { text: "GPS Tracking", target: "section3" },
                { text: "Emergency", target: "section4" },
                { text: "Apointments", target: "section5" }
            ],

            "registration": [
                { text: "Log In", href: "/auth" },
                { text: "Sign Up", href: "/registration" }
            ],
            "": [
                { text: "Login", href: "/auth" },
                { text: "Signup", href: "/registration" }
                
            ],
            "default": [
                { text: "Home", href: "/home" }
                
            ]
        };
    
        // Get the relevant links based on the page or use "default"
        const links = navLinksData[currentPage] || navLinksData["default"];
    
        // Clear existing links
        navLinksContainer.innerHTML = '';
    
        // Append the correct links
        links.forEach(link => {
            const a = document.createElement('a');
            a.textContent = link.text;
            a.setAttribute('data-target', link.target); // Add the data-target attribute
    
            // Set href to the link's href or '#' if not provided
            a.href = link.href || '#';  // If link has href, use it; else fallback to '#'
    
            navLinksContainer.appendChild(a);
    
            // Add the event listener to toggle sections (only for larger screens)
            if (window.innerWidth > 768) {
                a.addEventListener('click', (event) => {
                    // Prevent the default behavior only if href is '#'
                    if (event.target.getAttribute('href') === '#') {
                        event.preventDefault(); // Prevent default anchor click behavior
    
                        // Get the target section ID from data-target
                        const targetSectionId = event.target.getAttribute('data-target');
                        const sections = document.querySelectorAll('.section');
    
                        // Hide all sections
                        sections.forEach(section => {
                            section.style.display = 'none';
                        });
    
                        // Show the targeted section
                        const targetSection = document.getElementById(targetSectionId);
                        if (targetSection) {
                            targetSection.style.display = 'block';
                        }
                    }
                });
            }
        });
    }
    
});

