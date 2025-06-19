<script> 
  import Footer from "$lib/components/Footer.svelte";
	let { data, children } = $props();
    import "./style.css"
</script>
<div>
    	{@render children()}
</div>
<Footer />