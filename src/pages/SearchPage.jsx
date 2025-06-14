import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, X } from 'lucide-react'
import { searchBooks, formatBookData } from '../services/googleBooksApi'
import BookGrid from '../components/Books/BookGrid'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const navigate = useNavigate()

  // Popular search suggestions
  const suggestions = [
    'Harry Potter', 'The Great Gatsby', 'To Kill a Mockingbird', 
    'Pride and Prejudice', '1984', 'The Catcher in the Rye',
    'Lord of the Rings', 'JavaScript', 'React', 'Python'
  ]

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError('')
    setHasSearched(true)
    
    try {
      const results = await searchBooks(searchQuery, 24)
      const formattedBooks = results.map(formatBookData)
      setBooks(formattedBooks)
    } catch (err) {
      setError('Failed to search books. Please try again.')
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const handleBookClick = (book) => {
    navigate(`/book/${book.id}`, { state: { book, type: 'api' } })
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Great Read
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through millions of books and find your perfect match
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for books, authors, or topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 py-3 text-lg rounded-xl border-2 focus:ring-2 focus:ring-primary-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={() => handleSearch()}
              disabled={!query.trim() || loading}
              loading={loading}
              size="lg"
              className="px-8"
            >
              Search Books
            </Button>
          </div>
        </div>

        {/* Search Suggestions */}
        {!hasSearched && (
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Popular Searches
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-error-50 border border-error-200 rounded-lg p-4 text-center">
              <p className="text-error-700">{error}</p>
              <Button 
                variant="ghost" 
                onClick={() => handleSearch()}
                className="mt-2 text-error-600 hover:text-error-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        <div>
          {hasSearched && !loading && (
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {books.length > 0 ? (
                    `Found ${books.length} books for "${query}"`
                  ) : (
                    `No results for "${query}"`
                  )}
                </h2>
                
                {books.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">24 results</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <BookGrid
            books={books}
            loading={loading}
            onBookClick={handleBookClick}
            type="api"
            emptyMessage={hasSearched ? `No books found for "${query}". Try a different search term.` : 'Start searching to discover amazing books!'}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchPage