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
    <h2>Please select your preferred timeslots,</h2>
    <div class='selected-row-container'>
        <img src="./assets/svg/info-icon.svg" alt="info-icon">
        <p style='color: #007CEF; font-weight: bold; margin-left: 5px;'>- you can select up to 1 type of agent,</p>
    </div>
    <!-- counter for the selected time-slot-cards, -->
    <div class='selected-row-container'>
        <p>Selected</p>
        <span class='counter-container'>0/1</span>
    </div>
</div>


<!-- page-section-card-grid -->
<div id='grid-agent-select-container'>
    <!-- {#each time_slot_data.slice(slide_a, slide_b) as slot_item} -->
        <!-- <TimeSlotCard time_data={slot_item} /> -->
    <!-- {/each} -->
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