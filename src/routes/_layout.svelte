<!--
=============
COMPONENT SCRIPT 
=============
-->

<script>
	import { darkmode } from '../store/store_darkmode.js';
	import { visitedLinks } from '../store/store_userVisitedLink.js';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	
    // EXTERNAL COMPONENTS,
	import Nav from '../routes/_components/Nav.svelte';
	import Footer from './_components/Footer.svelte';

	// ===
	// Local Variables,
	// ===

	export let segment;
	
	// loading the data in the localStorage(), in the broswer,
	if (process.browser) {

		// Before we can use set on darkmode & linkArray we need to call the
		// useLocalStorage() doing this at the _layout file makes
		// all routes and components exposed to this so we can
		// import the state and call set anywhere like Btn.svelte
		darkmode.useLocalStorage();
		visitedLinks.useLocalStorage();

		// Log it to make sure it works client side, (browser)
		// console.log(localStorage.getItem('netxplora-darkmode-value'));
		// console.log(localStorage.getItem('netxplora-visited-links'));

		// solution to the 404 JSON Err, .localStorage() not found
		// localStorage.clear();
	}	

	// ===
	// COMPONENT METHODS,
	// ===
	  
	/**
	 * Function, [WORKING]
	 * ----
	 * Desc: to check for the darkmode colors of the website,
	 * and the .localStorage()
	*/
    onMount(() => {
        if ($darkmode === true) {
            // console.log('Setting Dark-mode', $darkmode)
            document.body.classList.add('dark-mode');
        } else {
            // console.log('Setting Light-mode', $darkmode)
            document.body.classList.remove('dark-mode');
        }
	});
</script>

<!--
=============
COMPONENT HTML 
=============
-->

<main in:fade out:fade>
	<Nav {segment}/>
	<slot></slot>
</main>

<!-- <Footer /> -->

<!--
=============
COMPONENT CSS
MOBILE FIRST,
=============
-->

<style>
	/* @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'); */
	@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:global(body) {
		font-family: 'Exo 2', sans-serif;
	}
	main {
		padding: 25px 25px 75px 25px;
		position: relative;

		/* height: 100vh; */
    	/* height: var(--app-height); */
	}

	/* 
    =============
    RESPONSIVNESS
    =============
    */
    
    @media only screen and (min-width: 1024px) {
        main {
			padding: 25px 25px 150px 25px;
        }
    }
</style>