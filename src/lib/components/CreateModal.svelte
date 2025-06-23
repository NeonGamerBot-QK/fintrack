<script lang="ts">
  import { onMount } from "svelte";

  // get gh projects from users acc
  // get users gh projects via api
  let projects: any[] = [];
  onMount(() => {
    fetch("/api/github/get-my-repos")
      .then((r) => r.json())
      .then((d) => d.repos)
      .then((data) => {
        // console.log(data, 'data from api')
        if (data && data.length > 0) {
          projects = data;
        } else {
          console.log("No projects found");
        }
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
      });
  });
</script>

<div class="bg-base-200 p-5 rounded-lg shadow-md">
  <h1 class="font-bold text-2xl mb-10">Create a project!</h1>
  <form class="form grid grid-cols-1 gap-3 flex">
    <div class="inline-flex">
      <div class="form-control mr-5">
        <label for="name" class="mb-5 mr-5">Name:</label>
        <input
          type="text"
          name="name"
          min="2"
          placeholder="Name for this here :3"
          class="input input-primary"
        />
      </div>
      <div class="form-control">
        <label for="name" class="mb-5 mr-5">Description:</label>
        <input
          type="text"
          name="description"
          placeholder="This project does yadayayaya"
          class="input input-primary"
          minlength="2"
          maxlength="100"
        />
      </div>
    </div>
    <div class="inline-flex w-96">
      <div class="form-control">
        <label for="gh_repo">GH repo to link to:</label>
        <select class="select select-accent" name="gh_repo">
          {#each projects as project}
            <option value={project.full_name}>{project.full_name}</option>
          {/each}
        </select>
      </div>
      <br />
    </div>
    <button type="submit" class="btn btn-primary" on:click={() => alert("meow")}
      >Submit</button
    >
  </form>
</div>
