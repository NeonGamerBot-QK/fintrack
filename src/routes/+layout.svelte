<script> 
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
	let { data, children } = $props();
    import "./style.css"
</script>
<Navbar  data={data} />
<div>
    	{@render children()}
</div>
<Footer />