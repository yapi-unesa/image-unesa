<script lang="ts">
  import { TrendingUp, TrendingDown, Minus } from 'lucide-svelte';
  import { cn } from '$lib/utils/helpers';

  let {
    title,
    value,
    subtitle,
    icon,
    trend,
    trendValue,
    color = 'gold',
    loading = false
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: any;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    color?: 'gold' | 'blue' | 'green' | 'red' | 'purple';
    loading?: boolean;
  } = $props();

  const colorMap = {
    gold: {
      bg: 'bg-gold-50',
      icon: 'text-gold-600',
      iconBg: 'bg-gold-100',
      border: 'border-gold-100'
    },
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      iconBg: 'bg-blue-100',
      border: 'border-blue-100'
    },
    green: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      border: 'border-emerald-100'
    },
    red: {
      bg: 'bg-rose-50',
      icon: 'text-rose-600',
      iconBg: 'bg-rose-100',
      border: 'border-rose-100'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      iconBg: 'bg-purple-100',
      border: 'border-purple-100'
    }
  };

  const colors = $derived(colorMap[color]);
</script>

<div
  class={cn('card p-6 border hover:shadow-card-hover transition-all duration-300', colors.border)}
>
  {#if loading}
    <div class="flex flex-col gap-4">
      <div class="skeleton h-10 w-10 rounded-xl"></div>
      <div class="skeleton h-8 w-32 rounded-lg"></div>
      <div class="skeleton h-4 w-24 rounded-md"></div>
    </div>
  {:else}
    <!-- Icon + Trend -->
    <div class="flex items-start justify-between mb-6">
      <div class={cn('w-12 h-12 rounded-2xl flex items-center justify-center', colors.iconBg)}>
        {#if icon}
          <svelte:component this={icon} class={cn('w-6 h-6', colors.icon)} />
        {/if}
      </div>

      {#if trend && trendValue}
        <div
          class={cn(
            'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-600',
            trend === 'up'
              ? 'bg-emerald-50 text-emerald-600'
              : trend === 'down'
                ? 'bg-rose-50 text-rose-600'
                : 'bg-navy-50 text-navy-500'
          )}
        >
          {#if trend === 'up'}
            <TrendingUp class="w-3 h-3" />
          {:else if trend === 'down'}
            <TrendingDown class="w-3 h-3" />
          {:else}
            <Minus class="w-3 h-3" />
          {/if}
          {trendValue}
        </div>
      {/if}
    </div>

    <!-- Value -->
    <div class="font-display text-3xl font-700 text-navy-900 mb-2 leading-none tracking-tight">
      {value}
    </div>

    <!-- Title -->
    <div class="text-navy-600 font-600 text-sm mb-1">{title}</div>

    {#if subtitle}
      <div class="text-navy-400 text-xs">{subtitle}</div>
    {/if}
  {/if}
</div>
