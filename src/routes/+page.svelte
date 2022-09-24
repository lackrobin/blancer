<script>
	import ContentCardList from '../components/ContentCardList.svelte';

	export let data

</script>


<div class="flex flex-col justify-center items-center p-2">
	<h1 class="font-bold text-2xl">Welcome</h1>
	<div class="flex">
		<p>Find Jobs or Services.</p>
	</div>
</div>

<ContentCardList listings={data.listings} categories={data.categories}></ContentCardList>