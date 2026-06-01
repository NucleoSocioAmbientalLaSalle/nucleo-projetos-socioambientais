function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute('href');
        link.classList.toggle('active', target.includes(currentSection));
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

function initCollapsibleCards() {
    const collapsibleCards = document.querySelectorAll('.collapsible-card');

    collapsibleCards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector('header');

    if (!header) {
        return;
    }

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

let currentGallery = 0;

function showGallerySlide(index) {
    const gallerySlides = document.querySelectorAll('.gallery-slide');

    if (!gallerySlides.length) {
        return;
    }

    gallerySlides.forEach((slide) => slide.classList.remove('active'));
    gallerySlides[index].classList.add('active');
}

function nextGallery() {
    const gallerySlides = document.querySelectorAll('.gallery-slide');

    if (!gallerySlides.length) {
        return;
    }

    currentGallery = (currentGallery + 1) % gallerySlides.length;
    showGallerySlide(currentGallery);
}

function prevGallery() {
    const gallerySlides = document.querySelectorAll('.gallery-slide');

    if (!gallerySlides.length) {
        return;
    }

    currentGallery = (currentGallery - 1 + gallerySlides.length) % gallerySlides.length;
    showGallerySlide(currentGallery);
}

function initGalleryCarousel() {
    const prevBtn = document.querySelector('.gallery-arrow.prev');
    const nextBtn = document.querySelector('.gallery-arrow.next');
    const gallerySlides = document.querySelectorAll('.gallery-slide');

    if (!prevBtn || !nextBtn || gallerySlides.length === 0) {
        return;
    }

    prevBtn.addEventListener('click', prevGallery);
    nextBtn.addEventListener('click', nextGallery);
}

function initGalleryAutoRotate() {
    const gallerySlides = document.querySelectorAll('.gallery-slide');

    if (!gallerySlides.length) {
        return;
    }

    setInterval(nextGallery, 5000);
}

function initPage() {
    initProjectFilter();
    initModalHandlers();
    initCollapsibleCards();
    initHeaderScroll();
    initGalleryCarousel();
    initGalleryAutoRotate();

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
}

document.addEventListener('DOMContentLoaded', initPage);

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});