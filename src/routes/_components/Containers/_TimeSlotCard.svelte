<!--
=============
COMPONENT SCRIPT 
=============
-->

<script>
    import { fade } from "svelte/transition";

    export let time_data;

    let selected = false;

    /**
     * Function | Method
     * ---
     * Desc:
     * The ability to select a particular timeslot card,
     * store it and UI/UX change for its display,
     * ---
     * Return:
     * NaN
    */
    function selectTimeSlot() {
        selected = !selected;
    }
</script>

<!--
=============
COMPONENT HTML 
=============
-->

<div transition:fade class='time-slot-card' on:click="{() => selectTimeSlot()}">
    <!-- selected-icon container -->
    {#if selected}
        <img in:fade="{{ duration: 250 }}" class='select-ui-icon' src="./assets/svg/selected-card-icon.svg" alt="selected-icon">
    {/if}

    <img src='{time_data.image}' alt="">
    <!-- https://stackoverflow.com/questions/44628663/newline-character-does-not-work-when-parsing-as-json-string-object -->
    <h3 style="white-space: pre-wrap">{time_data.time}</h3>
</div>

<!--
=============
COMPONENT CSS
=============
- MOBILE FIRST DESIGN
=============
-->

<style>
    .time-slot-card {
        width: 241px;
        height: 266px;

        cursor: pointer;
        text-align: center;
        text-align: -webkit-center;

        position: relative;

        overflow: hidden;

        background-color: #00AFEF;
        color: white !important;
        border-radius: 10px;
        transition: all ease 0.3s;
    } .time-slot-card:hover {
        box-shadow: 0 0 10px #000000;
        background-color: white;
        color: black;
    } .time-slot-card img {
        width: 50%;
    }

    .select-ui-icon {
        position: absolute;
        width: 50px !important;
        right: 0px;
        top: 0px;
    }
</style>
