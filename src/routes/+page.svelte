<script>
  import { Icon } from "svelte-icons-pack";
  import { AiFillGithub } from "svelte-icons-pack/ai";
  export let data;
  import { signIn, signOut } from "@auth/sveltekit/client";
</script>

<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">FinTrack</h1>
      <p class="py-6">
        You prob need better gh project tracking right? Get ready to authorize
        with this amazing program!
      </p>
      <button
        class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        on:click={() => data.session?.user ?  location.href="/home" : signIn("github")}
      >
        <Icon src={AiFillGithub} className="font-bold text-3xl" />
        Login</button
      >
    </div>
  </div>
</div>
