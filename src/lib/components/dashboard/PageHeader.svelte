<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    description,
    actions
  }: {
    title: string;
    description: string;
    actions?: Snippet;
  } = $props();
</script>

<div class="flex items-center justify-between mb-8">
  <div>
    <h1 class="font-display text-2xl text-navy-900 mb-1">{title}</h1>
    <p class="text-navy-400 text-sm">{description}</p>
  </div>

  {#if actions}
    <div class="flex gap-3">
      {@render actions()}
    </div>
  {/if}
</div>
