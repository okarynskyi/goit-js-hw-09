import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const dateNow = Date.now();
        if (selectedDates[0] < dateNow) {
            // window.alert("Please choose a date in the future");
            Notify.info("Please choose a date in the future");
            return
        }
        const choiceDate = selectedDates[0].getTime();          
               
        startBtn.removeAttribute('disabled');
        function timer() {
            const intrvalId = setInterval(() => {
            const currentDate = Date.now();
            const delta = choiceDate - currentDate;
                if (delta <= 0) {
                    clearInterval(intrvalId);
                    return
                };
            convertMs(delta);
            }, 1000)
            
        }
        startBtn.addEventListener('click', timer)
    },
};

flatpickr('input#datetime-picker', options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
