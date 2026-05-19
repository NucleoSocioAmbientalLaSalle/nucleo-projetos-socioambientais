
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href').includes(current));
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);

    if (!modal) {
        return;
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) {
        return;
    }

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function initModalHandlers() {
    const modalButtons = document.querySelectorAll('.project-card[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close');

    modalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            openModal(modalId);
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

function initProjectFilter() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const projectCards = document.querySelectorAll('.project-item');

    carouselItems.forEach((item) => {
        item.addEventListener('click', () => {
            carouselItems.forEach((currentItem) => currentItem.classList.remove('active'));
            item.classList.add('active');

            const targetCategory = item.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const cardCategory = card.getAttribute('data-category');
                const visible = targetCategory === 'todos' || targetCategory === cardCategory;

                card.style.display = visible ? 'grid' : 'none';

                if (visible) {
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = null;
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initProjectFilter();
    initModalHandlers();

    window.addEventListener('scroll', setActiveNavLink);
});

const heroButton = document.querySelector(".hero-btn");

const projectData = [
    
    {
        title: "Projetos Futuros",
        description: "Faça parte desse futuro.",
        buttonText: "Seja um apoiador",
        buttonLink: "#investidor"
    }
];

const collapsibleCards = document.querySelectorAll(".collapsible-card");

collapsibleCards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });
});
