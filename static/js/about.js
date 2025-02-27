const emailInput = document.querySelector(".email-field");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(input, skipAnimation = false) {
    if (input.value) {
        const color = emailRegex.test(input.value) ? "var(--green)" : "var(--red)";
        if (skipAnimation) {
            input.style.color = color;
        } else {
            input.animate(
                [
                    { color: getComputedStyle(input).color },
                    { color: color }
                ],
                {
                    duration: 300,
                    easing: "ease",
                    fill: "forwards"
                }
            );
        }
    } else {
        if (skipAnimation) {
            input.style.color = "var(--text-unhovered)";
        } else {
            input.animate(
                [
                    { color: getComputedStyle(input).color },
                    { color: "var(--text-unhovered)" }
                ],
                {
                    duration: 300,
                    easing: "ease",
                    fill: "forwards"
                }
            );
        }
    }
}

validateEmail(emailInput, true); // No animation on initial load
emailInput.addEventListener("input", function() {
    validateEmail(this, false); // Use animation during typing
});

const walletInput = document.querySelector(".wallet-field");
const base58Regex = /^[A-HJ-NP-Za-km-z1-9]+$/;

function validateWallet(input, skipAnimation = false) {
    if (input.value) {
        const color = (base58Regex.test(input.value) && input.value.length === 44) ? "var(--green)" : "var(--red)";
        if (skipAnimation) {
            input.style.color = color;
        } else {
            input.animate(
                [
                    { color: getComputedStyle(input).color },
                    { color: color }
                ],
                {
                    duration: 300,
                    easing: "ease",
                    fill: "forwards"
                }
            );
        }
    } else {
        if (skipAnimation) {
            input.style.color = "var(--text-unhovered)";
        } else {
            input.animate(
                [
                    { color: getComputedStyle(input).color },
                    { color: "var(--text-unhovered)" }
                ],
                {
                    duration: 300,
                    easing: "ease",
                    fill: "forwards"
                }
            );
        }
    }
}

validateWallet(walletInput, true); // No animation on initial load
walletInput.addEventListener("input", function() {
    validateWallet(this, false); // Use animation during typing
});

const infoIcon = document.querySelector(".info-icon");
const infoModal = document.querySelector(".info-modal");
const registerForm = document.querySelector(".register-form");

let currentAnimation = null;

function switchVisibility(show, hide) {
    // Cancel any ongoing animation
    if (currentAnimation) {
        currentAnimation.cancel();
    }

    show.style.visibility = "visible";
    hide.style.visibility = "visible";

    // Create new animation
    const showAnim = show.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 150,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    const hideAnim = hide.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 150,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    // Store the animation for potential cancellation
    currentAnimation = hideAnim;

    // Set final visibility state after animation completes
    hideAnim.onfinish = () => {
        hide.style.visibility = "hidden";
        currentAnimation = null;
    };
}

infoIcon.addEventListener("mouseenter", () => {
    switchVisibility(infoModal, registerForm);
    
    // Brighten icon
    infoIcon.animate(
        [
            { filter: "brightness(1)" },
            { filter: "brightness(2)" }
        ],
        {
            duration: 150,
            easing: "ease-out",
            fill: "forwards"
        }
    );
});

infoIcon.addEventListener("mouseleave", () => {
    switchVisibility(registerForm, infoModal);
    
    // Dim icon
    infoIcon.animate(
        [
            { filter: "brightness(2)" },
            { filter: "brightness(1)" }
        ],
        {
            duration: 150,
            easing: "ease-out",
            fill: "forwards"
        }
    );
});

// Form input field animations
const formInputs = document.querySelectorAll(".form-input-field");
formInputs.forEach(input => {
    input.addEventListener("mouseenter", () => {
        // Only change color if input is empty
        if (!input.value) {
            input.animate(
                [
                    { color: "var(--text-unhovered)", borderBottomColor: "var(--text-unhovered)" },
                    { color: "var(--text-hovered)", borderBottomColor: "var(--text-hovered)" }
                ],
                {
                    duration: 300,
                    easing: "ease",
                    fill: "forwards"
                }
            );
        }
    });

    input.addEventListener("mouseleave", () => {
        // Only change color if input is empty
        if (!input.value) {
            if (!input.matches(":focus")) {
                input.animate(
                    [
                        { color: "var(--text-hovered)", borderBottomColor: "var(--text-hovered)" },
                        { color: "var(--text-unhovered)", borderBottomColor: "var(--text-unhovered)" }
                    ],
                    {
                        duration: 300,
                        easing: "ease",
                        fill: "forwards"
                    }
                );
            }
        }
    });

    // Add blur event to maintain validation color
    input.addEventListener("blur", () => {
        if (input.classList.contains("email-field")) {
            validateEmail(input, true);
        } else if (input.classList.contains("wallet-field")) {
            validateWallet(input, true);
        }
    });
});

// Form button animations
const formBtn = document.querySelector(".form-btn");
formBtn.addEventListener("mouseenter", () => {
    formBtn.animate(
        [
            { color: "var(--text-unhovered)" },
            { color: "var(--text-hovered)" }
        ],
        {
            duration: 300,
            easing: "ease",
            fill: "forwards"
        }
    );
});

formBtn.addEventListener("mouseleave", () => {
    formBtn.animate(
        [
            { color: "var(--text-hovered)" },
            { color: "var(--text-unhovered)" }
        ],
        {
            duration: 300,
            easing: "ease",
            fill: "forwards"
        }
    );
});

// Form divider animations
const formDivider = document.querySelector(".form-devider");
formDivider.addEventListener("mouseenter", () => {
    formDivider.animate(
        [
            { borderBottomColor: "var(--text-unhovered)" },
            { borderBottomColor: "var(--text-hovered)" }
        ],
        {
            duration: 300,
            easing: "ease",
            fill: "forwards"
        }
    );
});

formDivider.addEventListener("mouseleave", () => {
    formDivider.animate(
        [
            { borderBottomColor: "var(--text-hovered)" },
            { borderBottomColor: "var(--text-unhovered)" }
        ],
        {
            duration: 300,
            easing: "ease",
            fill: "forwards"
        }
    );
});