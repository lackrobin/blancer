<script>
	export let data;
</script>

<div class="m-2 card max-w-sm h-96 bg-base-200 shadow-xl">
	<!-- <a href={data.externalUrl} class="hover:opacity-90">
		<figure><img class="p-2 max-h-14" src={data.imageUrl} alt="{data.title}-logo" /></figure>
	</a> -->
	<div class="card-body flex flex-col gap-3">
		<h2 class="card-title">
			<a href={data.externalUrl} class="link link-primary">
				<p class="overflow-hidden truncate ...">
					{data.title}
				</p>
			</a>
		</h2>
		<div class="flex items-start justify-start gap-2">
			<div class="flex items-start justify-start gap-1">
				<div class=" w-6 h-6 mask mask-star bg-orange-400"></div>
				<p class="align-middle font-bold"> 4.5
				</p>
				<p class="text-gray-500 flex-grow w-full">
					(21)
				</p>
			</div>
			<div>
				{#if data.type==="service"}
				<div class="badge badge-primary badge-outline">Service</div>
				{:else if data.type==="job"}
				<div class="badge badge-secondary badge-outline">Job</div>
				{/if}
			</div>
			<div class="flex gap-1">
				<p class="text-green-600 font-bold w-fit">
					{data.price}
				</p>
				<p class="text-green-600 font-bold w-fit">
					丰
				</p>
			</div>
		</div>
		<div class="h-32 overflow-auto">
			<p>{data.description}</p>
		</div>
		<div class="flex justify-between">
			<div class="card-actions justify-end">
				{#each data.tags as tag}
				<div class="badge badge-outline">
					{tag}
				</div>
				{/each}

			</div>
		</div>
		<div class="flex gap-2 mt-4">

			<div class="bg-orange-400 h-12 w-12 flex items-center justify-center rounded-full">
				<div class="rounded-full h-10 w-10 bg-black">
					<img src="/profile-pic.png" alt="profile pic" class="w-10 h-10 rounded-full overflow-hidden
					">
				</div>
			</div>

			<div>
				<div>
					<a href="/user/" class="text-sm link-primary">
						@User
					</a>
				</div>
				<div>
					<div class="flex items-start justify-start gap-1">
						<div class=" w-6 h-6 mask mask-star bg-orange-400"></div>
						<p class="align-middle font-bold text-sm pt-0.5"> 4.5
						</p>
						<p class="text-gray-500 flex-grow w-full text-sm pt-0.5">
							(21)
						</p>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>