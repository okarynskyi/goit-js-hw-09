import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelay = document.querySelector("input[name=delay]");
const delayStep = document.querySelector("input[name=step]");
const amountIn = document.querySelector("input[name=amount]");
const submitForm = document.querySelector(".form");

submitForm.addEventListener('submit', onButtonClick)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      else {
        reject({ position, delay });
      }
    }, delay);
  })
}

function onButtonClick() {
  let delay = Number(firstDelay.value);
  const step = Number(delayStep.value);
  const amount = Number(amountIn.value);
  event.preventDefault();
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.info(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
  