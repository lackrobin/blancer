<script>
	import { page } from '$app/stores';
	import { user } from "../stores";
	
	let title = '₿lancer';
</script>

<header>
	<div class="navbar bg-base-200">
		<div class="navbar-start gap-2">
			<a href="/">
			<div class="h-10 w-10 pb-2 cursor-pointer">
				<img src="/blancer-logo.svg" alt="blancer logo" class="h-10 w-10 transition-all hover:w-11 hover:h-11">
			</div>
		</a>
			<div class="dropdown">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/></svg
					>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<a sveltekit:prefetch class={$page.url.pathname === '/' ? 'text-teal-700' : ''} href="/"
							>Home</a
						>
					</li>
					{#if user}
					<li>
						<a
							sveltekit:prefetch
							class={$page.url.pathname.includes('new') ? 'text-teal-700' : ''}
							href="/add/proposal">+Add new Listing</a
						>
					</li>
				{/if}
					<li>
						<a
							sveltekit:prefetch
							class={$page.url.pathname.includes('about') ? 'text-teal-700' : ''}
							href="/about">About</a
						>
					</li>

				</ul>
			</div>
		</div>
		<div class="navbar-center items-center">

			<a class="pl-1 btn btn-ghost normal-case text-xl hover:text-[#ff7f2a]" href="/">
		
				{title}
			</a>
		</div>
		<div class="navbar-end">
			{#if $user}
				<div class="flex gap-2">
					<a href="/user">{$user}</a>
					<form action="/logout" method="post">
					<input type="submit" value="logout" class="btn btn-ghost normal-case hover:text-[#ff7f2a]">
					</form>
					<!-- <a href="/logout" class="link link-primary">logout</a> -->
				</div>
			{:else}
				<a href="/login" class="btn btn-ghost normal-case text-xl hover:text-[#ff7f2a]">login</a>
			{/if}
		</div>
	</div>
</header>
