import { defineComponent, ref, onMounted, onUnmounted ,computed } from 'vue'
import { useNewsStore } from '../store/'
import { usePageViewStore } from '@/store/pageview'
import SearchBar from './SearchBar'


export default defineComponent({
  name: 'NewsList',
  components: {
    SearchBar
  },
  setup() {
    const newsStore = useNewsStore()
    const pageViewStore = usePageViewStore()
    const searchQuery = ref('')
    const isScrolled = ref(false)

    const loadMoreArticles = () => {
      const isMediumOrLarger = window.matchMedia('(min-width: 768px)').matches
      const threshold = isMediumOrLarger ? 500 : 150
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold
      if (nearBottom) {
        pageViewStore.loadMoreArticles()
      }
    }

    const handleSearch = (query: string) => {
      searchQuery.value = query
      pageViewStore.resetArticlesDisplayed()
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0
    }

    onMounted(() => {
      newsStore.fetchNews()
      window.addEventListener('scroll', loadMoreArticles)
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', loadMoreArticles)
      window.removeEventListener('scroll', handleScroll)
    })

    const displayedArticles = computed(() => {
      const query = searchQuery.value.toLowerCase()
      const filteredArticles = newsStore.articles.filter(article => 
        article.title.toLowerCase().includes(query)
      )
      console.log('Filtered articles with query:', query, filteredArticles) // Debug log
      return pageViewStore.getDisplayedArticles(filteredArticles)
    })

    return {
      searchQuery,
      handleSearch,
      displayedArticles,
      newsStore,
      isScrolled
    }
  },
  render() {
    return (
      <div>
        <div class={`sticky top-4 flex justify-center my-4 ${this.isScrolled ? 'opacity-75' : ''}`}>
          <SearchBar onSearch={this.handleSearch} />
        </div>
        <div class="flex flex-wrap justify-center">
          {this.newsStore.loading ? (
            <div class="text-center">Loading...</div>
          ) : this.newsStore.error ? (
            <div class="text-red-500 text-center">{this.newsStore.error}</div>
          ) : (
            <>
              {this.displayedArticles.length === 0 ? (
                <div class="m-4 p-4 border rounded shadow-md flex flex-col justify-between bg-white w-80 h-auto">
                  <div class="flex-grow flex flex-col justify-center items-center">
                    <h2 class="text-xl font-semibold mb-2">No news found :(</h2>
                  </div>
                </div>
              ) : (
                this.displayedArticles.map(article => (
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
                ))
              )}
            </>
          )}
        </div>
      </div>
    )
  }
})