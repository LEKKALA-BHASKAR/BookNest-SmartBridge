import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Calendar, User, BookOpen, Globe, ExternalLink, Tag } from 'lucide-react'
import { getBookById, formatBookData } from '../services/googleBooksApi'
import { getLocalBookById } from '../services/localBooksApi'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const BookDetailPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState(false)

  // Get book type from state or default to 'api'
  const bookType = location.state?.type || 'api'
  const passedBook = location.state?.book

  useEffect(() => {
    const fetchBookData = async () => {
      if (passedBook) {
        setBook(passedBook)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        let bookData

        if (bookType === 'local') {
          bookData = await getLocalBookById(id)
        } else {
          const apiBook = await getBookById(id)
          bookData = formatBookData(apiBook)
        }

        setBook(bookData)
      } catch (err) {
        setError('Failed to load book details')
      } finally {
        setLoading(false)
      }
    }

    fetchBookData()
  }, [id, bookType, passedBook])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Book Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The book you are looking for could not be found.'}</p>
          <Button onClick={() => navigate('/search')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </Card>
      </div>
    )
  }

  // Handle different data structures for API vs local books
  const bookData = bookType === 'local' ? {
    title: book.title,
    authors: [book.author],
    description: book.description,
    coverImage: book.cover_image,
    publisher: book.publisher,
    publishedDate: book.published_date,
    pageCount: book.page_count,
    categories: [book.category],
    averageRating: 0,
    ratingsCount: 0,
    language: 'en',
    previewLink: '',
    infoLink: ''
  } : {
    title: book.title,
    authors: book.authors,
    description: book.description,
    coverImage: book.coverImage,
    publisher: book.publisher,
    publishedDate: book.publishedDate,
    pageCount: book.pageCount,
    categories: book.categories,
    averageRating: book.averageRating,
    ratingsCount: book.ratingsCount,
    language: book.language,
    previewLink: book.previewLink,
    infoLink: book.infoLink
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-6">
                {!imageError ? (
                  <img
                    src={bookData.coverImage}
                    alt={bookData.title}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Rating */}
              {bookData.averageRating > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(bookData.averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {bookData.averageRating.toFixed(1)} ({bookData.ratingsCount} reviews)
                  </span>
                </div>
              )}

              {/* External Links */}
              {bookType === 'api' && (
                <div className="space-y-2">
                  {bookData.previewLink && (
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => window.open(bookData.previewLink, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Preview Book
                    </Button>
                  )}
                  {bookData.infoLink && (
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => window.open(bookData.infoLink, '_blank')}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      More Info
                    </Button>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title and Author */}
            <Card className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {bookData.title}
              </h1>
              
              <div className="flex items-center space-x-2 mb-6">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-lg text-gray-700">
                  by {bookData.authors.join(', ')}
                </span>
              </div>

              {/* Book Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {bookData.publisher && (
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{bookData.publisher}</span>
                  </div>
                )}
                
                {bookData.publishedDate && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(bookData.publishedDate).getFullYear() || bookData.publishedDate}
                    </span>
                  </div>
                )}
                
                {bookData.pageCount > 0 && (
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{bookData.pageCount} pages</span>
                  </div>
                )}
                
                {bookData.language && (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{bookData.language.toUpperCase()}</span>
                  </div>
                )}
              </div>

              {/* Categories */}
              {bookData.categories && bookData.categories.length > 0 && (
                <div className="flex items-start space-x-2 mb-6">
                  <Tag className="w-4 h-4 text-gray-400 mt-1" />
                  <div className="flex flex-wrap gap-2">
                    {bookData.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Description */}
            {bookData.description && (
              <Card className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <div 
                  className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: bookData.description.replace(/\n/g, '<br />') 
                  }}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage