<script module lang="ts">
  export type ColumnDef<T = any> = {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (item: T) => string;
  };
</script>

<script lang="ts" generics="T extends Record<string, any>">
  import {
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    ArrowUp,
    ArrowDown
  } from 'lucide-svelte';
  import type { Snippet } from 'svelte';

  let {
    data = [],
    columns = [],
    searchable = true,
    pageSize = 10,
    searchPlaceholder = 'Cari data...',
    customCell,
    toolbar
  }: {
    data: T[];
    columns: ColumnDef<T>[];
    searchable?: boolean;
    pageSize?: number;
    searchPlaceholder?: string;
    customCell?: Snippet<[T, ColumnDef<T>]>;
    toolbar?: Snippet;
  } = $props();

  // State
  let searchQuery = $state('');
  let currentPage = $state(1);
  let sortKey = $state<string | null>(null);
  let sortDir = $state<'asc' | 'desc'>('asc');

  // Derived state for filtering and sorting
  let filteredData = $derived(() => {
    let result = [...data];

    // 1. Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((item) => {
        // Search across all string/number values in the object
        return Object.values(item as any).some(
          (val) => val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        );
      });
    }

    // 2. Sort
    if (sortKey) {
      result.sort((a, b) => {
        const valA = (a as any)[sortKey as string];
        const valB = (b as any)[sortKey as string];

        if (valA === valB) return 0;

        const isAsc = sortDir === 'asc';
        if (valA == null) return isAsc ? 1 : -1;
        if (valB == null) return isAsc ? -1 : 1;

        if (typeof valA === 'string' && typeof valB === 'string') {
          return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        return isAsc ? (valA < valB ? -1 : 1) : valA > valB ? -1 : 1;
      });
    }

    return result;
  });

  // Derived state for pagination
  let totalPages = $derived(() => Math.max(1, Math.ceil(filteredData().length / pageSize)));

  let paginatedData = $derived(() => {
    // Ensure current page is valid when filtering changes total pages
    const maxPage = totalPages();
    if (currentPage > maxPage) {
      currentPage = maxPage;
    }

    const start = (currentPage - 1) * pageSize;
    return filteredData().slice(start, start + pageSize);
  });

  // Handlers
  function handleSort(key: string) {
    if (sortKey === key) {
      // Toggle dir or remove sort
      if (sortDir === 'asc') sortDir = 'desc';
      else {
        sortKey = null;
        sortDir = 'asc';
      }
    } else {
      sortKey = key;
      sortDir = 'asc';
    }
  }

  function getCellValue(item: T, col: ColumnDef<T>): string {
    if (col.render) return col.render(item);
    const val = (item as any)[col.key as string];
    return val !== null && val !== undefined ? String(val) : '-';
  }
</script>

<div class="card overflow-hidden flex flex-col">
  <!-- Toolbar -->
  <div
    class="p-4 border-b border-navy-50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white"
  >
    <!-- Slot for extra actions (e.g. Add Button) -->
    <div class="flex-1 flex justify-start">
      {#if toolbar}
        {@render toolbar()}
      {/if}
    </div>

    <!-- Search -->
    {#if searchable}
      <div class="relative w-full sm:w-64 flex-shrink-0">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
        <input
          type="text"
          bind:value={searchQuery}
          placeholder={searchPlaceholder}
          class="input pl-9 h-10 w-full text-sm bg-surface-secondary border-transparent focus:bg-white focus:border-gold-400"
        />
      </div>
    {/if}
  </div>

  <!-- Table container -->
  <div class="overflow-x-auto w-full">
    <table class="w-full text-left text-sm text-navy-700">
      <thead class="bg-surface-secondary/50 border-b border-navy-100">
        <tr>
          {#each columns as col}
            <th
              class="px-6 py-4 font-600 text-navy-500 uppercase tracking-wider text-xs whitespace-nowrap"
            >
              {#if col.sortable !== false}
                <button
                  class="flex items-center gap-1.5 hover:text-navy-900 group w-full text-left"
                  onclick={() => handleSort(col.key as string)}
                >
                  <span>{col.label}</span>
                  <span class="text-navy-300 group-hover:text-navy-500 transition-colors">
                    {#if sortKey === col.key}
                      {#if sortDir === 'asc'}
                        <ArrowUp class="w-3.5 h-3.5" />
                      {:else}
                        <ArrowDown class="w-3.5 h-3.5" />
                      {/if}
                    {:else}
                      <ChevronsUpDown class="w-3.5 h-3.5 opacity-50" />
                    {/if}
                  </span>
                </button>
              {:else}
                {col.label}
              {/if}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-navy-50">
        {#if paginatedData().length === 0}
          <tr>
            <td colspan={columns.length} class="px-6 py-12 text-center text-navy-400">
              {#if searchQuery}
                Tidak ada data yang cocok dengan pencarian "{searchQuery}"
              {:else}
                Belum ada data tersedia.
              {/if}
            </td>
          </tr>
        {:else}
          {#each paginatedData() as row (row.id || JSON.stringify(row))}
            <tr class="hover:bg-navy-50/50 transition-colors">
              {#each columns as col}
                <td class="px-6 py-4">
                  {#if customCell}
                    {@render customCell(row, col)}
                  {:else}
                    {getCellValue(row, col)}
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div
    class="p-4 border-t border-navy-50 flex items-center justify-between bg-white text-sm text-navy-500"
  >
    <div>
      Menampilkan {paginatedData().length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
      - {Math.min(currentPage * pageSize, filteredData().length)}
      dari {filteredData().length} data
    </div>
    <div class="flex items-center gap-1">
      <button
        disabled={currentPage === 1}
        onclick={() => currentPage--}
        class="p-2 rounded-lg hover:bg-navy-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>

      <div class="px-4 font-600 text-navy-700">
        Hal {currentPage} / {totalPages()}
      </div>

      <button
        disabled={currentPage === totalPages()}
        onclick={() => currentPage++}
        class="p-2 rounded-lg hover:bg-navy-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
  </div>
</div>
