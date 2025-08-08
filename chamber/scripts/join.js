const cards = Array.from(document.querySelectorAll('.member-card'));
let index = 0;
let direction = 1;

function highlightCard() {
    cards.forEach(card => card.classList.remove('highlighted'));
    cards[index].classList.add('highlighted');
    index += direction;
    if (index >= cards.length) {
    index = cards.length - 2;
    direction = -1;
    } else if (index < 0) {
    index = 1;
    direction = 1;
    }
    setTimeout(highlightCard, 8000);
}

document.querySelectorAll('button.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const dialog = document.getElementById(modalId);
        if (dialog) dialog.showModal();
    });
});

document.querySelectorAll('button.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const dialog = document.getElementById(modalId);
        if (dialog) dialog.close();
    });
});

window.addEventListener('click', event => {
    document.querySelectorAll('dialog[open]').forEach(dialog => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});

document.querySelector('input[name="submittedDate"]').value = new Date().toLocaleDateString();
highlightCard();