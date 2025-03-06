
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