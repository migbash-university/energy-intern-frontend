<!--
=============
COMPONENT SCRIPT 
=============
-->
<script>
    // ===
    // COMPONENT PERSISTANCE
    import { darkmode } from '../../store/store_darkmode.js';
    // ===
	// SVELTE IMPORTS
	import { onMount } from 'svelte';
    import { fly, slide } from "svelte/transition";
	// ===
	// Component Local Variables
	// let darkmode = false;
    let showFooterMenu = false;

    // ===================
    // COMPONENT FUNCTIONS,

    /**
     * Function Dark Mode Toggle Method,
     * Sets the Dark Mode on the Application for the ability for
     * refresh persistance,
     * [WORKING]
     * 
     * @param darkmode_val
    */
    function darkModeToggle(darkmode_val) {
        darkmode.setDarkmode(darkmode_val);
        if (darkmode_val == true) {
            // window.document.html.classList.toggle('dark-mode');
            window.document.body.classList.add('dark-mode');
        } else {
            window.document.body.classList.remove('dark-mode');
        }
    };
</script>

<!--
=============
COMPONENT HTML 
=============
-->

<footer>

    <!-- Mobile Footer Toggle, -->

    <div id='mobile-btn-container'>
        {#if !showFooterMenu}
            <button id='mobile-toggle-btn' class='hidden' on:click="{() => showFooterMenu = !showFooterMenu}">menu</button>
        {:else}
            <button id='mobile-toggle-btn' class='show' on:click="{() => showFooterMenu = !showFooterMenu}">menu</button>
        {/if}
    </div>

    {#if showFooterMenu}
        <div id='mobile-footer' transition:slide="{{ duration: 1000 }}">
            <!-- dark-mode, container -->
            <div>
                <div>
                    <img on:click={() => darkModeToggle(true)} src="./assets/svg/darkmode-dark-vector.svg" alt="dark-vector" />
                    <img on:click={() => darkModeToggle(false)} src="./assets/svg/darkmode-light-vector.svg" alt="light-vector" />
                </div>
                {#if $darkmode == true}
                    <p>Dark Mode <span style='color: #70FF00; font-weight: bold;'>ON</span></p>
                {:else}
                    <p>Dark Mode <span style='color: #FF0000; font-weight: bold;'>OFF</span></p>
                {/if}
            </div>
            <a rel=prefetch class="info" href = "mailto: info@netxplora.com" style="text-decoration: underline;">info@netxplora.com</a>
            <a href="https://twitter.com/netxplora" target="_blank">
                <img src="./assets/svg/twitter.svg" style="color: #00acee; width: 35px;" alt="twitter-logo">
            </a>
            <a rel=prefetch class="info" href="/">Privacy Policy</a>
            <a rel=prefetch class="info" href="/">Terms & Conditions</a>
            <hr />
            <p class="info">© 2021 Netxplora. All rights reserved.</p>
        </div>
    {/if}

    <!-- Laptop Footer, -->

    <div id='laptop-footer-contaier'>
        <!-- dark-mode, container -->
        <div>
            <div>
                <img on:click={() => darkModeToggle(true)} src="./assets/svg/darkmode-dark-vector.svg" alt="dark-vector" />
                <img on:click={() => darkModeToggle(false)} src="./assets/svg/darkmode-light-vector.svg" alt="light-vector" />
            </div>
            {#if $darkmode == true}
                <p>Dark Mode <span style='color: #70FF00; font-weight: bold;'>ON</span></p>
            {:else}
                <p>Dark Mode <span style='color: #FF0000; font-weight: bold;'>OFF</span></p>
            {/if}
        </div>
        <span>
            <p>Search Enine Status</p>
            <p>Operational, bring it on 😎</p>
        </span>
        <a rel=prefetch class="info" href = "mailto: info@netxplora.com" style="text-decoration: underline;">info@netxplora.com</a>
        <a href="https://twitter.com/netxplora" target="_blank">
            <img src="./assets/svg/twitter.svg" style="color: #00acee; width: 35px;" alt="twitter-logo">
        </a>
        <a rel=prefetch class="info" href="/">Privacy Policy</a>
        <a rel=prefetch class="info" href="/">Terms & Conditions</a>
        <hr />
        <p class="info">© 2021 Netxplora. All rights reserved.</p>
    </div>
</footer>


<!--
=============
COMPONENT CSS
=============
MOBILE FIRST,
=============
-->
<style>

    #mobile-footer {
        /* Container Settings */
        /* width: 100%; */
        padding: 1.5rem;

        /* color & design, */
        background: #FFFFFF;
        box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);

        /* flex settings,*/
        display: grid;
		grid-gap: 15px;
		justify-content: stretch;
		align-items: center;
    }

    #mobile-btn-container {
        width: 100%;
        text-align: center;

        background-image: url('/assets/svg/special-btn.svg');
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: cover;
    } #mobile-toggle-btn {
        padding: 7.5px 5px 5px 5px;
        color: white;
        background-color: transparent;
    } .hidden {
        background-image: url('/assets/svg/menu-icon-expand-w.svg');
        background-position: center top 15%;
        background-repeat: no-repeat;
    } .show {
        background-image: url('/assets/svg/menu-icon-hide-w.svg');
        background-position: center top 15%;
        background-repeat: no-repeat;
    }

	footer {
        /* dimensions, */
        width: 100%;
        
        /* color & design, */
        z-index: 100;
        font-size: 16px;

        /* Position Settings*/
        position: fixed;
		bottom: 0;
	} footer p {
        color: #5E5C5C;
		font-weight: 500;
		margin-bottom: 0rem;
	} footer a {
		color: #5E5C5C;
		font-weight: 500;
	}	

    #laptop-footer-contaier {
        display: none;
    }

    /* 
    =============
    RESPONSIVNESS
    =============
    */
    
    @media only screen and (min-width: 1024px) {
        #mobile-btn-container {
            display: none;
        }

        #laptop-footer-contaier {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
        }

        footer {
            padding: 1.5rem;
            background-color: white;
            height: 80px;
            box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
        }

        footer a, footer p {
            font-size: 10px
        }
    }
</style>