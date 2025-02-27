// Load CSS files progressively
function loadCSS(href) {
    return new Promise((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = () => resolve();
        document.head.appendChild(link);
    });
}

// Progressive loading sequence
document.addEventListener("DOMContentLoaded", async () => {
    // Show body immediately
    document.body.classList.add("loaded");

    // Show header and nav immediately
    document.getElementById("site-header").classList.add("loaded");
    document.getElementById("site-nav").classList.add("loaded");

    // Load critical CSS files first (settings and about)
    await Promise.all([
        loadCSS("/static/css/settings.css"),
        loadCSS("/static/css/about.css")
    ]);

    // Show about section after its styles are loaded
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
        aboutSection.classList.add("loaded");
    }

    // Load remaining CSS files
    let cssLoadDelay = 100;
    const remainingStyles = Array.from(document.querySelectorAll("link[rel='preload'][as='style']"))
        .filter(link => !link.href.includes("settings.css") && !link.href.includes("about.css"));

    remainingStyles.forEach((link, index) => {
        setTimeout(() => {
            loadCSS(link.href);
        }, cssLoadDelay * index);
    });

    // Load remaining content sections progressively
    const sections = Array.from(document.querySelectorAll(".content-section"))
        .filter(section => section.id !== "about-section");
    let sectionDelay = 200;

    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add("loaded");
        }, sectionDelay * (index + 1));
    });
});

// Nav hover effects
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        navLinks.forEach(otherLink => {
            const animation = otherLink.animate(
                [
                    { color: getComputedStyle(otherLink).color },
                    { color: otherLink === link ? "var(--text-hovered)" : "var(--text-unhovered)" }
                ],
                {
                    duration: 400,
                    easing: "ease",
                    fill: "forwards"
                }
            );
        });
    });

    link.addEventListener("mouseleave", () => {
        navLinks.forEach(otherLink => {
            const animation = otherLink.animate(
                [
                    { color: getComputedStyle(otherLink).color },
                    { color: "var(--text-white)" }
                ],
                {
                    duration: 1500,
                    easing: "ease",
                    fill: "forwards"
                }
            );
        });
    });
}); 