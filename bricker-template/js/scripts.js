function openContactform() {
    var contactForm = document.getElementById("contact-form");
    if (contactForm != null) {
        contactForm.className = "contact-form__overlay open";
    }
}
function closeContactform() {
    var contactForm = document.getElementById("contact-form");
    if (contactForm != null) {
        contactForm.className = "contact-form__overlay";
    }
}