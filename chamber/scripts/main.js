const navbtn = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');

const yearCont = document.querySelector('#curr-year');
const modCont = document.querySelector('#last-mod');

const modRaw = document.lastModified;
const modDate = new Date(modRaw);
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const modified_date = modDate.toLocaleDateString(undefined, options);

yearCont.innerHTML = today.getFullYear();
modCont.innerHTML = `Last Modified: ${modified_date}`;

navbtn.addEventListener('click', () => {
    navbtn.classList.toggle('show');
    navLinks.classList.toggle('show');
});