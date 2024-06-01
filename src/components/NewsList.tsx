import { defineComponent, onMounted } from 'vue'
import { useNewsStore } from '../store/'

export default defineComponent({
  setup() {
    const newsStore = useNewsStore()

    onMounted(() => {
      newsStore.fetchNews()
    })

    return () => (
      <div class="container mx-auto p-4">
        {newsStore.loading ? (
          <div class="text-center">Loading...</div>
        ) : newsStore.error ? (
          <div class="text-red-500 text-center">{newsStore.error}</div>
        ) : (
          newsStore.articles.map(article => (
            <div key={article.url} class="mb-4 p-4 border-b">
              <h2 class="text-xl font-bold">{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" class="text-blue-500">Read more</a>
            </div>
          ))
        )}
      </div>
    )
  }
})