function Card({ children, className = "", onClick }) {
  return (
    <div 
      className={`border border-gray-200 rounded-xl shadow-lg hover:shadow-xl w-full mx-auto transition-shadow duration-300 ${className}`} 
      onClick={onClick}>
      {children}
    </div>
  );
}


export default Card;