const params = new URLSearchParams(window.location.search);

document.getElementById('firstName').textContent = params.get('first-name') || '';
document.getElementById('lastName').textContent = params.get('last-name') || '';
document.getElementById('email').textContent = params.get('contact-email') || '';
document.getElementById('phone').textContent = params.get('phone-number') || '';
document.getElementById('business').textContent = params.get('org-name') || '';
document.getElementById('submittedDate').textContent = params.get('submittedDate') || '';