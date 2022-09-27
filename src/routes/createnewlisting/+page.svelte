<script>
    import Lottie from "../../components/Lottie.svelte";
    import ContentCard from "../../components/ContentCard.svelte";
    import { username } from "../../stores";


    // let type = "service"
    let data = {
        type: "service",
        title: "",
        description: "",
        tags: [],
        price: ""
    }

    let inputTags = ""
    $: state = 1

    $: tags = data.tags

    $: validationErrors = []


    function handleNext() {
        if (state === 2) {
            validationErrors = []
            let validationMessage = checkFormValid()
            if (!validationMessage) {
                state++
            }
            else {
                showFormError(validationMessage)
            }
        }
        else {
            state++
        }
        if (state === 4) {
            sendData()
        }
    }
    function handleBack() {
        state--
    }

    function sendData() {
        fetch("/createlisting", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ data: data })
        }).catch((e) => {
            state--
        })
            .then((response) => {
                state++
            });
    }

    function handleTags(e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            if (!data.tags.includes(inputTags) && data.tags.length < 5) {
                data.tags.push(inputTags)
                tags = data.tags
            }
            inputTags = ""
        }
    }

    function deleteTag(tag) {
        data.tags = data.tags.filter(e => e !== tag)
        tags = data.tags
    }

    function deleteError(errorMessage) {
        validationErrors = validationErrors.filter(e => e !== errorMessage)
    }

    function checkFormValid() {
        if (data.title.length <= 10 || data.title.length >= 75) {
            return "The title should be 10-75 characters long."
        }
        else if (data.description.length <= 100 || data.description.length >= 5000) {
            return "The description should be 100-5000 characters long."
        }
        else if (parseInt(data.price) === NaN || data.price === "") {
            return "The price has to be a number."
        }
        else if (parseInt(data.price) >= 100000000 || parseInt(data.price) <= 0) {
            return "The price has to be between 1-100000000 stas"
        }
        else
            return false
    }

    function showFormError(validationMessage) {
        validationErrors.push(validationMessage)
        validationErrors = validationErrors
    }
</script>

{#if $username === "anon"}
    <div class="flex flex-col w-64 items-center justify-center gap-4">
        <p>You have to be logged in to list something</p>
        <a href="/login">
            <button class="btn btn-primary">
                Login
            </button>
        </a>
    </div>
{:else}
     <!-- else content here -->
<div class="flex flex-col items-center justify-center gap-4">
    <div>

        <ul class="steps font-bold mt-4">
            <li data-content="✨" class="step step-primary">Type</li>
            <li data-content='📝' class="step {state >1 ?" step-primary" :""}">Describe</li>
            <li data-content='🚀' class="step {state >2 ?" step-primary" :""}">Launch</li>
        </ul>
    </div>

    {#if state==1}
    <div class="mt-8">
        <div class="flex w-full">
            <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center p-2 w-40">
                <p class="font-bold">
                    Offer a Service
                </p>
                <input type="radio" value="service" name="type-radio" class="radio radio-primary" bind:group={data.type}
                    checked />
            </div>
            <div class="divider divider-horizontal">OR</div>
            <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center p-2 w-40">
                <p class="font-bold">
                    Offer a Job
                </p>
                <input type="radio" value="job" name="type-radio" class="radio radio-primary" bind:group={data.type} />
            </div>
        </div>
    </div>
    {/if}

    {#if state==2}
    <div class="mt-8 flex flex-col gap-2 max-w-xs flex-grow">
        <div class="text-lg font-bold">
            {#if data.type === "service"}
            <p>
                I will...
            </p>
            {:else if data.type === "job"}
            <p>
                I'm looking for...
            </p>
            {:else}
            <p>
                I sell...
            </p>
            {/if}
        </div>

        <input type="text" required placeholder="Title" class="input input-bordered input-primary w-max"
            bind:value={data.title} />
        <div class="divider"></div>
        <textarea required class="textarea textarea-primary" placeholder="Description"
            bind:value={data.description}></textarea>
        <input required type="text" pattern="[0-9]" class="input appearance-none input-bordered input-primary w-max"
            bind:value={data.price} placeholder="price in sats" />
        <input type="text" placeholder="tags" class="input input-bordered input-primary w-max" bind:value={inputTags}
            on:keypress={handleTags} />

        <div class="flex gap-2 flex-wrap">

            {#each tags as tag}
            <div class="badge badge-secondary gap-2 cursor-pointer" on:click={(ev)=> {deleteTag(tag)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    class="inline-block w-4 h-4 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
                {tag}
            </div>
            {/each}
        </div>
    </div>
    <div class="toast toast-end">
        {#each validationErrors as errorMessage}
        <div class="alert alert-warning cursor-pointer" on:click={(ev)=> {deleteError(errorMessage)}}>
            <div>
                <span>{errorMessage}</span>
            </div>
        </div>
        {/each}
    </div>
    {/if}

    {#if state==3}
    <div class="w-80">
        <ContentCard {data}> </ContentCard>

    </div>
    {/if}

    {#if state==4}
    <div class="w-40 h-40">
        <Lottie lottiePath={"/loading-primary.json"} isAutoplay={true} isLoop={true}></Lottie>
    </div>
    {/if}




    <div class="flex gap-4">
        {#if state!==1}
        <div>
            <button class="btn btn-outline" on:click={handleBack}>Back</button>
        </div>
        {/if}

        <div>
            <button class="btn btn-primary" on:click={handleNext}>Next</button>
        </div>
    </div>
</div>
{/if}
