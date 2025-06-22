<script lang="ts">
  import { prisma } from "$lib/prisma";

  //   import { page } from "$app/stores"
  // import {  } from "@auth/sveltekit"
  export let data;
  // idk a page of repos maybe?
  export let projects = [];
</script>

<div class="mt-10 ml-5">
  <h1 class="text-xl font-bold">Welcome {data.session?.user?.name}</h1>
  <p>Here are your current projects</p>
  <!-- <div class="grid"></div> -->
</div>
