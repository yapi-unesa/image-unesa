<script lang="ts">
  import { enhance } from '$app/forms';
  import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-svelte';
  import { APP_META } from '$lib/config/site';

  let { form } = $props();

  let showPassword = $state(false);
  let loading = $state(false);
</script>

<svelte:head>
  <title>Login Pengurus — {APP_META.name}</title>
  <meta name="description" content="Portal login untuk pengurus IMAGE UNESA" />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="w-full max-w-md">
  <!-- Logo + Heading -->
  <div class="text-center mb-10">
    <!-- Logo mark -->
    <div
      class="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-gold
                shadow-glow-gold mb-6 mx-auto"
    >
      <span class="text-navy-900 font-900 font-accent text-xl">IM</span>
    </div>
    <h1 class="font-display text-3xl text-white mb-2">Portal Pengurus</h1>
    <p class="text-navy-300 text-sm">
      {APP_META.name} · SIAKAD Internal
    </p>
  </div>

  <!-- Login Card -->
  <div class="glass rounded-3xl p-8 shadow-dashboard border border-white/10">
    <!-- Error Alert -->
    {#if form?.error}
      <div
        class="flex items-start gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-400/20 mb-6"
      >
        <AlertCircle class="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
        <p class="text-rose-300 text-sm">{form.error}</p>
      </div>
    {/if}

    <!-- Form -->
    <form
      method="POST"
      action="?/login"
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          loading = false;
          await update();
        };
      }}
      class="flex flex-col gap-5"
    >
      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-600 text-navy-200 mb-2"> Email </label>
        <div class="relative">
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400">
            <Mail class="w-4 h-4" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            autocomplete="email"
            placeholder="nama@email.com"
            class="input-dark pl-11 w-full"
          />
        </div>
      </div>

      <!-- Password Field -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label for="password" class="text-sm font-600 text-navy-200"> Password </label>
          <a
            href="#"
            class="text-xs text-navy-400 hover:text-gold-400 transition-colors"
          >
            Lupa password?
          </a>
        </div>
        <div class="relative">
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400">
            <Lock class="w-4 h-4" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            autocomplete="current-password"
            placeholder="••••••••"
            class="input-dark pl-11 pr-12 w-full"
          />
          <button
            type="button"
            onclick={() => (showPassword = !showPassword)}
            class="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-200 transition-colors"
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            {#if showPassword}
              <EyeOff class="w-4 h-4" />
            {:else}
              <Eye class="w-4 h-4" />
            {/if}
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        disabled={loading}
        class="btn btn-primary w-full mt-2"
        class:opacity-70={loading}
      >
        {#if loading}
          <Loader2 class="w-4 h-4 animate-spin" />
          Memproses...
        {:else}
          Masuk Dashboard
        {/if}
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-white/10"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-transparent px-4 text-navy-500 text-xs">Portal khusus pengurus aktif</span>
      </div>
    </div>

    <!-- Info note -->
    <div class="flex items-start gap-3 p-4 rounded-2xl bg-navy-800/50 border border-white/5">
      <Lock class="w-4 h-4 text-navy-400 flex-shrink-0 mt-0.5" />
      <p class="text-navy-400 text-xs leading-relaxed">
        Akses SIAKAD hanya untuk pengurus aktif IMAGE UNESA yang telah terdaftar. Butuh bantuan?
        Hubungi <span class="text-gold-400">Superadmin/Webmaster</span>.
      </p>
    </div>
  </div>

  <!-- Footer note -->
  <p class="text-center text-navy-500 text-xs mt-6">
    {APP_META.name} · {APP_META.cabinet} · {APP_META.year}
  </p>
</div>
