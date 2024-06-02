import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const query = ref('')

    const handleKeyup = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        emitSearch()
      }
    }

    const emitSearch = () => {
      emit('search', query.value)
    }

    return {
      query,
      handleKeyup,
      emitSearch
    }
  },
  render() {
    return (
      <div class="mb-4 w-full max-w-screen-lg flex justify-center">
        <input 
          v-model={this.query} 
          class="p-2 border border-gray-300 rounded w-3/4" 
          type="text" 
          placeholder="Search..." 
          onKeyup={this.handleKeyup}
        />
        <button 
          class="p-2 ml-2 bg-blue-500 text-white rounded" 
          onClick={this.emitSearch}
        >
          Search
        </button>
      </div>
    )
  }
})