<!-- 
=================
PRE-COMPONENT JS SCRIPT,
PRE-LOADING CRITICAL COMPONENT DATA,
=================
-->

<script context="module">
    // import { data } from "../../store/data.js"; // DUMMY DATA,

	import { get } from 'utils.js'; // API - UTILS.js

    /**
     * PRELOADING Function,
     * -----
     * Desc:
     * Loads Up Data Before Intializing the Original Page Load
     * -----
     * @param param0
    */
    export async function preload({ params, query }) {
        // const { slug } = params; // search/[slug]

        var query_string = query.for; // ?for=''
        // var query_type = query.type;  // &type=''

        // string of words array = ['word1', 'word2']
        var string_aplit_array = query_string.split(" "); 

        // get data from the database, by deafult = ALL DATA (TEXT & IMAGES);
        const res = await get(`database/connect`);  // JSON Return,
        // const res = await get(`search.json`);    // JSON Return Alternative Path,
        
        let data = res;

        // search v.2,
        // Ability to search amongst many keywords at once, and not limited to a single words at a time,
        // https://stackoverflow.com/questions/55168464/compare-filter-two-arrays-where-array-b-contains-any-substring-of-a
        // https://stackoverflow.com/questions/12433604/how-can-i-find-matching-values-in-two-arrays
        // var searchResult = data.
        var searchResult = data.filter( 
            // check for SEARCH ARRAY - compatability,
            obj => obj.search_tags.some( 
                searchTag => string_aplit_array.some(a => searchTag.toLowerCase().includes(a.toLowerCase()))
            )
        );

        data = searchResult;

        return { data };
    }
</script>

<!--
=============
COMPONENT SCRIPT 
=============
-->

