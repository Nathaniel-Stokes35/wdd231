const navbtn = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
const allbtn = document.querySelector('#all-btn');
const compbtn = document.querySelector('#comp-btn'); 
const secbtn = document.querySelector('#sec-btn');
const daybtn = document.querySelector('#day-btn');
const compCont = document.querySelector('#comp-container');
const secCont = document.querySelector('#sec-container');
const yearCont = document.querySelector('#curr-year');
const modCont = document.querySelector('#last-mod');

const today = new Date();
const hour = new Date().getHours();
const isDayTime = hour >= 7 && hour < 19; 

const modRaw = document.lastModified;
const modDate = new Date(modRaw);

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const modified_date = modDate.toLocaleDateString(undefined, options);

document.body.classList.add(isDayTime ? 'day' : 'night'); // Between 7AM and 7PM is "day"

yearCont.innerHTML = today.getFullYear();
modCont.innerHTML = `Last Modified: ${modified_date}`;

navbtn.addEventListener('click', () => {
    navbtn.classList.toggle('show');
    navLinks.classList.toggle('show');
});

allbtn.addEventListener('click', () => {
    const compVis = compCont.classList.contains('show');
    const secVis = secCont.classList.contains('show');
    // If either is hidden, show both
    if (!compVis || !secVis) {
        compCont.classList.add('show');
        secCont.classList.add('show');
    }
    // if already showing both, hide all
    if (compVis && secVis) {
        compCont.classList.toggle('show');
        secCont.classList.toggle('show');
    }
});

secbtn.addEventListener('click', () => {
    secCont.classList.toggle('show');
});
compbtn.addEventListener('click', () => {
    compCont.classList.toggle('show');
});

daybtn.addEventListener('click', () => {
    document.body.classList.toggle('day');
    document.body.classList.toggle('night');
});