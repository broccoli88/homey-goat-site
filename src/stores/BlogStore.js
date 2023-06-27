import { defineStore } from 'pinia'
import { createClient } from 'contentful'
import { ref } from 'vue'

export const useBlogStore = defineStore('blogStore', () => {
  const token = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN

  const client = createClient({
    space: '0cmq2ox1sdot',
    accessToken: token
  })

  const blogData = ref([])

  async function getBlogData() {
    const response = await client.getEntries({
      content_type: 'blogPost'
    })

    blogData.value = response.items
  }

  return { blogData, getBlogData }
})
