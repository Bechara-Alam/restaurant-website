const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const header = document.getElementById("header");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");
const currentYear = document.getElementById("currentYear");
const dateInput = document.getElementById("date");
const pageLoader = document.getElementById("pageLoader");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");
const counters = document.querySelectorAll(".counter");

// Loading screen
window.addEventListener("load", () => {
    window.setTimeout(() => {
        pageLoader.classList.add("hidden");
    }, 600);
});

// Mobile menu
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
});

// Close mobile menu when a link is clicked
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
    const clickedMenu = navLinks.contains(event.target);
    const clickedButton = menuToggle.contains(event.target);

    if (!clickedMenu && !clickedButton) {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }
});

// Header and active link
function updateNavigation() {
    header.classList.toggle("scrolled", window.scrollY > 50);

    let currentSection = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.id;
        }
    });

    navItems.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateNavigation);
updateNavigation();

// Dark theme
const savedTheme = localStorage.getItem("savory-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeIcon.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const darkThemeActive = document.body.classList.contains("dark-theme");

    themeIcon.textContent = darkThemeActive ? "🌙" : "☀️";
    localStorage.setItem("savory-theme", darkThemeActive ? "dark" : "light");
});

// Minimum reservation date
const today = new Date();
const timezoneOffset = today.getTimezoneOffset() * 60000;
const localDate = new Date(today.getTime() - timezoneOffset)
    .toISOString()
    .split("T")[0];

dateInput.min = localDate;

// Reservation form
reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(reservationForm);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const guests = String(formData.get("guests") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const time = String(formData.get("time") || "").trim();

    if (!name || !email || !phone || !guests || !date || !time) {
        formMessage.textContent = "Please complete all required fields.";
        formMessage.style.color = "var(--error-color)";
        return;
    }

    formMessage.textContent =
        `Thank you, ${name}! Your reservation request has been received.`;

    formMessage.style.color = "var(--success-color)";

    reservationForm.reset();
    dateInput.min = localDate;
});

// Menu filters
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        menuCards.forEach((card) => {
            const showCard =
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory;

            card.classList.toggle("hidden", !showCard);
        });
    });
});

// Reveal animations
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// Animated counters
let countersStarted = false;

function startCounters() {
    if (countersStarted) {
        return;
    }

    countersStarted = true;

    counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * target);

            counter.textContent =
                target >= 1000 ? `${value.toLocaleString()}+` : `${value}+`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

const statsSection = document.querySelector(".stats");

const statsObserver = new IntersectionObserver(
    (entries, observer) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.disconnect();
        }
    }, {
        threshold: 0.3
    }
);

statsObserver.observe(statsSection);

// Current year
currentYear.textContent = new Date().getFullYear();