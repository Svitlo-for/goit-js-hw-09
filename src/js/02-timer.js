import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputPicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector("input[data-start]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

flatpickr(inputPicker, options);