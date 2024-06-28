import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnEl = document.querySelector('button');
btnEl.setAttribute('disabled', '');

let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
    if (userSelectedDate <= Date.now()) {
        iziToast.show({
          title: '',
          message: 'Please choose a date in the future',
          color: 'red',
          position: 'topRight',
        });
        btnEl.setAttribute('disabled', '');
      } else {
      btnEl.removeAttribute('disabled');
      }
      
  },
};

flatpickr('#datetime-picker', options);


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

const spanEl = document.querySelectorAll('.value');
const inputEl = document.querySelector('#datetime-picker')

let intervalId = 0;


btnEl.addEventListener('click', () => {
  btnEl.setAttribute('disabled', '');
  inputEl.setAttribute('disabled', '');
  
  intervalId = setInterval(() => {
    const ms = userSelectedDate - Date.now();
    const time = Object.values(convertMs(ms));
    let n = 0;
    for (const i of spanEl) {
      i.textContent = time[n].toString().padStart(2, '0');
      n += 1;
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    inputEl.removeAttribute('disabled');
  }, userSelectedDate - Date.now());
})



