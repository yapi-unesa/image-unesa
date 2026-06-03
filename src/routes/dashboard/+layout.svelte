<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { createSupabaseBrowserClient } from '$lib/supabaseClient';
  import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
  import Topbar from '$lib/components/dashboard/Topbar.svelte';

  let { data, children } = $props();

  const supabase = createSupabaseBrowserClient();
  let sidebarCollapsed = $state(false);
  let mobileSidebarOpen = $state(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    goto('/login');
  }
</script>

<div class="flex h-screen bg-surface overflow-hidden">
  <!-- Sidebar -->
  <Sidebar
    profile={data.profile}
    currentPath={$page.url.pathname}
    collapsed={sidebarCollapsed}
    mobileOpen={mobileSidebarOpen}
    onCloseMobile={() => (mobileSidebarOpen = false)}
  />

  <!-- Mobile overlay -->
  {#if mobileSidebarOpen}
    <div
      class="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-30 lg:hidden"
      onkeydown={(e) => e.key === 'Enter' && (mobileSidebarOpen = false)}
      onclick={() => (mobileSidebarOpen = false)}
      role="button"
      tabindex="-1"
      aria-label="Tutup sidebar"
    ></div>
  {/if}

  <!-- Main content area -->
  <div class="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
    <!-- Topbar -->
    <Topbar
      profile={data.profile}
      onToggleSidebar={() => (sidebarCollapsed = !sidebarCollapsed)}
      onToggleMobileSidebar={() => (mobileSidebarOpen = !mobileSidebarOpen)}
      onLogout={handleLogout}
    />

    <!-- Page content -->
    <main class="flex-1 overflow-y-auto bg-surface p-6 lg:p-8">
      {@render children()}
    </main>
  </div>
</div>
