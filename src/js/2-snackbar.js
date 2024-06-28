import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('form');

formEl.addEventListener('submit', e => {
    e.preventDefault();
    const delay = e.target.delay.value;
    const state = e.target.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise.then(delay => {
        iziToast.show({
            title: '',
            message: `✅ Fulfilled promise in ${delay}ms`,
            color: 'green',
            position: 'topRight',
        })
    }).catch(delay => {
        iziToast.show({
            title: '',
            message: `❌ Rejected promise in ${delay}ms`,
            color: 'red',
            position: 'topRight',
        })
    });

    formEl.reset();
});