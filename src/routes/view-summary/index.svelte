<!--
=============
COMPONENT SCRIPT 
=============
-->

<script>
    import { selectedTimeSlots } from '../../store/store_userSelectedTimeSlots.js';

    let selectedTimeSlotsbyUserValues = $selectedTimeSlots.selectedTimeSlots
    let firstTimeSlot = selectedTimeSlotsbyUserValues[0]
    let secondTimeSlot = selectedTimeSlotsbyUserValues[1]
</script>

<!--
=============
COMPONENT HTML 
=============
-->

<!-- 
svg (vector-graphic-page); -->
{#if $selectedTimeSlots.selectedTimeSlots.length != 0 && 
    $selectedTimeSlots.selectedAgent.length != 0
    }
    <svg 
    width="546" 
    height="367" 
    viewBox="0 0 546 367" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <g id="page-section-selected-options-view_svg__page-section">
            <text id="page-section-selected-options-view_svg__Your_preferred_time_slots," fill="#000" xml:space="preserve"
                style="white-space:pre" font-family="Exo 2" font-size="18" font-weight="bold" letter-spacing="0em">
                <tspan x="2" y="108.38">Your preferred time slots,</tspan>
            </text>
            <text id="page-section-selected-options-view_svg__Preferred_agent_behaviour," fill="#000" xml:space="preserve"
                style="white-space:pre" font-family="Exo 2" font-size="18" font-weight="bold" letter-spacing="0em">
                <tspan x="311" y="108.38">Preferred agent behaviour,</tspan>
            </text>
            <g id="page-section-selected-options-view_svg__time-slot">
                <rect x="2" y="140" width="167" height="76.221" rx="8.564" fill="#00AFEF" />
                <path id="page-section-selected-options-view_svg__image_1"
                    fill="url(#page-section-selected-options-view_svg__pattern0)"
                    d="M15.703 152.846h58.236v51.385H15.703z" />
                <g id="page-section-selected-options-view_svg__5:00_PM_to_6:00_PM" font-family="Exo 2" font-size="15.415"
                    font-weight="bold" letter-spacing="0em">
                    <text fill="#fff" xml:space="preserve" style="white-space:pre">
                        <tspan x="81.871" y="165.597"> { firstTimeSlot.time } </tspan>
                        <!-- <tspan x="83.256" y="201.597">6:00 PM</tspan> -->
                    </text>
                    <!-- <text fill="#000" xml:space="preserve" style="white-space:pre">
                        <tspan x="105.212" y="183.597">to
                        </tspan>
                    </text> -->
                </g>
            </g>
            <g id="page-section-selected-options-view_svg__time-slot_2">
                <rect x="2" y="229" width="167" height="76.221" rx="8.564" fill="#00AFEF" />
                <path id="page-section-selected-options-view_svg__image_1_2"
                    fill="url(#page-section-selected-options-view_svg__pattern1)"
                    d="M15.703 241.846h58.236v51.385H15.703z" />
                <g id="page-section-selected-options-view_svg__5:00_PM_to_6:00_PM_2" font-family="Exo 2" font-size="15.415"
                    font-weight="bold" letter-spacing="0em">
                    <text fill="#fff" xml:space="preserve" style="white-space:pre">
                        <tspan x="81.871" y="254.597"> { secondTimeSlot.time } </tspan>
                        <!-- <tspan x="83.256" y="290.597">6:00 PM</tspan> -->
                    </text>
                    <!-- <text fill="#000" xml:space="preserve" style="white-space:pre">
                        <tspan x="105.212" y="272.597">to
                        </tspan>
                    </text> -->
                </g>
            </g>
            <g id="page-section-selected-options-view_svg__agent-option-frame">
                <circle id="page-section-selected-options-view_svg__Ellipse_6" cx="404" cy="233" r="93" fill="#00AFEF" />
                <path id="page-section-selected-options-view_svg__image_3"
                    fill="url(#page-section-selected-options-view_svg__pattern2)" d="M368 172h71.263v58H368z" />

                <!-- type-of-agent -->
                <text id="page-section-selected-options-view_svg__Social_Agent" fill="#fff" xml:space="preserve"
                    style="white-space:pre" font-family="Exo 2" font-size="15.415" font-weight="bold" letter-spacing="0em">
                    <tspan x="359.199" y="254.32">{ $selectedTimeSlots.selectedAgent[0].name }</tspan>
                </text>
            </g>
            <text id="page-section-selected-options-view_svg__You_can_see_the_selected_options:" fill="#000"
                xml:space="preserve" style="white-space:pre" font-family="Exo 2" font-size="28" font-weight="bold"
                letter-spacing="0em">
                <tspan x="2" y="28.48">You can see the selected options:</tspan>
            </text>
            <path id="page-section-selected-options-view_svg__Vector_2" d="M261.5 93v272" stroke="#EEE" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round" />
            <path id="page-section-selected-options-view_svg__Vector_3" d="M544 125 2 126" stroke="#EEE" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
            <pattern id="page-section-selected-options-view_svg__pattern0" patternContentUnits="objectBoundingBox" width="1"
                height="1">
                <use xlink:href="#page-section-selected-options-view_svg__image0" transform="scale(.00654 .0074)" />
            </pattern>
            <pattern id="page-section-selected-options-view_svg__pattern1" patternContentUnits="objectBoundingBox" width="1"
                height="1">
                <use xlink:href="#page-section-selected-options-view_svg__image0_1" transform="scale(.00654 .0074)" />
            </pattern>
            <pattern id="page-section-selected-options-view_svg__pattern2" patternContentUnits="objectBoundingBox" width="1"
                height="1">
                <use xlink:href="#page-section-selected-options-view_svg__image1" transform="scale(.00278 .00341)" />
            </pattern>
            <image 
                id="page-section-selected-options-view_svg__image0" 
                data-name="image.png" 
                width="153" height="135"
                xlink:href={ firstTimeSlot.image } />
            <image 
                id="page-section-selected-options-view_svg__image0_1" 
                data-name="image.png" 
                width="153" height="135"
                xlink:href={ secondTimeSlot.image } />
            <image 
                id="page-section-selected-options-view_svg__image1" 
                data-name="image.png" 
                width="360" height="293"
                xlink:href={ $selectedTimeSlots.selectedAgent[0].image } />
        </defs>
    </svg>
{/if}

<!-- 
next button to the agent-selection-process; -->
<div class='sequence-continuation-container'>
    <a rel=prefetch href="/choose-agent-type">
        <button>Back</button>
    </a>
    <a rel=prefetch href="/your-allocation">
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
    .sequence-continuation-container {
        margin-top: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>