const menu = document.querySelector(".menu-btn");
const container = document.querySelector(".nav-container-main");

menu.addEventListener("click", () => {
    const isOpen = container.classList.toggle("open");
    menu.setAttribute("aria-expanded", isOpen);
});

container.addEventListener("click", () => {
    container.classList.remove("open");
    menu.setAttribute("aria-expanded", false);
});