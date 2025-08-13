const navbtn = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');

const yearCont = document.querySelector('#curr-year');
const modCont = document.querySelector('#last-mod');

const daybtn = document.querySelector('#day-btn');

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

async function loadCards() {
    try {
        const pageName = window.location.pathname
            .split("/")
            .pop()
            .replace(".html", "") || "index";

        const pageConfig = {
            "index":    { json: "home.json", handler: "handlePages" },
            "home":     { json: "home.json", handler: "handlePages" },
            "jobs":     { json: "jobs.json", handler: "handleJobs" },
            "projects": { json: "projects.json", handler: "handleProjects" },
            "about":    { json: "about.json", handler: "handleAbout" }
        };

        const config = pageConfig[pageName];
        if (!config) throw new Error(`No JSON handler configured for page: ${pageName}`);

        const response = await fetch(`data/${config.json}`);
        if (!response.ok) throw new Error(`Failed to fetch ${config.json}`);

        const data = await response.json();

        if (typeof window[config.handler] === "function") {
            window[config.handler](data);
        } else {
            console.error(`Handler function ${config.handler} not found.`);
        }

    } catch (error) {
        console.error("Error loading page data:", error);
    }
}

const visitMsg = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMsg.textContent = "Welcome! Let me know if you have any questions or need more information; Contact Info is on the bottom.";
    } 
    else {
    const msInDay = 1000 * 60 * 60 * 24; // Milliseconds in a second * seconds in a minute * minutes in an hour * hours in a day (86,400,000 milliseconds in one day)
    const daysBetween = Math.floor((now - lastVisit) / msInDay); // Finding whole days based on how many milliseconds it's been since local storage saved your visit

    if (daysBetween < 1) {
        visitMsg.textContent = "Back so soon! Contact me for anything else you need or if I can help!";
    } else if (daysBetween === 1) {
        visitMsg.textContent = "You last visited yesterday, is there anything I can answer for you?"; // For if it's only been a day
    } else {
        visitMsg.textContent = `You last visited ${daysBetween} days ago. Thank you for your consideration!`;
    }
}

localStorage.setItem("lastVisit", now);

loadCards();