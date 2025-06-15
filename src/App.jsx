import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Layout/Navbar'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import TeamPage from './pages/TeamPage'
import BookDetailPage from './pages/BookDetailPage'
import AdminPage from './pages/AdminPage'
import FavoritesPage from './pages/FavoritesPage'
import ProfilePage from './pages/ProfilePage'
import './index.css'
<<<<<<< HEAD
import PrivacyPolicy from './pages/PrivacyPolicy';
=======
import Policy from './pages/Policy.jsx'
import  NotFound  from './pages/NotFound.jsx'
>>>>>>> 2b6916424cab37d38e6fdae60759627482032e6f
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
<<<<<<< HEAD
            <Route path="/privacy" element={<PrivacyPolicy />} />
=======

            <Route path="*" element={<NotFound/>} />

            <Route path="/policy" element={<Policy/>} />
            
>>>>>>> 2b6916424cab37d38e6fdae60759627482032e6f
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App