import { writable } from 'svelte/store';

function createLocalStore(key) {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set,
        update,

        /**
         * Function, [WORKING]
         * -----
         * Desc:
         * Updates the URL Vote of the Target URL And LocalStroage Use
         * -----
         * @param {*} vote 
        */
        setRecordedData: (url, vote) => {
            // reset the writable to the localStorage, ... if localStorage already exists,
            var existing = localStorage.getItem(key);

            // data Always Exists
            existing = existing ? JSON.parse(existing) : [];

            // upvote the user casted vote for target url,
            const votedArrayLink = existing.map(p => {
                var object = p.url === url ? {...p, vote: vote} : p
                return object;
            });
            // console.log(votedArrayLink)

            // save back to localStorage, and set as subscriber,
            localStorage.setItem(key, JSON.stringify(votedArrayLink));
            set(votedArrayLink);
        },

        /**
         * Function, [WORKING]
         * -----
         * Desc:
         * Set User Visited Links,
         * -----
         * @param {*} visitedLink 
        */
        setVisitedLink: (visitedLink) => {
            // reset the writable to the localStorage, ... if localStorage already exists,
            var existing = localStorage.getItem(key);

            // If no existing data, create an array of objects,
            // Otherwise, convert the localStorage string to an array of objects,
            existing = existing ? JSON.parse(existing) : [];

            // Check if Set Url Already Exists in the .localStorage()
            const urlExists = existing.find(function(urlItem) {
                return urlItem.url == visitedLink;
            });
            // console.log(urlExists)
            
            // Add new data to localStorage Array, or not
            if (urlExists == undefined) {
                existing.push({'url': visitedLink, 'vote': 0});
            }

            // Save back to localStorage, and set as subscriber,
            localStorage.setItem(key, JSON.stringify(existing));
            set(existing);
        },

        /**
         * Method for rendeing on the start of the page some new data from,
         * the localstorage,
         * [WORKING]
         */
        useLocalStorage: () => {
            // reset the writable to the localStorage if localStorage already exists,
            var existing = localStorage.getItem(key);

            // If no existing data, create an array
            // Otherwise, convert the localStorage string to an array
            existing = existing ? JSON.parse(existing) : [];

            // console.log(existing)
            
            set(existing);
        }
    }
}

// If localStorage has the key then it will be used
// if not the default will be used. Format:
// export const var = createLocalStore(key, default)
export const visitedLinks = createLocalStore('netxplora-visited-links');