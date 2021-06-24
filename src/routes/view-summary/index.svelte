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
                <p style="
                    white-space: pre-wrap;     
                    text-align: center;"
                    > {timeSlot} </p>
            </div>
        {/each}
    </div>
    <div>
        <h2>Preferred agent behaviour,</h2>
        <div id='circle-shape'>
            <p id='agent-sum'>{$selectedTimeSlots.selectedAgent}</p>
        </div>
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

    .comptact-timeslot-container {
        height: 76.22px;
        width: 167px;
        background-color: #00AFEF;
        color: white;
        border-radius: 8.5641px;
        margin: 15px 0;
    }

    #circle-shape {
        margin: 15px 0;
        width: 186px;
        height: 186px;
        background: #00AFEF;
        border-radius: 50%;
        display: flex;
    } #agent-sum {
        text-align: center;
        height: fit-content;
        margin: auto;
    }

    .sequence-continuation-container {
        margin-top: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>