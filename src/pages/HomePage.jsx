import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, Users, Shield, Sparkles, Gem, Award, Bookmark } from 'lucide-react'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import { motion, useInView, useAnimation } from 'framer-motion'

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setIsVisible(true)
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const features = [
    {
      icon: Search,
      title: 'Discover Rare Books',
      description: 'Access an exclusive collection of millions of books through our premium API integration',
      color: 'bg-gradient-to-br from-blue-500/30 to-sky-400/30',
      accent: 'text-blue-500'
    },
    {
      icon: BookOpen,
      title: 'Luxury Library Management',
      description: 'VIP admin access to curate and manage our gilded collection',
      color: 'bg-gradient-to-br from-emerald-500/30 to-teal-400/30',
      accent: 'text-emerald-500'
    },
    {
      icon: Users,
      title: 'Elite Team',
      description: 'Meet the distinguished experts behind this prestigious platform',
      color: 'bg-gradient-to-br from-amber-500/30 to-orange-400/30',
      accent: 'text-amber-500'
    }
  ]

  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden">


      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Luxury Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full filter blur-3xl" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-amber-400/20 rounded-full shadow-lg" />
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-blue-400/20 rounded-full shadow-lg" />
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-emerald-400/20 rounded-full shadow-lg" />

        <div className="relative max-w-7xl mx-auto px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md text-gray-800 px-6 py-2 rounded-full text-sm font-medium mb-8 shadow-lg border border-gray-200/50"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="tracking-wider">EXCLUSIVE ACCESS</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-gray-900 mb-8 tracking-tight leading-tight">
              The <span className="italic">Finest</span> Digital
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 mt-4"
              >
                Literary Collection
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Discover the world's most exquisite books in our gilded digital library. 
              A sanctuary for bibliophiles of distinguished taste.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/search">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                >
                  <Search className="w-6 h-6 mr-3" />
                  <span className="tracking-wider">Begin Exploration</span>
                </Button>
              </Link>
              
              <Link to="/team">
                <Button 
                  variant="secondary" 
                  size="xl" 
                  className="w-full sm:w-auto bg-white/90 backdrop-blur-md hover:bg-white border border-gray-300/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Users className="w-6 h-6 mr-3" />
                  <span className="tracking-wider">Meet The Curators</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-8 h-14 rounded-full border-2 border-gray-400/50 flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-gray-500 rounded-full"
            />
          </div>
          <span className="text-xs text-gray-500 mt-2 tracking-widest">SCROLL</span>
        </motion.div>
      </div>

      {/* Luxury Features Section */}
      <div ref={ref} className="max-w-7xl mx-auto px-8 py-32 relative">
        {/* Decorative Background */}
        <div className="absolute -top-32 left-0 right-0 h-64 bg-gradient-to-b from-white to-transparent z-0" />
        
        <div className="relative z-10">
          <motion.div 
            variants={variants}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5 }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
              <span className="text-sm uppercase tracking-widest text-gray-500">Exclusive Features</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6 tracking-tight">
              Unparalleled <span className="italic">Literary</span> Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Crafted for the most discerning readers and collectors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={variants}
                  initial="hidden"
                  animate={controls}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card 
                    className={`p-10 text-center transform transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl overflow-hidden`}
                  >
                    {/* Decorative Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${feature.accent} bg-gradient-to-r from-transparent via-current to-transparent`} />
                    
                    <div className={`w-20 h-20 mx-auto mb-8 rounded-2xl ${feature.color} flex items-center justify-center shadow-inner backdrop-blur-sm`}>
                      <Icon className="w-9 h-9 text-gray-800" />
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-gray-900 mb-4 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      {feature.description}
                    </p>
                    
                    {/* Luxury Decorative Element */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-transparent via-gray-100/50 to-transparent" />
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Luxury CTA Section */}
      <div className="relative py-32 overflow-hidden">
        {/* Luxury Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-amber-400/10 rounded-full filter blur-xl" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-blue-400/10 rounded-full filter blur-xl" />
        
        <div className="relative max-w-5xl mx-auto px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-500/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-500/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/30 rounded-br-3xl" />
            
            <div className="inline-flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-amber-400" />
              <span className="text-sm uppercase tracking-widest text-amber-400">Prestige Membership</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-tight leading-tight">
              Elevate Your <span className="italic">Reading</span> Experience
            </h2>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Join our exclusive community of distinguished readers and gain access to unparalleled benefits
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white"
                >
                  <Search className="w-6 h-6 mr-3" />
                  <span className="tracking-wider">Explore Collection</span>
                </Button>
              </Link>
              
              <Link to="/admin">
                <Button 
                  variant="ghost" 
                  size="xl" 
                  className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 backdrop-blur-md"
                >
                  <Shield className="w-6 h-6 mr-3" />
                  <span className="tracking-wider">Concierge Access</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Luxury Footer */}
      <div className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <Gem className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-serif font-medium text-white tracking-wider">BookNest</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
              <Link to="/search" className="hover:text-white transition-colors duration-300">Collection</Link>
              <Link to="/team" className="hover:text-white transition-colors duration-300">Curators</Link>
              <Link to="/admin" className="hover:text-white transition-colors duration-300">Concierge</Link>
              <Link to="#" className="hover:text-white transition-colors duration-300">Contact</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs tracking-wider mb-4 md:mb-0">© {new Date().getFullYear()} BookNest. All rights reserved.</p>
            <div className="flex space-x-6">
              <span className="text-xs tracking-wider hover:text-white cursor-pointer transition-colors duration-300">Privacy</span>
              <span className="text-xs tracking-wider hover:text-white cursor-pointer transition-colors duration-300">Terms</span>
              <span className="text-xs tracking-wider hover:text-white cursor-pointer transition-colors duration-300">Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage