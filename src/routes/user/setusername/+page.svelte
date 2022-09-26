<script>
	const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    let userPropose = "anon"+genRanHex(8)
    
</script>
<div class="m-auto">
    <div class="mt-8">

    <div class="card max-w-sm h-96 bg-base-200 shadow-xl m-auto">
		<figure class="h-20 pt-8"><img class="p-2 max-h-20" src="/blancer-logo.svg" alt="blancer-logo" /></figure>
	<div class="card-body flex flex-col items-center">
		<h2 class="card-title">
			Set User name:
		</h2>
        <form action="/setusername" method="post" class="flex flex-col gap-6 items-center">
            <input type="text" name="username" id="username_field" placeholder={userPropose} value={userPropose} class="input input-bordered input-primary w-full max-w-xs" required minlength="3" maxlength="30">
            <input type="submit" value="OK" class="btn btn-circle btn-primary">
        </form>
	</div>
</div>
</div>
</div>

