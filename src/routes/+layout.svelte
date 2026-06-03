<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';
  import { createSupabaseBrowserClient } from '$lib/supabaseClient';

  let { data, children } = $props();

  const supabase = createSupabaseBrowserClient();

  onMount(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (session?.expires_at !== data.session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

{@render children()}
