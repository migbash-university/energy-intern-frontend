import { writable } from 'svelte/store';

const userObjectOptions = {
    selectedTimeSlots: [],   // user selected cards for the timeslots,
    selectedAgent: undefined // single agent option,
}

function createLocalStorage(key) {
    const { subscribe, set, update } = writable(userObjectOptions);

    return {
        subscribe,
        set,
        update,

        /**
         * SvelteJs Store Function | Method, [WORKING ✅]
         * ---
         * Desc:
         * Remove the target data item of the value of the user timeslot from the
         * user object array,
         * ---
         * Returns:
         * NaN
         * @param {*} timeSlot_Value 
        */
        removeSelectedTimeSlot: (timeSlot_Value) => {
            // will return ['A', 'C']
            let new_array = userObjectOptions.selectedTimeSlots.filter(e => e !== timeSlot_Value); 
            console.log(new_array);

            userObjectOptions.selectedTimeSlots = new_array

            // Save back to localStorage,
            localStorage.setItem(key, JSON.stringify(userObjectOptions));

            // set the new value as the new SvelteJs Store Object for Reactivity,
            set(userObjectOptions);
        },

        /**
         * SvelteJs Store Function | Method, [WORKING ✅]
         * ---
         * Desc:
         * Set user options selection for the time Options,
         * ---
         * Returns:
         * NaN
         * @param {*} timeSlot_Value 
        */
        setSelectedTimeSlots: (timeSlot_Value) => {
            // Add new data to localStorage Array,
            userObjectOptions.selectedTimeSlots.push(timeSlot_Value);
            console.log(userObjectOptions);

            // Save back to localStorage,
            localStorage.setItem(key, JSON.stringify(userObjectOptions));

            // set the new value as the new SvelteJs Store Object for Reactivity,
            set(userObjectOptions);
        },

        /**
         * SvelteJs Store Function | Method, [WORKING ✅]
         * ---
         * Desc: 
         * Method for rendeing on the start of the page some new data from,
         * the localstorage,
         * ---
         * Returns:
         * NaN
        */
        useLocalStorage: () => {
            // Get the existing data
            // reset the writable to the localStorage if localStorage already exists,
            var existing = localStorage.getItem(key);
            // console.log(existing); // testing, - "user-object"

            // If no existing data, create an array
            // Otherwise, convert the localStorage string to an array
            existing = existing ? JSON.parse(existing) : userObjectOptions;
            
            // add the .localStorage() data to the svelteJs store for enabling of the reactiviy,
            set(existing);
        }
    }
}

export const selectedTimeSlots = createLocalStorage('website-ai-user-selected-options');