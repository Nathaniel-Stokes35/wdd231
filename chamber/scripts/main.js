const navbtn = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');

const yearCont = document.querySelector('#curr-year');
const modCont = document.querySelector('#last-mod');

const daybtn = document.querySelector('#day-btn');

const levelNames = {
  1: "Member",
  2: "Silver",
  3: "Gold"
};
const categoryMap = {
  'Restaurants': 'res',
  'Attractions': 'att',
  'Sights': 'sig',
  'Services': 'serv'
};

const today = new Date();
const modRaw = document.lastModified;
const modDate = new Date(modRaw);
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const modified_date = modDate.toLocaleDateString(undefined, options);

yearCont.textContent = today.getFullYear();
modCont.textContent = `Last Modified: ${modified_date}`;

navbtn.addEventListener('click', () => {
  navbtn.classList.toggle('show');
  navLinks.classList.toggle('show');
});

daybtn.addEventListener('click', () => {
  document.body.classList.toggle('day');
  document.body.classList.toggle('night');
});

let members = [];
let events = [];

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to fetch members.json');

    members = await response.json();

    if (typeof handleDirectory === 'function') {
      handleDirectory(members);
    }

    if (typeof handleSpotlight === 'function') {
      handleSpotlight(members);
    }
  } catch (error) {
    console.error('Error loading members:', error);
  }
}

async function loadEvents() {
  try {
    const response = await fetch('data/events.json');
    if (!response.ok) throw new Error('Failed to fetch events.json');

    events = await response.json();

    if (typeof handleCurrentEvents === 'function') {
      handleCurrentEvents(events);
    }
  } catch (error) {
    console.error('Error loading events:', error);
  }
}

loadMembers();
loadEvents();