import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { getCachedData, setCachedData } from '@/utils/catch'
import { usePageViewStore } from './pageview'

export interface Article {
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

export interface NewsState {
  articles: Article[]
  loading: boolean
  error: string | null
}

const CACHE_CHANGES = 'news_articles'

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
      
// How many news-cards client will see
      const pageViewStore = usePageViewStore()
      pageViewStore.resetArticlesDisplayed()

// Trying to check catched data first from utils/catch
      const cachedData = getCachedData(CACHE_CHANGES)
      if (cachedData) {
        this.articles = cachedData
        this.loading = false
        return
      }try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=nl&pageSize=30&apiKey=fb03640ebf9b46e681589c904b6cba0e')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }

//Transforming array and adding new date format from date-fns lib

        const data = await response.json()
        const articles = data.articles.map((article: Article) => ({
          ...article,
          formattedDate: format(new Date(article.publishedAt), 'yyyy-MM-dd HH:mm')
        }))

        this.articles = articles,
//Not forgetting to catche our data
        setCachedData(CACHE_CHANGES, articles)
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    }
  }
})
