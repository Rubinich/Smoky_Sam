
const openBtn = document.getElementById("openButton");
if (openBtn) {
    openBtn.addEventListener("click", openMenu);
}

const closeBtn = document.getElementById("closeButton");
if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
}

const submitNews = document.getElementById("submit-news");
if (submitNews) {
    submitNews.addEventListener("click", sendMail);
}

const submitContact = document.getElementById("submit-contact");
if (submitContact) {
    submitContact.addEventListener("click", sendMail);
}

const arrow_down = document.getElementById("arrow_down");
const mainPrepareSection = document.querySelector(".main-prepare");
const mainContactSection = document.querySelector(".main-info");
const mainStorySection = document.querySelector(".main-about-story")
if (arrow_down) {
    arrow_down.addEventListener("click", () => {
        if (mainPrepareSection) {
            mainPrepareSection.scrollIntoView();
        } else if (mainContactSection) {
            mainContactSection.scrollIntoView();
        } else if (mainStorySection) {
            mainStorySection.scrollIntoView();
        }
    });
}


let isOpenMenuComplete;
let isCloseMenuComplete;
const mobileMenu = document.querySelector(".mobile-layout-menu");
function openMenu() {
    document.body.classList.add("no-scrolling");
    openBtn.classList.add("rotate-and-hide");
    closeBtn.classList.add("rotate-and-show");
    setTimeout(() => {
        openBtn.style.display = "none";
        closeBtn.style.display = "block";
        isOpenMenuComplete = true;
        openBtn.classList.remove("rotate-and-hide");
        closeBtn.classList.remove("rotate-and-show");
    }, 500);
    mobileMenu.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    closeBtn.classList.add("reverse-rotate-and-show");
    openBtn.classList.add("reverse-rotate-and-hide");
    setTimeout(() => {
        openBtn.style.display = "block";
        closeBtn.style.display = "none";
        setTimeout(() => {
            isCloseMenuComplete = true;
            if (isOpenMenuComplete && isCloseMenuComplete) {
                openBtn.style.removeProperty("display");
                closeBtn.style.removeProperty("display");
                isOpenMenuComplete = false;
                isCloseMenuComplete = false;
            }
        }, 500);
        openBtn.classList.remove("reverse-rotate-and-hide");
        closeBtn.classList.remove("reverse-rotate-and-show");
        mobileMenu.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scrolling");
    }, 500);
}

function sendMail(event) {
    const triggerButton = event.target;
    const isContactForm = triggerButton.id === "submit-contact";
    if (isContactForm) {
        const firstName = document.getElementById("first-name-contact").value;
        const lastName = document.getElementById("last-name-contact").value;
        const email = document.getElementById("email-contact").value;
        const phone = document.getElementById("phone-number-contact").value;
        const message = document.getElementById("message-contact").value;
        const para = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phone,
            message: message,
        };
        emailjs.send("service_uc7h4s8", "template_njcn8yl", para)
            .then(function (response) {
                showAlert("Subscription successful!");
                document.getElementById("first-name-contact").value = "";
                document.getElementById("last-name-contact").value = "";
                document.getElementById("email-contact").value = "";
                document.getElementById("phone-number-contact").value = "";
                document.getElementById("message-contact").value = "";
            })
            .catch(function (error) {
                showAlert("An error occurred while subscribing. Please try again later.");
            });
        event.preventDefault();
    } else {
        const firstName = document.getElementById("first-name-news").value;
        const lastName = document.getElementById("last-name-news").value;
        const email = document.getElementById("email-news").value;
        const para = {
            first_name: firstName,
            last_name: lastName,
            email: email,
        };
        emailjs.send("service_1zzkt2m", "template_3rwzcf6", para)
            .then(function (response) {
                showAlert("Subscription successful!");
                document.getElementById("first-name-news").value = "";
                document.getElementById("last-name-news").value = "";
                document.getElementById("email-news").value = "";
            })
            .catch(function (error) {
                showAlert("An error occurred while subscribing. Please try again later.");
            });
        event.preventDefault();
    }
}

function showAlert(message) {
    const alert = document.getElementById("custom-alert");
    const messageElement = document.getElementById("alert-message");
    document.body.classList.add("no-scrolling");
    messageElement.textContent = message;
    alert.style.display = "block";
}

function closeAlert() {
    const alert = document.getElementById("custom-alert");
    alert.style.display = "none";
    document.body.classList.remove("no-scrolling");
}

const buttons = document.querySelectorAll("#before-button, #after-button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.id === "after-button" ? 1 : -1;
        const slides = document.getElementById("carousel").querySelector("#images");
        const activeSlide = slides.querySelector(".active")
        let nextIndex = [...slides.children].indexOf(activeSlide) + offset
        if (nextIndex < 0) {
            nextIndex = slides.children.length - 1
        }
        if (nextIndex >= slides.children.length) {
            nextIndex = 0
        }
        slides.children[nextIndex].classList.add("active");
        activeSlide.classList.remove("active");
    })
});



window.onload = function () {
    /*dynamicHeightUpdate();*/
    setHeight();
};

/*
function dynamicHeightUpdate() {
    const activeCard = document.querySelector(".limited-card.active");
    const layout = document.getElementById("carousel");
    if (activeCard) {
        const activeCardHeight = activeCard.clientHeight;
        layout.style.height = `${activeCardHeight}px`;
    }
    
}*/


function setHeight() {
    const imageIndex = document.getElementById("bg_image");
    const containerHeader = document.querySelector(".container-header");
    if (imageIndex && containerHeader) {
        const topOffset = window.innerHeight - window.document.documentElement.clientHeight;
        let dynamicHeaderHeight;
        const computedStyles = window.getComputedStyle(containerHeader);
        if (window.innerWidth <= 768) {
            dynamicHeaderHeight = parseInt(computedStyles.getPropertyValue("--header-height-phone-tablet"));
        } else if (window.innerWidth <= 1023) {
            dynamicHeaderHeight = parseInt(computedStyles.getPropertyValue("--header-height-tablet-laptop"));
        } else {
            dynamicHeaderHeight = parseInt(computedStyles.getPropertyValue("--header-height-default"));
        }
        const height = window.innerHeight - topOffset - dynamicHeaderHeight;
        imageIndex.style.height = `${height}px`;
    }
}


const newsBtn = document.getElementById("newsletter_button");
if (newsBtn) {
    newsBtn.addEventListener("click", function () {
        event.preventDefault();
        window.location.href = "index.html#newsSection";
    });
}

