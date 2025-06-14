const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card