function handlePages(pages) {
    const pagesTrack = document.getElementById("pages-track");
    if (!pagesTrack) return;

    pagesTrack.innerHTML = '';

    pages.forEach(page => {
        const card = document.createElement("div");
        card.classList.add("page-card");
        card.innerHTML = `
            <img src="${page.image}" alt="${page.name} image" class="spot-img" loading="lazy">
            <h3>${page.name}</h3>
            <p class="title">${page.title}</p>
            <p class="description">${page.description}</p>
            <p class="purpose">${page.purpose}</p>
            <p class="website"><a href="${page.link}" target="_blank" rel="noopener">Visit</a></p>
        `;
        pagesTrack.appendChild(card);
    });

    const cards = document.querySelectorAll(".page-card");
    let currentIndex = 0;

    function updateCarousel() {
        pagesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    if (prevBtn && nextBtn) {
        prevBtn.onclick = () => {
            currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
            updateCarousel();
        };

        nextBtn.onclick = () => {
            currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        };
    }

    updateCarousel();
}