import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputPicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector("input[data-start]");

const timerDate = document.querySelector("span[data-days]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.dir(selectedDates[0]);
      const currentTime = Date.now();
      if (selectedDates[0].getTime < currentTime) {
        Notiflix.Report.warning('Please choose a date in the future');
      } else {
        
      }
    },
  };

flatpickr(inputPicker, options);