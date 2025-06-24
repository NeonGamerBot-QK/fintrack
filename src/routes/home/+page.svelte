<script lang="ts">
  import CreateModal from "$lib/components/CreateModal.svelte";
  import ProjectItem from "$lib/components/ProjectItem.svelte";
  import { Modal, Content, Trigger } from "sv-popup";
  export let data;
  // idk a page of repos maybe?
  export let projects = data.projects || [];
</script>

<div class="mt-10 ml-5">
  <h1 class="text-xl font-bold">Welcome {data.session?.user?.name}</h1>
  <p>Here are your current projects</p>
  {#if projects.length > 0}
    {#each projects as proj}
      <ProjectItem project={proj} />
    {/each}
        <div class="mt-20">
      <Modal>
        <Content>
          <CreateModal />
        </Content>
        <Trigger>
          <button class="btn btn-secondary p-2 mt-10">Create a project</button>
        </Trigger>
      </Modal>
    </div>
  {:else}
    <div>
      <Modal>
        <Content>
          <CreateModal />
        </Content>
        <Trigger>
          <button class="btn btn-primary p-2 mt-10">Create a project, You have none right now :3</button>
        </Trigger>
      </Modal>
    </div>
  {/if}
</div>
