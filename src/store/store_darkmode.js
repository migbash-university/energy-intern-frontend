import { writable } from 'svelte/store';

function createLocalStorage(key) {
    const { subscribe, set, update } = writable(false);

    return {
        subscribe,
        set,
        update,

        /**
         * Set Darkmode 
         * [WORKING]
         * @param {*} darkmode_val 
        */
        setDarkmode: (darkmode_val) => {
            localStorage.setItem(key, darkmode_val);
            // console.log(darkmode_val); // testing
            set(darkmode_val);
        },

        /**
         * Method for rendeing on the start of the page some new data from,
         * the localstorage,
         * [WORKING]
        */
        useLocalStorage: () => {
            // reset the writable to the localStorage if localStorage already exists,
            var existing = localStorage.getItem(key);
            // console.log(existing); // testing, - "string"
            var valueBool = existing == 'true' ? true : false;
            set(valueBool);
        }
    }
}

export const darkmode = createLocalStorage('netxplora-darkmode-value');