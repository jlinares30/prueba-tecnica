function Card({ children, className = "" }) {
  return (
    <div className={`border border-gray-200 rounded-xl shadow-lg hover:shadow-xl bg-white w-full mx-auto transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
}


export default Card;