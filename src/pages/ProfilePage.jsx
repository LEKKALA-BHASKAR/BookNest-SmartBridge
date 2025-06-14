import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Calendar, Shield, Edit2, Save, X, Heart, BookOpen, LogIn, RefreshCw } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getUserFavorites } from '../services/favoritesApi'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import Input from '../components/UI/Input'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const ProfilePage = () => {
  const { user, profile, updateProfile, signOut, loading: authLoading } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    full_name: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    console.log('ProfilePage useEffect - authLoading:', authLoading, 'user:', !!user, 'profile:', !!profile)
    
    if (!authLoading) {
      if (user) {
        // Set form data from profile if available
        if (profile) {
          setFormData({
            full_name: profile.full_name || ''
          })
        }
        loadUserData()
      } else {
        setLoading(false)
      }
    }
  }, [user, profile, authLoading])

  const loadUserData = async () => {
    try {
      console.log('Loading user data...')
      setError('')
      setLoading(true)
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
      
      const favoritesPromise = getUserFavorites()
      
      const favs = await Promise.race([favoritesPromise, timeoutPromise])
      console.log('Loaded user favorites:', favs)
      setFavorites(favs || [])
    } catch (error) {
      console.error('Error loading user data:', error)
      setError(error.message === 'Request timeout' ? 'Request timed out. Please try again.' : 'Failed to load user data')
      setFavorites([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    if (!formData.full_name.trim()) {
      setError('Full name cannot be empty')
      return
    }

    setUpdating(true)
    setError('')
    
    try {
      const { error: updateError } = await updateProfile(formData)
      if (updateError) {
        setError(updateError.message || 'Failed to update profile')
      } else {
        setEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleRetry = () => {
    if (user) {
      loadUserData()
    }
  }

  // Show loading spinner while auth is loading
  if (authLoading) {
    console.log('Showing auth loading spinner')
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  // Show sign in required if no user
  if (!user) {
    console.log('No user, showing sign in required')
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-auto">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your profile.</p>
          <Button onClick={() => navigate('/')}>
            <LogIn className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </Card>
      </div>
    )
  }

  console.log('Rendering profile page with', favorites.length, 'favorites')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account and preferences
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-700 mb-3">{error}</p>
              <Button 
                variant="ghost" 
                onClick={handleRetry}
                className="text-red-600 hover:text-red-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                {!editing ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditing(true)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditing(false)
                        setError('')
                        setFormData({ full_name: profile?.full_name || '' })
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleUpdateProfile}
                      loading={updating}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  {editing ? (
                    <Input
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Enter your full name"
                      className="flex-1"
                    />
                  ) : (
                    <div>
                      <p className="font-medium text-gray-900">
                        {profile?.full_name || 'No name set'}
                      </p>
                      <p className="text-sm text-gray-500">Full Name</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{user.email}</p>
                    <p className="text-sm text-gray-500">Email Address</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {profile?.created_at 
                        ? new Date(profile.created_at).toLocaleDateString()
                        : 'Recently joined'
                      }
                    </p>
                    <p className="text-sm text-gray-500">Member Since</p>
                  </div>
                </div>

                {profile?.is_admin && (
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-primary-600">Administrator</p>
                      <p className="text-sm text-gray-500">Admin Access Enabled</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Account Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h2>
              <div className="space-y-3">
                <Button
                  variant="danger"
                  onClick={handleSignOut}
                  className="w-full sm:w-auto"
                >
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {loading ? (
              <Card className="p-6 text-center">
                <LoadingSpinner size="md" />
                <p className="text-gray-600 mt-2">Loading stats...</p>
              </Card>
            ) : (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Heart className="w-5 h-5 text-red-500 mr-2" />
                    </div>
                    <p className="text-3xl font-bold text-primary-600">{favorites.length}</p>
                    <p className="text-sm text-gray-600">Favorite Books</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="w-5 h-5 text-secondary-600 mr-2" />
                    </div>
                    <p className="text-3xl font-bold text-secondary-600">
                      {[...new Set(favorites.map(fav => {
                        const book = fav.book_data
                        return book.categories?.[0] || book.category || 'Uncategorized'
                      }))].length}
                    </p>
                    <p className="text-sm text-gray-600">Categories Explored</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="w-5 h-5 text-accent-600 mr-2" />
                    </div>
                    <p className="text-3xl font-bold text-accent-600">
                      {profile?.created_at 
                        ? Math.floor((Date.now() - new Date(profile.created_at)) / (1000 * 60 * 60 * 24))
                        : 0
                      }
                    </p>
                    <p className="text-sm text-gray-600">Days as Member</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Recent Favorites */}
            {!loading && favorites.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Favorites</h3>
                <div className="space-y-3">
                  {favorites.slice(0, 3).map((fav) => {
                    const book = fav.book_data
                    return (
                      <div key={fav.id} className="flex items-center space-x-3">
                        <div className="w-10 h-14 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                          <img
                            src={book.coverImage || book.cover_image}
                            alt={book.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {book.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {book.authors?.[0] || book.author}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}

            {/* Empty State for No Favorites */}
            {!loading && favorites.length === 0 && (
              <Card className="p-6 text-center">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Favorites Yet</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Start exploring books and add them to your favorites!
                </p>
                <Button
                  size="sm"
                  onClick={() => navigate('/search')}
                >
                  Discover Books
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage