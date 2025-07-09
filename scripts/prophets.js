const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const daybtn = document.querySelector('#day-btn');
const today = new Date();
const hour = new Date().getHours();
const isDayTime = hour >= 7 && hour < 19; 

document.body.classList.add(isDayTime ? 'day' : 'night');

const displayProphets = (prophets) => {
    cards.innerHTML = ``;
    prophets.forEach(prophet => {
        const prophetSect = document.createElement('section');
        prophetSect.classList.add('prophet-card');
        prophetSect.innerHTML = `
        <h2 class="prophet-heading">${prophet.name} ${prophet.lastname}</h2>
        <p class="prophet-desc" id="dob">Date of Birth: ${prophet.birthdate}</p>
        <p class="prophet-desc" id="pob">Place of Birth: ${prophet.birthplace}</p>
        <img src=${prophet.imageurl} alt="${prophet.name} ${prophet.lastname} portrait" aria-label="Prophet portrait" loading=lazy width=340 height=440 class="prophet-img">`;
        cards.appendChild(prophetSect);        
    });
}
let allProphets = [];

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data)
    allProphets = data.prophets;
    displayProphets(data.prophets);
}

getProphetData();

document.getElementById('sort').addEventListener('change', () => {
    const sortValue = document.getElementById('sort').value;
    let sorted = [...allProphets];
    if (sortValue === 'prophet-order-dsc') {
        sorted = sorted.reverse();
    } else if (sortValue === 'birth-asc') {
        sorted.sort((a, b) => new Date(a.birthdate) - new Date(b.birthdate));
    } else if (sortValue === 'birth-dsc') {
        sorted.sort((a, b) => new Date(b.birthdate) - new Date(a.birthdate));
    } else if (sortValue === 'last-name') {
        sorted.sort((a, b) => a.lastname.localeCompare(b.lastname));
    }
    displayProphets(sorted);
});

document.getElementById('filter').addEventListener('input', () => {
    const query = document.getElementById('filter').value.toLowerCase();
    const filtered = allProphets.filter(p =>
        p.birthplace.toLowerCase().includes(query)
    );
    displayProphets(filtered);
});
daybtn.addEventListener('click', () => {
    document.body.classList.toggle('day');
    document.body.classList.toggle('night');
});