import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, BookOpen, Menu, X, Users, Shield, Heart, User, LogIn } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from '../Auth/AuthModal'
import Button from '../UI/Button'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('signin')
  const [signingOut, setSigningOut] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, signOut, isAdmin } = useAuth()

  const publicNavItems = [
    { name: 'Home', path: '/', icon: BookOpen },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Team', path: '/team', icon: Users }
  ]

  const userNavItems = [
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User }
  ]

  const adminNavItems = [
    { name: 'Admin', path: '/admin', icon: Shield }
  ]

  const allNavItems = [
    ...publicNavItems,
    ...(user ? userNavItems : []),
    ...(isAdmin ? adminNavItems : [])
  ]

  const isActive = (path) => location.pathname === path

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleSignOut = async () => {
    try {
      setSigningOut(true)
      console.log('Navbar: Starting sign out...')
      
      const { error } = await signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        alert('Error signing out. Please try again.')
      } else {
        console.log('Navbar: Sign out successful')
        setIsMobileMenuOpen(false)
        navigate('/')
      }
    } catch (error) {
      console.error('Error in handleSignOut:', error)
      alert('Error signing out. Please try again.')
    } finally {
      setSigningOut(false)
    }
  }

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false)
    navigate(path)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                BookNest
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {allNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-100 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Hi, {profile?.full_name || user.email.split('@')[0]}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    loading={signingOut}
                    disabled={signingOut}
                  >
                    {signingOut ? 'Signing Out...' : 'Sign Out'}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAuthClick('signin')}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAuthClick('signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/50">
              <div className="flex flex-col space-y-2">
                {allNavItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.path)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left w-full ${
                        isActive(item.path)
                          ? 'bg-primary-100 text-primary-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  )
                })}
                
                {/* Mobile Auth */}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  {user ? (
                    <div className="px-4 space-y-3">
                      <p className="text-sm text-gray-600">
                        Signed in as {profile?.full_name || user.email}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        loading={signingOut}
                        disabled={signingOut}
                        className="w-full"
                      >
                        {signingOut ? 'Signing Out...' : 'Sign Out'}
                      </Button>
                    </div>
                  ) : (
                    <div className="px-4 space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          handleAuthClick('signin')
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleAuthClick('signup')
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full"
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  )
}

export default Navbar