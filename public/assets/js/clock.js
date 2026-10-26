const clockHours = document.querySelector(".clock-hours");
const clockMinutes = document.querySelector(".clock-minutes");
const clockSeconds = document.querySelector(".clock-seconds");

function updateClock() {
    const now = new Date();

    const currentHour = String(now.getHours()).padStart(2, "0");
    const currentMinutes = String(now.getMinutes()).padStart(2, "0");
    const currentSeconds = String(now.getSeconds()).padStart(2, "0");

    clockHours.textContent = currentHour;
    clockMinutes.textContent = currentMinutes;
    clockSeconds.textContent = currentSeconds;
}
updateClock();
setInterval(updateClock, 1000);