<script>
  export let data;
  import { signOut } from "@auth/sveltekit/client";
</script>

<div class="navbar bg-base-100 shadow-sm">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="/">FinTrack</a>
  </div>
  <div class="flex-none">
    {#if data.session && data.session.user}
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Avatar" src={data.session?.user?.image} />
          </div>
        </div>
        <ul
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a href="/settings">Settings</a></li>
          <li><button on:click={() => signOut()}>Logout</button></li>
        </ul>
      </div>
    {/if}
  </div>
</div>
