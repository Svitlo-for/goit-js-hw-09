import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputPicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector("[data-start]");

const timerDays = document.querySelector("span[data-days]");
const timerHours = document.querySelector("span[data-hours]");
const timerMinutes = document.querySelector("span[data-minutes]");
const timerSeconds = document.querySelector("span[data-seconds]");

let selectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      const currentTime = new Date();
      selectedDate = selectedDates[0];
      if (selectedDate < currentTime) {
        Notiflix.Notify.warning('Please choose a date in the future');
        startBtn.disabled = true;
        return;
      }
      startBtn.disabled = false;
    },
  };

flatpickr(inputPicker, options);

startBtn.addEventListener("click", timerClick);
let counter = null;

function timerClick() {
  counter = setInterval(newCounter, 1000);
  startBtn.disabled = true;

  function newCounter() {
    const dateInput = new Date();
    const requiredTime = selectedDate - dateInput;

    if (requiredTime > 0) {
      const {days, hours, minutes, seconds} = convertMs(requiredTime);

      timerDays.textContent = addLeadingZero(days);
      timerHours.textContent = addLeadingZero(hours);
      timerMinutes.textContent = addLeadingZero(minutes);
      timerSeconds.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(counter);
      startBtn.disabled = false;
    }
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

