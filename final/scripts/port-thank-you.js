const params = new URLSearchParams(window.location.search);

document.getElementById('name').textContent = params.get('contact-name') || '';
document.getElementById('contact-email').textContent = params.get('contact-email') || '';
document.getElementById('message').textContent = params.get('message') || '';
document.getElementById('submittedDate').textContent = params.get('submittedDate') || '';