import { defineStore } from 'pinia'

export interface Article {
  date: string;
  timeSort: number;
  title: string;
  url: string;
  urlToImage: string | null;
}

export interface State {
  allArticles: Article[];
  displayedArticles: Article[];
  isLoading: boolean;
  errors: Error | null;
  articlesToShow: number;
}

export const useArticleStore = defineStore('articles', {
  state: (): State => ({
    allArticles: [],
    displayedArticles: [],
    isLoading: true,
    errors: null,
    articlesToShow: 10,
  }),
  actions: {
    setArticles(articles: Article[]) {
      this.allArticles = articles
      this.displayedArticles = articles.slice(0, this.articlesToShow)
      this.isLoading = false
    },
    loadMoreArticles() {
      const newArticlesToShow = this.articlesToShow + 10
      this.displayedArticles = this.allArticles.slice(0, newArticlesToShow)
      this.articlesToShow = newArticlesToShow
    },
    setLoading(loading: boolean) {
      this.isLoading = loading
    },
    setError(error: Error) {
      this.errors = error
      this.isLoading = false
    },
  },
})