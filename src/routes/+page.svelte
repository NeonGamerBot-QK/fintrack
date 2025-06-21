<script>
  import { Icon } from 'svelte-icons-pack';
  import { AiFillGithub } from 'svelte-icons-pack/ai';
</script>

<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">FinTrack</h1>
      <p class="py-6">
       You prob need better gh project tracking right? Get ready to authorize with this amazing program!
      </p>
      <!-- TODO: make this a fancy gh login button :0000 -->
      <button class="btn btn-primary p-5 ">
<Icon src={AiFillGithub} className="font-bold text-3xl" />
        Login</button>
    </div>
  </div>
</div>