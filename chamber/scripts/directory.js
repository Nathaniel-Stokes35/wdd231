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
const hour = today.getHours();
const isDayTime = hour >= 7 && hour < 19;

const daybtn = document.querySelector('#day-btn');
const allbtn = document.querySelector('#all-btn');
const resbtn = document.querySelector('#res-btn');
const attbtn = document.querySelector('#att-btn');
const sigbtn = document.querySelector('#sig-btn');
const servbtn = document.querySelector('#serv-btn');
const toggbtn = document.querySelector("#toggle-btn");
const compCont = document.querySelector('#comp-container');

let activeSubjects = new Set();

document.body.classList.add(isDayTime ? 'day' : 'night');

function toggleSubject(subject) {
    if (activeSubjects.has(subject)) {
        activeSubjects.delete(subject);
    } else {
        activeSubjects.add(subject);
    }

    if (activeSubjects.size === 0) {
        clearMembers();
    } else {
        const filtered = members.filter(member =>
            activeSubjects.has(categoryMap[member.category])
        );
        renderMembers(filtered);
    }

    toggleButtonState();
}

function toggleButtonState() {
    const resStatus = document.querySelector('#res-btn .status');
    const attStatus = document.querySelector('#att-btn .status');
    const sigStatus = document.querySelector('#sig-btn .status');
    const servStatus = document.querySelector('#serv-btn .status');

    resbtn.classList.toggle('active', activeSubjects.has('res'));
    attbtn.classList.toggle('active', activeSubjects.has('att'));
    sigbtn.classList.toggle('active', activeSubjects.has('sig'));
    servbtn.classList.toggle('active', activeSubjects.has('serv'));

    resStatus.textContent = activeSubjects.has('res') ? 'On' : 'Off';
    attStatus.textContent = activeSubjects.has('att') ? 'On' : 'Off';
    sigStatus.textContent = activeSubjects.has('sig') ? 'On' : 'Off';
    servStatus.textContent = activeSubjects.has('serv') ? 'On' : 'Off';
}
function renderMembers(memberArray) {
    compCont.innerHTML = '';

    memberArray.forEach(member => {
        const memberCard = document.createElement('article');
        memberCard.classList.add('member-card');

        memberCard.innerHTML = `
            <div class="card-header">
                <h4>${member.name}</h4>
                <img src="images/${member.image}" alt="${member.name}" class="card-img" loading="lazy">
            </div>
            <div class="card-body">
                <h5>Contact Information</h5>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership Level:</strong> ${levelNames[member.membership]}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            </div>
        `;

        compCont.appendChild(memberCard);
    });

    compCont.classList.add('show');
}

function clearMembers() {
    compCont.innerHTML = '';
    compCont.classList.remove('show');
}

allbtn.addEventListener('click', () => {
    if (activeSubjects.size < 4) {
        activeSubjects = new Set(['res', 'att', 'sig', 'serv']);
        const filtered = members.filter(member =>
            activeSubjects.has(categoryMap[member.category])
        );
        renderMembers(filtered);
    } else {
        activeSubjects.clear();
        clearMembers();
    }
    toggleButtonState();
});

gridbtn.addEventListener('click', () => {
    compCont.classList.remove('list');
    compCont.classList.add('grid');
});
listbtn.addEventListener('click', () => {
    compCont.classList.remove('grid');
    compCont.classList.add('list');
});

resbtn.addEventListener('click', () => toggleSubject('res'));
attbtn.addEventListener('click', () => toggleSubject('att'));
sigbtn.addEventListener('click', () => toggleSubject('sig'));
servbtn.addEventListener('click', () => toggleSubject('serv'));

daybtn.addEventListener('click', () => {
    document.body.classList.toggle('day');
    document.body.classList.toggle('night');
});