<script lang="ts">
  let { children } = $props();
</script>

<!-- Minimal centered layout for auth pages -->
<div class="min-h-screen bg-mesh-navy flex flex-col">
  <!-- Background elements -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div
      class="absolute top-20 -right-20 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl animate-float"
    ></div>
    <div
      class="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-navy-600/30 blur-3xl animate-float"
      style="animation-delay: 3s;"
    ></div>
  </div>

  <div class="relative z-10 flex-1 flex items-center justify-center p-6">
    {@render children()}
  </div>

  <!-- Footer note -->
  <div class="relative z-10 pb-6 text-center">
    <a href="/" class="text-navy-400 text-xs hover:text-navy-300 transition-colors">
      ← Kembali ke Halaman Publik
    </a>
  </div>
</div>
