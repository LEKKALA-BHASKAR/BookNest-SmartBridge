import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Heart, Gem, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/UI/Card'

const TeamPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredMember, setHoveredMember] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const teamMembers = [
    {
      name: 'L Bhaskar',
      role: 'Team Lead',
      age: 20,
      gender: 'Male',
      github: 'https://github.com/LEKKALA-BHASKAR',
      linkedin: 'www.linkedin.com/in/lekkala-bhaskar',
      email: 'mailto:bassnaidu1242@gmail.com',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Visionary full-stack architect with mastery in React and Node.js ecosystems.',
      skills: ['React', 'Node.js', 'MongoDB', 'Leadership', 'System Design'],
      accentColor: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'J Dhanush',
      role: 'Frontend Artisan',
      age: 20,
      gender: 'Male',
      github: 'https://github.com/dhanush5575',
      linkedin: 'https://linkedin.com',
      email: 'mailto:jalladhanush636@gmail.com',
      image: 'https://media.istockphoto.com/id/1310896133/photo/happy-smiling-afro-businessman-using-laptop-at-the-desk-in-office.webp?s=2048x2048&w=is&k=20&c=OH8w-cpAU4KOrHri2kfA1w3rQ6EKyhAeXwb9pnGy9kM=',
      bio: 'Pixel-perfect interface craftsman creating immersive user experiences.',
      skills: ['React', 'CSS/SASS', 'JavaScript', 'UI/UX', 'Animation'],
      accentColor: 'from-emerald-600 to-teal-600'
    },
    {
      name: 'G Jaya Prakash',
      role: 'Backend Maestro',
      age: 23,
      gender: 'Male',
      github: 'https://github.com/jayaprakash47',
      linkedin: 'https://www.linkedin.com/in/jaya-prakash-0b78032b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      email: 'mailto:Prakashjaya143143@gmail.com',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Data virtuoso with deep expertise in backend architectures and APIs.',
      skills: ['JavaScript', 'Python', 'PostgreSQL', 'API Design', 'DevOps'],
      accentColor: 'from-amber-600 to-orange-600'
    },
    {
      name: 'M Deena',
      role: 'UX Alchemist',
      age: 20,
      gender: 'Female',
      github: 'https://github.com/Deena-02',
      linkedin: 'https://www.linkedin.com/in/m-deena-1048032b6',
      email: 'mailto:dearsifengsgirl45@gmail.com',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Design sorceress transforming complexity into elegant solutions.',
      skills: ['UI/UX Design', 'React', 'CSS', 'Figma', 'User Research'],
      accentColor: 'from-purple-600 to-pink-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md text-gray-800 px-5 py-1.5 rounded-full text-xs font-medium mb-8 shadow-lg border border-gray-200/50"
          >
            <Gem className="w-4 h-4 text-amber-500" />
            <span className="tracking-wider">ELITE TEAM</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-medium text-gray-900 mb-6 tracking-tight leading-tight">
            The Minds Behind
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500"
            >
              BookNest
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
          >
            A collective of visionary developers and designers crafting the future of digital literary experiences.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: 'easeOut' }
                }
              }}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
              className="relative"
            >
              <Card className="p-0 overflow-hidden bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ scale: hoveredMember === index ? 1.05 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-medium tracking-tight">{member.name}</h3>
                    <p className="text-sm text-gray-200 font-light">{member.role}</p>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.accentColor}`} />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Age: {member.age}</span>
                    <span>{member.gender}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed font-light">{member.bio}</p>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-100">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-800">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={member.email} className="p-2 text-gray-400 hover:text-red-500">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Card>

              <AnimatePresence>
                {hoveredMember === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute -top-4 right-4 px-4 py-2 rounded-full text-white text-xs font-medium tracking-wider shadow-lg bg-gradient-to-r ${member.accentColor}`}
                  >
                    {member.role.toUpperCase()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gray-300/50 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gray-300/50 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gray-300/50 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gray-300/50 rounded-br-xl" />
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Heart className="w-8 h-8 text-red-500" />
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 ml-3 tracking-tight">Crafted with Passion</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto font-light mb-8">
              Built with love by visionary developers using cutting-edge technologies.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>React.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Supabase</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Google Books API</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span>Framer Motion</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default TeamPage