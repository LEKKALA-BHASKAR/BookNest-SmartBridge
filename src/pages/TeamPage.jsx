import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import Card from '../components/UI/Card'

const TeamPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const teamMembers = [
    {
      name: 'L Bhaskar',
      role: 'Team Lead',
      age: 20,
      gender: 'Male',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Passionate full-stack developer with expertise in React and Node.js. Leading the team with innovative solutions.',
      skills: ['React', 'Node.js', 'MongoDB', 'Leadership']
    },
    {
      name: 'J Dhanush',
      role: 'Frontend Developer',
      age: 21,
      gender: 'Male',
      image: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Creative frontend developer focused on building beautiful and intuitive user interfaces.',
      skills: ['React', 'CSS', 'JavaScript', 'UI/UX']
    },
    {
      name: 'G Jaya Prakash',
      role: 'Full Stack Developer',
      age: 27,
      gender: 'Male',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Experienced developer with strong background in both frontend and backend technologies.',
      skills: ['JavaScript', 'Python', 'PostgreSQL', 'API Design']
    },
    {
      name: 'M Deena',
      role: 'UI/UX Developer',
      age: 25,
      gender: 'Female',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Designer and developer who brings creative vision to life through code and elegant user experiences.',
      skills: ['UI/UX Design', 'React', 'CSS', 'Figma']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Amazing
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Development Team
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a passionate group of developers dedicated to creating exceptional digital experiences. 
            Get to know the minds behind BookNest.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className={`p-0 overflow-hidden transform transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-gray-200">{member.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Age: {member.age}</span>
                  <span>{member.gender}</span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center space-x-3 pt-4 border-t border-gray-100">
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Github className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Message */}
        <div className={`text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <Card className="p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Built with Passion</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
              Built with ❤️ by passionate developers using Google Books API and Supabase. 
              We believe in creating technology that brings people closer to the books they love.
            </p>
            <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>React.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Supabase</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Google Books API</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TeamPage