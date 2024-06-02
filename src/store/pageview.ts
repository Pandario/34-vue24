import { defineStore } from 'pinia'

interface PageViewState {
  articlesDisplayed: number
  articlesPerLoad: number
}

export const usePageViewStore = defineStore('pageview', {
  state: (): PageViewState => ({
    articlesDisplayed: 10,
    articlesPerLoad: 10
  }),
  actions: {
    loadMoreArticles() {
      this.articlesDisplayed += this.articlesPerLoad
    },
    resetArticlesDisplayed() {
      this.articlesDisplayed = this.articlesPerLoad
    }
  },
  getters: {
    getDisplayedArticles: (state) => {
      return (articles: any[]) => {
        return articles.slice(0, state.articlesDisplayed)
      }
    }
  }
})