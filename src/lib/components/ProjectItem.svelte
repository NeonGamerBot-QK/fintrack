<script>
  export let project;
</script>

<div class="card bg-base-100 w-96 shadow-sm">
  <!-- <figure class="px-10 pt-10">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      class="rounded-xl" />
  </figure> -->
  <div class="card-body items-center text-center bg-base-300">
    <h2 class="card-title">{project.name}</h2>
    <p>{project.description}</p>
    <div class="card-actions">
      <a class="btn btn-primary" href={`/projects/${project.id}`}>View project</a>
    </div>
  </div>
</div>
