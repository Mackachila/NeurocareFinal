
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
  


// document.addEventListener("DOMContentLoaded", () => {
//     fetchSentReports(); // Load reports

//     const editModal = document.getElementById("editReportModal");
//     const closeModal = document.querySelector(".close-btn");
//     const saveEditButton = document.getElementById("saveEdit");

//     // Fetch Sent Reports
//     async function fetchSentReports() {
//         try {
//             const response = await fetch("/fetch-sent-reports");
//             const reports = await response.json();
//             const reportDiv = document.getElementById("medical_report");
//             reportDiv.innerHTML = "";
    
//             reports.forEach(report => {
//                 const reportItem = document.createElement("div");
//                 reportItem.classList.add("report-card");
    
//                 const reportDate = new Date(report.date).toLocaleString();
    
//                 reportItem.innerHTML = `
//                     <div class="report-header">
//                         <p class="report-email"><strong>Patient:</strong> ${report.email}</p>
//                         <p class="report-time">${reportDate}</p>
//                     </div>
//                     <div class="report-body">
//                         <p><strong>Description:</strong> ${report.description}</p>
//                         <p><strong>Status:</strong> <span class="report-status">${report.status}</span></p>
//                     </div>
//                     <div class="report-footer">
//                         <button class="edit-btn" data-id="${report.report_id}" data-description="${report.description}" data-status="${report.status}">✏ Edit</button>
//                         <button class="download-pdf-btn" data-id="${report.report_id}" data-description="${report.description}" data-email="${report.email}" data-status="${report.status}">⬇ Download PDF</button>
//                     </div>
//                 `;
    
//                 reportDiv.appendChild(reportItem);
//             });
    
//             // Attach event listeners to edit buttons
//             document.querySelectorAll(".edit-btn").forEach(button => {
//                 button.addEventListener("click", function() {
//                     showEditForm(this.dataset.id, this.dataset.description, this.dataset.status);
//                 });
//             });

//             // Attach event listeners to download buttons
//             document.querySelectorAll(".download-pdf-btn").forEach(button => {
//                 button.addEventListener("click", function() {
//                     downloadReportAsPDF(this.dataset.id, this.dataset.description, this.dataset.status, this.dataset.email);
//                 });
//             });

//         } catch (error) {
//             console.error("Error fetching reports:", error);
//         }
//     }
    
//     // Show Edit Form in Modal
//     function showEditForm(report_id, description, status) {
//         document.getElementById("edit_report_id").value = report_id;
//         document.getElementById("edit_description").value = description;
//         document.getElementById("edit_status").value = status;
//         editModal.style.display = "flex"; // Show modal
//     }

//     // Close Modal when Clicking X
//     closeModal.addEventListener("click", () => {
//         editModal.style.display = "none";
//     });

//     // Close Modal when Clicking Outside
//     window.addEventListener("click", (event) => {
//         if (event.target === editModal) {
//             editModal.style.display = "none";
//         }
//     });


//     // Download Report as PDF
//     function downloadReportAsPDF(report_id, description, status, email) {
//         const { jsPDF } = window.jspdf;
//         const doc = new jsPDF();

//         // Add content to the PDF
//         doc.text(`Report ID: ${report_id}`, 10, 10);
//         doc.text(`Patient Email: ${email}`, 10, 20);
//         doc.text(`Description: ${description}`, 10, 30);
//         doc.text(`Status: ${status}`, 10, 40);
//         doc.text(`Date: ${new Date().toLocaleString()}`, 10, 50);

//         // Save the PDF with a dynamic file name
//         doc.save(`Report_${report_id}.pdf`);
//     }

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

                // Only show the Edit button if we're on the /reports_dr page
                const isReportsDrPage = window.location.pathname === '/reports_dr';

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
                        ${isReportsDrPage ? `<button class="edit-btn" data-id="${report.report_id}" data-description="${report.description}" data-status="${report.status}">✏ Edit</button>` : ''}
                        <button class="download-pdf-btn" data-id="${report.report_id}" data-description="${report.description}" data-email="${report.email}" data-status="${report.status}">⬇ Download PDF</button>
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

            // Attach event listeners to download buttons
            document.querySelectorAll(".download-pdf-btn").forEach(button => {
                button.addEventListener("click", function() {
                    downloadReportAsPDF(this.dataset.id, this.dataset.description, this.dataset.status, this.dataset.email);
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

    function downloadReportAsPDF(report_id, description, status, email) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
    
        // Add Title to the PDF
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("NeuroCare Medical Report", 105, 20, null, null, "center"); // Title at the top of the page
    
        // Add Report ID
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Report ID: ${report_id}`, 10, 30);
    
        // Add Patient's Email
        doc.text(`Patient Email: ${email}`, 10, 40);
    
        // Add Description
        doc.text(`Description:`, 10, 50);
        doc.setFontSize(10);
        doc.text(description, 10, 55, { maxWidth: 180 }); // Description with word wrap
    
        // Add Status
        doc.setFontSize(12);
        doc.text(`Status: ${status}`, 10, 70);
    
        // Add Date
        doc.text(`Date: ${new Date().toLocaleString()}`, 10, 80);
    
        // Add a line for separation
        doc.setLineWidth(0.5);
        doc.line(10, 90, 200, 90);  // Draw a horizontal line
    
        // Add Footer (if needed)
        doc.setFontSize(8);
        doc.text("This is a generated report from NeuroCare Medical.", 10, 280);
    
        // Save the PDF with a dynamic file name
        doc.save(`Report_${report_id}.pdf`);
    }
    



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
        <button class="download-pdf-btn2" 
                data-id="${report.report_id}" 
                data-description="${report.description}" 
                data-username="${report.username}" 
                data-status="${report.status}" 
                data-reportDate="${report.date}">⬇ Download PDF</button>
    </div>
`;

    
                reportDiv.appendChild(reportItem);
            });

            // Attach event listeners to download buttons
            document.querySelectorAll(".download-pdf-btn2").forEach(button => {
                button.addEventListener("click", function() {
                    downloadReportAsPDF2(this.dataset.id, this.dataset.description,  this.dataset.username, this.dataset.status, this.dataset.reportDate);
                });
            });
    
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    }
    
    function downloadReportAsPDF2(report_id, description, username, status, reportDate) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
    
        // Add Title to the PDF
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("NeuroCare Medical Report", 105, 20, null, null, "center"); // Title at the top of the page
    
        // Add Report ID
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Report ID: ${report_id}`, 10, 30);
    
        // Add Doctor's Name
        doc.text(`From: Dr. ${username}`, 10, 40);
    
        // Add Description
        doc.text(`Description:`, 10, 50);
        doc.setFontSize(10);
        doc.text(description, 10, 60, { maxWidth: 180 }); // Description with word wrap
    
        // Add Status
        doc.setFontSize(12);
        doc.text(`Status: ${status}`, 10, 75);
    
        // // Add Report Date (from the passed 'reportDate')
        // doc.text(`Report Date: ${reportDate}`, 10, 85); // Use the already formatted reportDate directly
    
        // Add Download Date (Current Date)
        const downloadDate = new Date().toLocaleString(); // Get the current date
        doc.text(`Date: ${downloadDate}`, 10, 85);
    
        // Add Footer (if needed)
        doc.setFontSize(8);
        doc.text("This is a generated report from NeuroCare Medical.", 10, 105);
    
        // Add a line for separation
        doc.setLineWidth(0.5);
        doc.line(10, 120, 200, 120);  // Draw a horizontal line
    
        // Save the PDF with a dynamic file name
        doc.save(`Neurocare_Medical_Report_${report_id}.pdf`);
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