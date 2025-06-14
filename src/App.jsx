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
import NotFound from "./pages/NotFound";
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
            <Route path="*" element={<NotFound/>} />
            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App