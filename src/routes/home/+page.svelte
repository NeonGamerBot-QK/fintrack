<script lang="ts" >
  //   import { page } from "$app/stores"
  // import {  } from "@auth/sveltekit"
  export let data;
  // idk a page of repos maybe?
  export let projects = data.projects || [];
</script>

<div class="mt-10 ml-5">
  <h1 class="text-xl font-bold">Welcome {data.session?.user?.name}</h1>
  <p>Here are your current projects</p>
  <!-- <div class="grid"></div> -->
   {#if projects.length > 0}
   <p>projects existo</p>
   {:else}
  <div>
    <button class="btn btn-primary p-2 mt-10" on:click={() => {
      // fetch to form or smt
    }}>Create a project, You have none right now :3</button>
  </div>
   {/if}
</div>
