<!--
=============
COMPONENT SCRIPT 
=============
-->


<script>
    import { selectedTimeSlots } from '../../store/store_userSelectedTimeSlots.js';

    let selectedTimeSlotsbyUserValues = $selectedTimeSlots.selectedTimeSlots
</script>


<!--
=============
COMPONENT HTML 
=============
-->


<!-- page-section-info-actions -->
<div style='margin-bottom: 50px;'>
    <h2>You can see the selected options:</h2>
</div>


<!-- page-section-card-grid -->
<div id='grid-agent-select-container'>
    <div>
        <h2>Your preferred time slots,</h2>
        {#each selectedTimeSlotsbyUserValues as timeSlot}
            <div class='comptact-timeslot-container'>
                {timeSlot}
            </div>
        {/each}
    </div>

    <div>
        <h2>Preferred agent behaviour,</h2>
        {$selectedTimeSlots.selectedAgent}
    </div>
</div>


<!-- next button to the agent-selection-process; -->
<div class='sequence-continuation-container'>
    <a rel=prefetch href="/choose-agent-type">
        <button>Back</button>
    </a>

    <a rel=prefetch href="/">
        <button style='background-color: #60CF70; color: white; font-weight: bold;'>Confirm</button>
    </a>
</div>


<!--
=============
COMPONENT CSS
=============
- MOBILE FIRST DESIGN
=============
-->


<style>
    #grid-agent-select-container {
        display: grid;
        grid-auto-flow: column;
        grid-gap: 15px;
        height: 266px;
    }

    .counter-container {
        background-color: #007CEF;
        padding: 3px;
        color: #FFFFFF;
        border-radius: 2.5px;
        margin-left: 10px;
    }

    .selected-row-container {
        display: flex;
        align-items: center;
        margin-top: 15px;
    }

    .comptact-timeslot-container {
        height: 76.22px;
        width: 167px;

        background-color: #00AFEF;
        color: white;
    }

    .sequence-continuation-container {
        margin-top: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>