// Util.js Page for the API Functionality,
const fetch = process.browser ? window.fetch : require('node-fetch').default;

// Dealing with Only-SSR-Absolute-URLs issue,
// https://stackoverflow.com/questions/55312868/how-to-fix-erroronly-absolute-urls-are-supported-in-react-ssr-graphql
let base_url;
if (process.env.NODE_ENV != 'production') {
	base_url = 'http://192.168.0.10:8080/' 			// localhost issue - 192.168.0.11 is used from time to time,
} else {
	base_url = 'https://netxplora.herokuapp.com/' 	// allow for http:// for better Access to the URL,
}

// Function for Internal MiddleWare Post Request,
export function post(endpoint, data) {

	return fetch(endpoint, {
		method: 'POST',
		// credentials: 'include',
		// mode: "cors",
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(response => {
		return response.json()
	});
}

/**
 * Function,
 * ----
 * Desc:
 * Method for the Calling GET on the internal project structure,
 * through the use of MIDDLEWARE
 * ----
 * @param {*} endpoint 
 * @returns 
*/
export function get(endpoint) {
	return fetch(base_url + endpoint, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(r => r.json());
}

/**
 * Function,
 * ----
 * Desc:
 * Method for the Calling PATCH on the internal project structure,
 * through the use of MIDDLEWARE
 * ----
 * @param {*} endpoint
 * @param {*} data 
 * @returns 
*/
export function patch(endpoint, data) {
	return fetch(base_url + endpoint, {
		method: 'PATCH',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(r => r.json());
}
