import { defineStore } from 'pinia'

interface Article {
  source: { id: string | null, name: string }
  author: string | null
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

interface NewsState {
  articles: Article[]
  loading: boolean
  error: string | null
}

export const useNewsStore = defineStore('news', {
  state: (): NewsState => ({
    articles: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchNews() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=fb03640ebf9b46e681589c904b6cba0e')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        this.articles = data.articles
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    }
  }
})