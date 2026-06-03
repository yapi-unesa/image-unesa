<script lang="ts">
  import Navbar from '$lib/components/public/Navbar.svelte';
  import Footer from '$lib/components/public/Footer.svelte';

  let { data, children } = $props();
</script>

<Navbar config={data.siteConfig} session={data.session} />

<main>
  {@render children()}
</main>

<Footer config={data.siteConfig} />
