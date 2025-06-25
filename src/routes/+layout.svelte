<script> 
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
	let { data, children } = $props();
    import "./style.css"
</script>
<Navbar  data={data} />
<div class="bg-mauve-200">
    	{@render children()}
</div>
<Footer />