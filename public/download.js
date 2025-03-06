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
    
    function showEditForm(report_id, description, status) {
        document.getElementById("edit_report_id").value = report_id;
        document.getElementById("edit_description").value = description;
        document.getElementById("edit_status").value = status;
        editModal.style.display = "flex"; // Show modal
    
        // Now, add the event listener to the saveEditButton once the modal is shown
        const saveEditButton = document.getElementById("saveEdit");
        saveEditButton.addEventListener("click", function() {
            // Handle the save edit action here
            saveEditedReport(report_id);
        });
    }
    

    // Close Modal when Clicking Outside
    window.addEventListener("click", (event) => {
        if (event.target === editModal) {
            editModal.style.display = "none";
        }
    });

    // Download Report as PDF
    function downloadReportAsPDF(report_id, description, status, email) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add content to the PDF
        doc.text(`Report ID: ${report_id}`, 10, 10);
        doc.text(`Patient Email: ${email}`, 10, 20);
        doc.text(`Description: ${description}`, 10, 30);
        doc.text(`Status: ${status}`, 10, 40);
        doc.text(`Date: ${new Date().toLocaleString()}`, 10, 50);

        // Save the PDF with a dynamic file name
        doc.save(`Report_${report_id}.pdf`);
    }
});
