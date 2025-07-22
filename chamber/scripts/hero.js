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