<script>
    //~~~~~~~~~~~~~~
    // COMPONENT TRANSITIONS
    import { fade, slide } from 'svelte/transition';

    import { visitedLinks } from '../../store/store_userVisitedLink.js';

    // ~~~~~~~~~~~~~
    // EXTERNAL COMPONENTS,
    import NewsArticleCard from '../_components/Containers/_NewsArticleCard.svelte';

    import AllResultsSearch from '../_components/Views/_AllResultsSearch.svelte';
    import NewsSearch from '../_components/Views/_NewsSearch.svelte';
    import ImageSearch from '../_components/Views/_ImagesSeachView.svelte';

    // ~~~~~~~~~~~~~
    // EXTRNAL DATA,
    // import { newsData } from '../../store/dummy_newsData.js';
    // import { results } from '../../store/dummy_resultsData.js';

    // ~~~~~~~~~~~~~
    // COMPONENT LOCAL DATA,
    let searchOpt = 'Visual Search';
    let searchNum;

    // ~~~~~~~~~~~~~
    // COMPONENT REAL DATA,
    export let data;
    export let query_type;

	import { stores } from '@sapper/app';
    const { page } = stores();

    let searchCategeoryDataArray;
    let searchCategeory = 'website';

    $: {
        // or changing the website URL lnk probramtically,
        // https://stackoverflow.com/questions/824349/how-do-i-modify-the-url-without-reloading-the-page
        // https://stackoverflow.com/questions/65385522/sapper-is-not-reloading-data-when-hitting-link
        // https://github.com/sveltejs/kit/issues/552

        console.log($page);
        // data = data;
        console.log('CHANGE OBSERVED');
        changeView(searchCategeory);

        // console.log(data);
        // console.log(query_type);
        // console.log(searchCategeory);
        // searchCategeory = query_type;
    }

    // Instantiate The Selected Search View
    changeView(searchCategeory);

    /**
     * Function,
     * -----
     * Desc: A method for setting the view of the Type of Array of Objects,
     * ... website ... image ... article ...
     * -----
     * Returns: NaN
    */
    function changeView(searchView) {
        searchCategeoryDataArray = data.filter(function(result) {
            return result.category == searchView.toLowerCase();
        });
        // console.log(searchCategeoryDataArray);
        searchNum = searchCategeoryDataArray.length;
        searchCategeory = searchView
    };

    let sort_box = false;

    // other stuff, - Not In Use ATM,
    let websiteData, websiteCounter = 0;
    let newsData, newsCounter = 0;
    $: {
        newsData = data.filter(function(result) {
            return result.category == 'article';
        });
        // console.log(newsData);
        newsCounter = newsData.length;

        websiteData = data.filter(function(result) {
            return result.category == 'website';
        });
        // console.log(newsData);
        websiteCounter = websiteData.length;
    }

    /**
     * Function, 
     * [WORKING]
     * -----
     * Desc: A method for sorting the Array Of Objects Data Alphabetically,
     * both in ascending and descending orders, (1 & -1)
     * ----
     * Returns: NaN
    */
    let alphabetical_type = 0;
    function sortAlpabetically(sort_type) {

        if (alphabetical_type != sort_type) {
            // https://stackoverflow.com/questions/45924821/javascript-sorting-array-of-objects-by-string-property
            if (sort_type == 1) {
                searchCategeoryDataArray = searchCategeoryDataArray.sort((a,b) => 
                    (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)
                )
            } else {
                searchCategeoryDataArray = searchCategeoryDataArray.sort((a,b) => 
                    (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0)
                )
            }
            alphabetical_type = sort_type
        }
        else {
            // resotre back to the orignal data-set
            changeView(searchCategeory)
            alphabetical_type = 0
        }

        // Necessary hot-reload of the data,
        // let tmp_category = searchCategeory
        // searchCategeory = ''
        // setTimeout(() => {
        //     searchCategeory = tmp_category
        // }, 50)
        // console.log(searchCategeoryDataArray)
    }

    /**
     * Function,
     * [WORKING]
     * -----
     * Desc: A method for sorting the Array of Objects Data by Popularity (most-clicked),
     * both in ascending and descending orders, (1 & -1)
     * -----
     * Returns: NaN
    */
    let popularity_type = 0;
    function sortPopularity(sort_type) {

        if (popularity_type != sort_type) {

            if (sort_type == 1) {
                searchCategeoryDataArray = searchCategeoryDataArray.sort((a,b) => 
                    (a.click_rank > b.click_rank) ? 1 : ((b.click_rank > a.click_rank) ? -1 : 0)
                )
            } else {
                searchCategeoryDataArray = searchCategeoryDataArray.sort((a,b) => 
                    (a.click_rank < b.click_rank) ? 1 : ((b.click_rank < a.click_rank) ? -1 : 0)
                )
            }
            popularity_type = sort_type
        } else {
            changeView(searchCategeory)
            popularity_type = 0
        }


        // Necessary hot-reload of the data,
        // let tmp_category = searchCategeory
        // searchCategeory = ''
        // setTimeout(() => {
        //     searchCategeory = tmp_category
        // }, 50)
        // console.log(searchCategeoryDataArray)
    }

    /**
     * Function,
     * [WORKING]
     * -----
     * Desc: A Method for sorting the Array of Objects Data by Sort User Rank (user_rank values),
     * both in ascending and descending orders, (1 & -1)
     * -----
     * Returns: NaN
    */
    let userrank_type = 0
    function sortUserRank(sort_type) {

        if (userrank_type != sort_type) {

            if (sort_type == 1) {
                searchCategeoryDataArray = searchCategeoryDataArray.sort((a,b) => 
                    (a.user_rank > b.user_rank) ? 1 : ((b.user_rank > a.user_rank) ? -1 : 0)
                )
            } else {
                searchCategeoryDataArray = searchCategeoryDataArray.sort((a,b) => 
                    (a.user_rank < b.user_rank) ? 1 : ((b.user_rank < a.user_rank) ? -1 : 0)
                )
            }
            userrank_type = sort_type
        } else {
            changeView(searchCategeory)
            userrank_type = 0
        }

        // Necessary hot-reload of the data,
        // let tmp_category = searchCategeory
        // searchCategeory = ''
        // setTimeout(() => {
        //     searchCategeory = tmp_category
        // }, 50)
        // console.log(searchCategeoryDataArray)
    }

    let secure_links = false;
    let toggleSecureDataArray;

    /**
     * Function,
     * [WORKING]
     * -----
     * Desc: A Method for filtering out currently visible search-results to display only the secure links,
     * those with a qulified "https://"... on their links.
     * -----
     * Returns: NaN
    */
    function showSecureLinks() {

        secure_links = !secure_links;

        if (secure_links) {
            toggleSecureDataArray = searchCategeoryDataArray
            searchCategeoryDataArray = searchCategeoryDataArray.filter(function(result) {
                return result.secure == true;
            });
        } else {
            searchCategeoryDataArray = toggleSecureDataArray
        }

        // Necessary hot-reload of the data,
        // let tmp_category = searchCategeory
        // searchCategeory = ''
        // setTimeout(() => {
        //     searchCategeory = tmp_category
        // }, 50)
        // console.log(searchCategeoryDataArray)
    }

    let visited_links = false;
    let toggleVistiedDataArray;

    /**
     * Function,
     * [WORKING]
     * -----
     * Desc: A Amethod for filtering out the visted-non-visted website links among the already visible searched links,
     * taken from the users localStorage()
     * -----
     * Returns: NaN
    */
    function showVisitedLinks() {

        visited_links = !visited_links

        if (visited_links) {
            toggleVistiedDataArray = searchCategeoryDataArray
            // https://stackoverflow.com/questions/32965688/comparing-two-arrays-of-objects-and-exclude-the-elements-who-match-values-into
            searchCategeoryDataArray = searchCategeoryDataArray.filter(function(result) {
                return $visitedLinks.some(function(elem) {
                    return elem.url.includes(result.url)
                })
            });
        } else {
            searchCategeoryDataArray = toggleVistiedDataArray;
        }

        // Necessary hot-reload of the data,
        // let tmp_category = searchCategeory
        // searchCategeory = ''
        // setTimeout(() => {
        //     searchCategeory = tmp_category
        // }, 50)
        // console.log(searchCategeoryDataArray)
    }
