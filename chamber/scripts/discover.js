fetch('./data/items.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('items-card-gallary'); 
    data.forEach(item => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
        <img src="${item.image}" alt="${item.name}" class="items-img" loading="lazy"/>
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button class="learn-btn">Learn more</button>
    `;
    container.appendChild(card);
    })
  });

const visitMsg = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMsg.textContent = "Welcome! Let us know if you have any questions.";
    } 
    else {
    const msInDay = 1000 * 60 * 60 * 24; // Milliseconds in a second * seconds in a minute * minutes in an hour * hours in a day (86,400,000 milliseconds in one day)
    const daysBetween = Math.floor((now - lastVisit) / msInDay); // Finding whole days based on how many milliseconds it's been since local storage saved your visit

    if (daysBetween < 1) {
        visitMsg.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        visitMsg.textContent = "You last visited 1 day ago."; // For if it's only been a day
    } else {
        visitMsg.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem("lastVisit", now);