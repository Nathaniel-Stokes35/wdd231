function handleAbout(items) {
    const aboutTrack = document.getElementById("pages-track");
    if (!aboutTrack) return;
    aboutTrack.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("page-card");

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>Date:</strong> ${item.dateTaken}</p>
            ${item.fileSize ? `<p><strong>File Size:</strong> ${item.fileSize}</p>` : ""}
            <p>${item.description}</p>
            <button class="about-btn">
                <a href="${item.link}" target="_blank">
                    ${item["button-title"]}
                </a>
            </button>
        `;

        if (item.title === "Contact Me") {
            const btn = card.querySelector(".about-btn");
            const anchor = btn.querySelector("a");
            anchor.removeAttribute("href");
            anchor.removeAttribute("target");
            btn.addEventListener("click", e => {
                e.preventDefault();
                openContactModal();
            });
        }

        aboutTrack.appendChild(card);
    });

    const cards = aboutTrack.querySelectorAll(".page-card");
    let currentIndex = 0;
    function updateCarousel() {
        aboutTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
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

const contactModal = document.getElementById("contactModal");
const contactCloseBtn = contactModal.querySelector(".close-btn");

function openContactModal() {
    contactModal.removeAttribute("hidden");
    contactModal.focus();
}

contactCloseBtn.addEventListener("click", () => {
    contactModal.setAttribute("hidden", "");
});
contactModal.addEventListener("click", e => {
    if (e.target === contactModal) {
        contactModal.setAttribute("hidden", "");
    }
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !contactModal.hasAttribute("hidden")) {
        contactModal.setAttribute("hidden", "");
    }
});

document.querySelector('input[name="submittedDate"]').value = new Date().toLocaleDateString();