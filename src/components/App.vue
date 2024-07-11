<template>
  <div class="h-screen bg-slate-300">
    <header class="bg-[url('/src/assets/galaxy01.webp')]">
      <img src="/src/assets/brand-w.svg" alt="SorterHat" class="w-1/3 mx-auto py-6 cursor-pointer" @click="electronApi.openLink('https://droni.co')" />
    </header>
    <main class="bg-slate-50">
      <form>
        <div v-if="results.length > 0" class="text-center">
          <p class="text-sm text-balance py-2">
            Files found: {{ results.length }}
          </p>
          <button type="reset" class="bg-pink-600 text-slate-100 p-2 mx-auto rounded cursor-pointer text-center" @click="results = []">
            Clear results
          </button>
        </div>
        <div v-else class="text-center p-2">
          <p class="text-sm text-balance text-center py-2">
            Select a folder to organize and rename files.
          </p>
          <label
            v-if="!loading"
            for="selectFolder"
            class="group
              inline-block
              bg-pink-600
              text-slate-100
              transition
              hover:bg-pink-50
              hover:text-pink-600
              border
              border-pink-600
              p-2
              mx-auto
              rounded
              cursor-pointer
              text-center">
            <svg class="w-5 inline fill-white group-hover:fill-pink-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,4A2,2 0 0,1 24,6V16A2,2 0 0,1 22,18H6A2,2 0 0,1 4,16V4A2,2 0 0,1 6,2H12L14,4H22M2,6V20H20V22H2A2,2 0 0,1 0,20V11H0V6H2M6,6V16H22V6H6Z" /></svg>
            Select Folder
            <input id="selectFolder" type="file" webkitdirectory multiple="false" class="hidden" @change="selectFolder" />
          </label>
          <button v-else type="button" class="bg-slate-300 rounded mt-5 p-3 text-white" disabled>
            <svg class="animate-spin h-5 w-5 mr-3 inline fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>loading</title><path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg>
            Processing...
          </button>
        </div>
      </form>      

      <Results v-if="results.length > 0" :results="results" />
      <div v-else class="px-4 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <PostCard v-for="post in lastPosts" :key="post.id" :post="post" />
      </div>
    </main>
    <footer class="bg-slate-900 text-slate-100 text-sm p-2">
      2024 Built with hard work and many cofee by <strong class="cursor-pointer" @click="electronApi.openLink('https://droni.co')">Droni.co</strong> team.
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PostCard from './PostCard.vue';
import Results from './Results.vue';
const electronApi = (globalThis as any).electronAPI;
const lastPosts = ref<any>([]);
const results = ref<FileEEFF[]>([]);
const loading = ref<boolean>(false);

interface FileEEFF {
  code: string;
  filename: string;
  path: string;
  date: string;
  month: string;
  year: string;
  ext: string;
}

const getPosts = async () => {
  fetch('https://appi.droni.co/4ebaccf5-b863-4f12-aa49-9bbe0e1844e2/posts?lang=es&limit=4', { 
    headers: {
      'Key': '_qn9GhjMpPH9l42Emu_Sn9vCXGgrv1-T'
    }
  }).then(async (res)=>{
    const data = await res.json();
    lastPosts.value = data.data;
  });
}

const selectFolder = (event: any) => {
  results.value = [];
  loading.value = true;
  const arrayPath = event.target.files[0].path.split('/');
    arrayPath.pop();
    const path = arrayPath.join('/');
  electronApi.renameFiles(path).then((res: any) => {
    results.value = res;
  }).finally(() => {
    loading.value = false;
  })
}
getPosts();
</script>