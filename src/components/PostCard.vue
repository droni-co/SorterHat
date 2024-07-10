<template>
  <article 
    v-if="post"
    class="bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700
    hover:scale-105 transition-transform cursor-pointer"
    @click="electronApi.openLink(`https://droni.co/es/blog/${post.slug}`)">
      <img :src="post.image ?? ''" class="w-full rounded-t aspect-video object-cover" :alt="post.name" />
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-300">
        {{ post.name }}
      </h5>
      <p class="mb-3 font-normal text-gray-600 dark:text-gray-300">
        <small class="text-gray-500 dark:text-gray-400 block">
          By {{ post.user?.name }} | {{ post.createdAt }}
        </small>
        {{ post.description }}
      </p>
    </div>
  </article>
</template>
<script setup lang="ts">
const electronApi = (globalThis as any).electronAPI;
const props = defineProps<{
  post: Post
}>();
interface Post {
  id?: number
  siteId?: string
  userId?: string
  name: string
  slug: string
  description?: string | null
  image?: string | null
  content?: string
  format: 'html' | 'markdown'
  active: boolean
  props?: any[]
  lang: 'es' | 'en'
  createdAt?: string
  updatedAt?: string
  user?: any
}
</script>