<script lang="ts">
  import { onMount } from "svelte";

  // get gh projects from users acc
  // get users gh projects via api
  let projects: any[] = [];
  let description: string = "";
  let name: string = "";
  let gh_repo: string = "";
  let isAi = false;
  let isPersonal = true;
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

  function handleSubmit(e: any) {
    e.preventDefault();
    fetch("/api/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        gh_repo,
        isAi,
        isPersonal,
      }),
    }).then((r) => {
      alert("good");
      console.log(`Project created: ${name}, ${description}, ${gh_repo}`);
      r.text().then(alert);
    });
  }
</script>

<div class="bg-base-200 p-5 rounded-lg shadow-md">
  <h1 class="font-bold text-2xl mb-10">Create a project!</h1>
  <form class="form grid grid-cols-1 gap-3 flex" on:submit={handleSubmit}>
    <div class="inline-flex">
      <div class="form-control mr-5">
        <label for="name" class="mb-5 mr-5">Name:</label>
        <input
          type="text"
          name="name"
          min="2"
          placeholder="Name for this here :3"
          class="input input-primary"
          max="20"
          bind:value={name}
        />
      </div>
      <div class="form-control">
        <label for="description" class="mb-5 mr-5">Description:</label>
        <input
          type="text"
          name="description"
          placeholder="This project does yadayayaya"
          class="input input-primary"
          minlength="2"
          maxlength="100"
          bind:value={description}
        />
      </div>
    </div>
    <div class="inline-flex w-96">
      <div class="form-control">
        <label for="gh_repo">GH repo to link to:</label>
        <select
          class="select select-accent"
          name="gh_repo"
          bind:value={gh_repo}
        >
          {#each projects as project}
            <option value={project.id}>{project.full_name}</option>
          {/each}
        </select>
      </div>
      <br />
    </div>
    <div class="inline-flex">
      <fieldset class="fieldset rounded-box w-64 p-4">
        <!-- <legend class="fieldset-legend">Login options</legend> -->
        <label class="label">
          <input type="checkbox" bind:checked={isAi} class="checkbox" />
          Is Ai? (uses any type of ai generated code)
        </label>
      </fieldset>
      <fieldset class="fieldset rounded-box w-64 p-4">
        <!-- <legend class="fieldset-legend">Login options</legend> -->
        <label class="label">
          <input type="checkbox" bind:checked={isPersonal} class="checkbox" />
          Personal project (your making this project for fun... and not for work/school)
        </label>
      </fieldset>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
