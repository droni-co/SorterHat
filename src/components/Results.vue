<template>
  <table class="table-auto text-sm w-full">
    <thead>
      <tr>
        <th class="px-2 py-2">Code</th>
        <th class="px-2 py-2">File</th>
        <th class="px-2 py-2">Date</th>
        <th class="px-2 py-2">Ext</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results" :key="result.code"
        :class="{ 'bg-green-100 dark:bg-green-800': result.copied, 'bg-rose-100 dark:bg-rose-800': !result.copied }">
        <td class="border dark:border-slate-900 px-2 py-2">
          {{ result.code }}
        </td>
        <td class="border dark:border-slate-900 px-2 py-2">
          {{ result.filename }}<br>
          <small>{{ result.path }}</small>
        </td>
        <td class="border dark:border-slate-900 px-2 py-2">
          {{ result.year }}-{{ result.month }}
        </td>
        <td class="border dark:border-slate-900 px-2 py-2">{{ result.ext }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
interface FileEEFF {
  code: string;
  filename: string;
  path: string;
  date: string;
  month: string;
  year: string;
  ext: string;
  copied: boolean;
}
const props = defineProps<{
  results: FileEEFF[]
}>();
</script>