</script>

<!--
=============
COMPONENT SVELTE STUFF 
=============
-->

<svelte:head>
	<title> Netxplora | Search </title>
</svelte:head>

<!--
=============
COMPONENT HTML 
=============
-->

<!-- 
==========
Moobile Version & Laptop Version, 
==========
-->
<div id='mobile-results-container'>

    <!-- search opts. , -->

	<div id='search-opt-container'>
		<button id='all-websites-btn' class:servicesSel={searchCategeory === 'website'} class:activeOpt={searchCategeory === 'website'} on:click={() => changeView('website')} class='button-icon menu-opt'>All</button>
		<button id='services-btn' class:servicesSel={searchCategeory === 'service'} class:activeOpt={searchCategeory === 'service'} on:click={() => changeView('service')} class='button-icon menu-opt'>Services</button>
		<button id='news-btn' class:newsSel={searchCategeory === 'article'} class:activeOpt={searchCategeory === 'article'} on:click={() => changeView('article')} class='button-icon menu-opt'>News</button>   
		<button id='images-btn' class:imagesSel={searchCategeory === 'image'} class:activeOpt={searchCategeory === 'image'} on:click={() => changeView('image')} class='button-icon menu-opt'>Images</button>  
		<button id='sort-btn' on:click={() => sort_box = !sort_box} class='button-icon'>Sort</button>
	</div>

    <!-- sort container, -->

    {#if sort_box}
        <div transition:slide="{{ duration: 500 }}" id='sort_box'>
            <div class='sort-col'>
                <!-- sort alphabetically, -->
                <div class='asc-desc-sort'>
                    <h6>Alphabtically</h6>
                    <div id='asc-aplh' class='sort-opt-btn' class:asc-aplh-sel={alphabetical_type == 1} on:click={() => sortAlpabetically(1)} > </div>
                    <div id='desc-aplh' class='sort-opt-btn' class:desc-aplh-sel={alphabetical_type == -1} on:click={() => sortAlpabetically(-1)} > </div>
                </div>
                <!-- sort popularity, -->
                <div class='asc-desc-sort'>
                    <h6>By Popularity</h6>
                    <div id='asc-pop' class='sort-opt-btn' class:asc-rank-sel={popularity_type == 1} on:click={() => sortPopularity(1)} > </div>
                    <div id='desc-pop' class='sort-opt-btn' class:desc-rank-sel={popularity_type == -1} on:click={() => sortPopularity(-1)} > </div>
                </div>
                <!-- sort by user voting, -->
                <div class='asc-desc-sort'>
                    <h6>By User Voting</h6>
                    <div id='asc-vote' class='sort-opt-btn' class:asc-rank-sel={userrank_type == 1} on:click={() => sortUserRank(1)} > </div>
                    <div id='desc-vote' class='sort-opt-btn' class:desc-rank-sel={userrank_type == -1} on:click={() => sortUserRank(-1)} > </div>
                </div>
            </div>
            <div class='sort-col'>
                <button class:activeOpt={secure_links == true} class='sort-filter-btn' on:click={() => showSecureLinks()}>Only Secure Links</button>
                {#if secure_links}
                    <img src="./assets/svg/verified-tag.svg" alt="verified-tag">
                {/if}
                <button class:activeOpt={visited_links == true} class='sort-filter-btn' on:click={() => showVisitedLinks()}>Show Only Visited</button>
                {#if visited_links}
                    <img src='./assets/svg/visited-tag.svg' alt="visited-tag">
                {/if}
            </div>
        </div>
    {/if}

    <!-- action container, -->

	<div id='result-divider'>
		<img src='./assets/svg/divider_1.svg' alt="divider-left" />
		<h6 style='font-weight: bold;'><span style='font-weight: 400;'>Results</span> {searchNum}</h6>
		<img src='./assets/svg/divider_2.svg' alt="divider-right" />
	</div>

    <!-- search view results, respectively, -->

    {#if searchCategeory === 'website'}
        <!-- all-results (results) search component, -->
        <AllResultsSearch results={searchCategeoryDataArray} /> 
    <!-- {:else if searchCategeory === 'service'} - FUTURE ADDITION -->
        <!-- service (results) search component, -->
        <!-- <AllResultsSearch results={searchCategeoryDataArray} />  -->
    {:else if searchCategeory === 'article'}
        <!-- news search component -->
        <NewsSearch data={searchCategeoryDataArray} />
    {:else if searchCategeory === 'image'}
        <!-- images search component -->
        <ImageSearch data={searchCategeoryDataArray} />
    {/if}

</div>

<!--
=============
COMPONENT CSS
- MOBILE FIRST, 
    WHITE-MODE First,
=============
-->
<style>
    #mobile-results-container {
        display: grid;
        align-items: center;
        grid-gap: 15px;
    }

    #result-divider {
        display: flex;
        align-content: center;
        /* justify-content: space-between; */
        justify-content: center;
        /* margin: 15px 0; */
    } #result-divider h6 {
        white-space: nowrap;
        margin: 0 11px;
    } #result-divider img {
        width: 100%;
    }

    #search-opt-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 100%;
        overflow: scroll;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    #search-opt-container::-webkit-scrollbar {
        display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    #search-opt-container {
        -ms-overflow-style: none;   /* IE and Edge */
        scrollbar-width: none;      /* Firefox */
    }

    #services-btn {
        background-image: url('/assets/svg/services-icon-b.svg');
    } .servicesSel {
        background-image: url('/assets/svg/services-icon-w.svg') !important;
    }
    #news-btn {
        background-image: url('/assets/svg/news-icon-b.svg');
    } .newsSel {
        background-image: url('/assets/svg/news-icon-w.svg') !important;
    }
    #images-btn {
        background-image: url('/assets/svg/images-icon-b.svg');
    } .imagesSel {
        background-image: url('/assets/svg/images-icon-w.svg') !important;
    }

	.menu-opt, #sort-btn, .sort-filter-btn {
        font-size: 10px;
        font-weight: bold;
    } .menu-opt:hover, .activeOpt, #sort-btn {
        background-color: #0085FF;
        color: white;
    }

    #sort-btn {
        background-image: url('/assets/svg/sort-icon-w.svg');
    } #sort-btn:hover {
        background-color: black;
    }
    #sort_box {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-items: center;
        grid-gap: 30px;
    } 
    .sort-col {
        width: 100%;
        display: grid;
        grid-gap: 10px;
    }
    .asc-desc-sort {
        margin: 7px 0;
        display: flex;
        justify-content: space-around;
    }
    .sort-opt-btn {
        height: 20px;
        width: 18px;
    }
    
    #asc-aplh {
        background-image: url('/assets/svg/ascending-alphabetically.svg');
    } .asc-aplh-sel {
        background-image: url('/assets/svg/ascending-alphabetically-selected.svg') !important;
    }

    #desc-aplh {
        background-image: url('/assets/svg/descending-alphabetically.svg');
    } .desc-aplh-sel {
        background-image: url('/assets/svg/descending-alphabetically-selected.svg') !important;
    }

    #asc-pop, #asc-vote {
        background-image: url('/assets/svg/ascending-rank.svg');
    }
    #desc-pop, #desc-vote {
        background-image: url('/assets/svg/descending-rank.svg');
    }
    .asc-rank-sel {
        background-image: url('/assets/svg/ascending-rank-selected.svg') !important;
    }
    .desc-rank-sel {
        background-image: url('/assets/svg/descending-rank-selected.svg') !important;
    }
    
    /* 
    =============
    RESPONSIVNESS
    =============
    */
    
    @media only screen and (min-width: 1024px) {
        #mobile-results-container {
            padding: 0 25vw;
            grid-gap: 50px;
        }
        .menu-opt, #sort-btn, .sort-opt-btn {
            zoom: 1.5;
        }
        .sort-col h6 {
            zoom: 1.5;
        }
        .sort-filter-btn {
            max-width: 120px;
            zoom: 1.5;
        }
    }
</style>