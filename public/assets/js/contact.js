const contactForm = document.getElementById("c-form");
const message = document.getElementById("reason-message");
const button = document.getElementById("c-formBtn");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const ticked = contactForm.querySelectorAll(`input[type="checkbox"]:checked`).length;

    if (ticked === 0) {
        message.textContent = "Please tick at least one box!";
        return;
    }
    message.textContent = "";

    button.disabled = true;
    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" },
        });

        if (response.ok) {
            message.textContent = "Success, your message has been sent!";
            contactForm.reset();
        } else {
            message.textContent = "Unfortunately, there was a problem sending the message, please try again.";
        }
    }

    catch {
        message.textContent = "Sorry, Your message could not be sent. Please try again or if problem persists contact the administrator.";
    }

    finally {
        button.disabled = false;
    }
});