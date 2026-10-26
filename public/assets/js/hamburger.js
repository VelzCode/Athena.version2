const menu = document.querySelector(".menu-btn");
const container = document.querySelector(".nav-container-main");

menu.addEventListener("click", () => {
    container.classList.toggle("open");
});

container.addEventListener("click", () => {
    container.classList.remove("open");
});