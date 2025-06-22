<script>
  // get gh projects from users acc
</script>

<div class="bg-base-200 p-5 rounded-lg shadow-md">
  <h1 class="font-bold text-2xl mb-10">Create a project!</h1>
  <form class="form">
    <div class="form-control">
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
  </form>
</div>
