import { defineComponent, onMounted, onUnmounted ,computed } from 'vue'
import { useNewsStore } from '../store/'
import { usePageViewStore } from '@/store/pageview'



export default defineComponent({
  setup() {
    const newsStore = useNewsStore()
    const pageViewStore = usePageViewStore()

    const loadMoreArticles = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        pageViewStore.loadMoreArticles()
      }
    }

    onMounted(() => {
      newsStore.fetchNews()
      window.addEventListener('scroll', loadMoreArticles)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', loadMoreArticles)
    })

    const displayedArticles = computed(() => {
      return pageViewStore.getDisplayedArticles(newsStore.articles)
    })

    return {
      displayedArticles,
      newsStore,
    }
  },
  render() {
    return (
      <div class="flex flex-wrap justify-center">
        {this.newsStore.loading ? (
          <div class="text-center">Loading...</div>
        ) : this.newsStore.error ? (
          <div class="text-red-500 text-center">{this.newsStore.error}</div>
        ) : (
          <>
            {this.displayedArticles.map(article => (
              <div key={article.url} class="m-4 p-4 border rounded shadow-md flex flex-col justify-between bg-white w-80 h-auto">
                {article.urlToImage && (
                  <div class='h-40 mb-4'>
                    <img src={article.urlToImage} alt={article.title} class='object-cover w-full h-full rounded-t' />
                  </div>
                )}
                <div class="flex-grow flex flex-col">
                  <h2 class="text-xl font-semibold mb-2">{article.title}</h2>
                  <p class='text-sm text-gray-600'>{article.formattedDate}</p>
                </div>
                <div class='mt-4'>
                  <a href={article.url} target="_blank" class='block w-full p-3 bg-slate-500 hover:bg-slate-600 text-white text-center rounded'>Read more</a>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    )
  }
})