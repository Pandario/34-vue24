import { defineStore } from 'pinia'
import { format } from 'date-fns'

interface Article {
  source: { id: string | null, name: string }
  author: string | null
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
  formattedDate: string
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
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=nl&pageSize=30&apiKey=fb03640ebf9b46e681589c904b6cba0e')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }

        //Transforming array and adding new date format from date-fns lib

        const data = await response.json()
        this.articles = data.articles.map((article: Article) => ({
          ...article,
          formattedDate: format(new Date(article.publishedAt), 'yyyy-MM-dd HH:mm')
        }))
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    }
  }
})