const modal = document.getElementById("jobModal");
const modalTitle = document.getElementById("jobModalTitle");
const modalImage = document.getElementById("jobModalImage");
const modalAddress = document.getElementById("jobModalAddress");
const modalPhone = document.getElementById("jobModalPhone");
const modalLink = document.getElementById("jobModalLink");
const modalCloseBtn = modal.querySelector(".close-btn");

modalCloseBtn.addEventListener("click", () => modal.setAttribute("hidden", ""));
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.setAttribute("hidden", "");
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.setAttribute("hidden", "");
});

function handleJobs(jobs) {
    const jobsTrack = document.getElementById("pages-track");
    if (!jobsTrack) return;

    jobsTrack.innerHTML = '';

    jobs.forEach(job => {
        const card = document.createElement("div");
        card.classList.add("page-card");

        card.innerHTML = `
            <img src="images/${job.image}" alt="${job.company} logo" class="spot-img" loading="lazy">
            <h3>${job.role}</h3>
            <p class="title">${job.company} — ${job.location}</p>
            <p class="dates">${job.dates}</p>
            <p class="description">${job.description}</p>
            <ul class="skills">
                ${job.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            <button class="view-details">Contact</button>
        `;

        jobsTrack.appendChild(card);

        card.querySelector(".view-details").addEventListener("click", () => {
            modalImage.src = `images/${job.facilityImage}`;
            modalImage.alt = `${job.company} Facility`;
            modalTitle.textContent = job.company;
            modalAddress.textContent = `Address: ${job.address}`;
            modalPhone.innerHTML = `Phone: <a href="tel:${job.phone}">${job.phone}</a>`;
            modalLink.href = job.link;
            modal.removeAttribute("hidden");
            modal.focus();
        });
    });

    const cards = document.querySelectorAll(".page-card");
    let currentIndex = 0;

    function updateCarousel() {
        jobsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
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
