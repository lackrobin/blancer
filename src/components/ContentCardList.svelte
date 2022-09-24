<script>
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	import CategoryDropdown from './CategoryDropdown.svelte';
	import ContentCard from './ContentCard.svelte';

	export let listings;
	export let categories;

	let filteredlistings = [...listings];
	let search ='';

	const updateSearch = () => {
		filteredlistings = [...listings];
		filteredlistings = filteredlistings.filter((listing) => {
			if (listing.data.title.toLowerCase().includes(search.toLowerCase())) {
				return true;
			} else if (listing.data.abstract.toLowerCase().includes(search.toLowerCase())) {
				return true;
			}
		});
	};

	afterUpdate(() => {
		 updateSearch();
	});
</script>

<div class="flex m-4 justify-between gap-2">
	<CategoryDropdown {categories} />
	<div class="form-control">
		<input
			type="text"
			placeholder="Search"
			class="input input-bordered"
			bind:value={search}
			on:input={updateSearch}
		/>
	</div>
</div>
<div class="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
	{#each filteredlistings as data}
		<ContentCard data={data.data} />
	{/each}
</div>
