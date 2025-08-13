const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("projectModalTitle");
const modalImage = document.getElementById("projectModalImage");
const modalAddress = document.getElementById("projectModalAddress");
const modalPhone = document.getElementById("projectModalPhone");
const modalLink = document.getElementById("projectModalLink");
const modalCloseBtn = modal.querySelector(".close-btn");

modalCloseBtn.addEventListener("click", () => modal.setAttribute("hidden", ""));
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.setAttribute("hidden", "");
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.setAttribute("hidden", "");
});

function handleProjects(projects) {
    const projectsTrack = document.getElementById("pages-track");
    if (!projectsTrack) return;

    projectsTrack.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("page-card");

        card.innerHTML = `
            <img src="images/${project.image}" alt="${project.title} thumbnail" class="spot-img" loading="lazy">
            <h3>${project.title}</h3>
            <p class="description">${project.description}</p>
            <p class="score"><strong>${project.score || ''}</strong></p>
            <button class="view-details">View Details</button>
        `;

        projectsTrack.appendChild(card);

        card.querySelector(".view-details").addEventListener("click", () => {
            document.getElementById("projectModalTitle").textContent = project.title;
            document.getElementById("projectModalImage").src = `images/${project.image}`;
            document.getElementById("projectModalImage").alt = `${project.title} preview`;
            document.getElementById("projectModalLongDesc").textContent = project.long_description;
            document.getElementById("projectModalTools").textContent = project.tools.join(", ");

            const metricsDiv = document.getElementById("projectModalMetrics");
            metricsDiv.innerHTML = "";
            for (const [key, value] of Object.entries(project.metrics || {})) {
                metricsDiv.innerHTML += `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</li>`;
            }

            document.getElementById("projectModalLink").href = project.link;
            document.getElementById("projectModal").removeAttribute("hidden");
            document.getElementById("projectModal").focus();
        });
    });

    const cards = document.querySelectorAll(".page-card");
    let currentIndex = 0;

    function updateCarousel() {
        projectsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
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