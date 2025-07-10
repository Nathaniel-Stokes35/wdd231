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

const navbtn = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
const allbtn = document.querySelector('#all-btn');
const resbtn = document.querySelector('#res-btn');
const attbtn = document.querySelector('#att-btn');
const sigbtn = document.querySelector('#sig-btn');
const servbtn = document.querySelector('#serv-btn');
const compCont = document.querySelector('#comp-container');
const yearCont = document.querySelector('#curr-year');
const modCont = document.querySelector('#last-mod');
const daybtn = document.querySelector('#day-btn');

const today = new Date();
const hour = today.getHours();
const isDayTime = hour >= 7 && hour < 19;

const modRaw = document.lastModified;
const modDate = new Date(modRaw);
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const modified_date = modDate.toLocaleDateString(undefined, options);

let members = [];

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Network response was not ok');
        members = await response.json();
        console.log(members);

        const featured = members.filter(item => item.membership === 3);
        const container = document.getElementById("hero-gallery");
        container.innerHTML = '';

        featured.forEach((item, index) => {
            const slide = document.createElement("div");
            slide.classList.add("hero-slide");
            if (index === 0) slide.classList.add("active");

            slide.innerHTML = `
                <picture>
                    <source media="(max-width: 38rem)" srcset="images/mobile-${item.image}">
                    <img src="images/${item.image}" alt="${item.name}" class="hero-img" loading="lazy">
                </picture>
                <div class="hero-text">
                    <h1>${item.name}</h1>
                    <p>${item.category} • ${item.local ? 'Local' : 'Regional'}</p>
                    <a href="${item.website}" target="_blank">Visit Website</a>
                </div>
            `;

            container.appendChild(slide);
        });

        let current = 0;
        const slides = document.querySelectorAll('.hero-slide');

        const showSlide = index => {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        };

        document.querySelector('.next').addEventListener('click', () => {
        current = (current + 1) % slides.length;
        showSlide(current);
        });

        document.querySelector('.prev').addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
        });

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

loadMembers();

let activeSubjects = new Set();

document.body.classList.add(isDayTime ? 'day' : 'night');
yearCont.innerHTML = today.getFullYear();
modCont.innerHTML = `Last Modified: ${modified_date}`;

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
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member-card');

        memberDiv.innerHTML = `
        <ul class="card-ul">
            <li><h4>${member.name}</h4></li>
            <li><h5>Contact Information:</h5></li>
            <li><p>Address: ${member.address}</p></li>
            <li><p>Phone: ${member.phone}</p></li>
            <li><a href="${member.website}" target="_blank">Visit Website</a></li>
            <li><p>Membership Level: ${levelNames[member.membership]}</p></li>
        </ul>
        `;

        compCont.appendChild(memberDiv);
    });

    compCont.classList.add('show');
}

function clearMembers() {
    compCont.innerHTML = '';
    compCont.classList.remove('show');
}

navbtn.addEventListener('click', () => {
    navbtn.classList.toggle('show');
    navLinks.classList.toggle('show');
});

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

resbtn.addEventListener('click', () => toggleSubject('res'));
attbtn.addEventListener('click', () => toggleSubject('att'));
sigbtn.addEventListener('click', () => toggleSubject('sig'));
servbtn.addEventListener('click', () => toggleSubject('serv'));

daybtn.addEventListener('click', () => {
    document.body.classList.toggle('day');
    document.body.classList.toggle('night');
});
