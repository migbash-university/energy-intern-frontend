<!--
=============
COMPONENT SCRIPT 
=============
-->

<script>
    import { fade, slide } from 'svelte/transition';

    import { project_config } from 'project_config.js'
    import { time_slot_data } from '../../store/timeslots_data.js';
    import { selectedTimeSlots } from '../../store/store_userSelectedTimeSlots.js';

    import TimeSlotCard from '../_components/Containers/_TimeSlotCard.svelte';

    let slide_a = 0
    let slide_b = 6
    let transition = true;

    /**
     * Method - Function;
     * ---
     * Desc:
     * Allows for the tracking of the slider navigation and view order,
     * ---
     * Return:
     * NaN
     * ---
     * @param val_change
    */
    function updateSliderValues(val_change) {

        transition = false
        setTimeout(() => {
            transition = true
        }, 450)
        slide_a = slide_a + val_change
        slide_b = slide_b + val_change

        // check if the limit of the time slots sliders has been exceded,
        // then reset the slider back to it's intial state,
        if (slide_a == 24 || slide_a == -24) {
            slide_a = 0
            slide_b = 6
        }
    }

    /**
     * SvelteJs Reactiviy Method,
     * ---
     * Desc:
     * selectedTimeSlots stores the users selection options for the current sessions,
     * ---
     * Returns:
     * NaN
    */
    // $ : {
    //     console.log('Data from the Selected Time Slots!')
    //     console.log($selectedTimeSlots)
    // }

</script>

<!--
=============
COMPONENT SVELTE STUFF 
=============
-->

<svelte:head>
	<title> AI Website Energy MVP </title>
    <meta name="title" content="AI Website Energy MVP">
    <meta name="description" content="AI Website Energy MVP">
	<meta name="keywords" content="energy, AI, allocation, selfish-agent, social-agent">
	<meta name="author" content="Miguel Bacharov">
</svelte:head>

<!--
=============
COMPONENT HTML 
=============
-->

<!-- page-section-info-actions -->
<div style='margin-bottom: 50px;'>
    <h2>Please select your preferred timeslots,</h2>
    <p>you can select up to {project_config[0].timeSlotsMax} time slots</p>
    <p>Selected {$selectedTimeSlots.selectedTimeSlots.length}/{project_config[0].timeSlotsMax}</p>
</div>

<!-- page-section-card-grid -->
<div id='grid-time-slots-container'>
    {#if transition}
        {#each time_slot_data.slice(slide_a, slide_b) as slot_item}
            <TimeSlotCard time_data={slot_item} />
        {/each}
    {/if}
</div>


<!-- slider actions and options; -->
<div id='slider-options'>
    <!-- buttons actions -->
    <div id='slider-btn-container'>
        <!-- button more earlier times 
        (falls back to the previous 6 time-slots)
        -->
        <button class='earlier-btn button-icon' on:click={() => updateSliderValues(-6)}>Earlier Times</button>
        <!-- button more later times 
        (falls back to the next 6 time-slots)
        -->
        <button class='later-btn button-icon-right' on:click={() => updateSliderValues(6)}>Later Times</button>
    </div>
</div>


<!-- next button to the agent-selection-process; -->
<a rel=prefetch href="/choose-agent-type">
    <button>Next</button>
</a>

<!--
=============
COMPONENT CSS
=============
- MOBILE FIRST DESIGN
=============
-->
<style>
    #grid-time-slots-container {
        display: grid;
        grid-auto-flow: column;
        grid-gap: 15px;
    }

    #slider-options {
        margin-top: 30px;
    }
    #slider-btn-container {
        display: flex;
    }
    .later-btn {
        /* arrow right, */
        background-image: url("/assets/svg/right-arrow-vector.svg");
        background-repeat: no-repeat;
        background-position: right 15px top 50%;
    }
    .earlier-btn {
        /* arrow left, */
        background-image: url("/assets/svg/left-arrow-vector.svg");
        background-repeat: no-repeat;
        background-position: left 15px top 50%;
    }
</style>