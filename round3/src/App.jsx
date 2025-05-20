import { useState } from 'react'
import './App.css'

function App() {
  const total = 5;

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0)

  const handleClick = (value)=>{
    setRating(value)
  }
  
  return (
    <>
     {[...Array(total)].map((_, index)=>{
      const starValue = index+1;
      return (
        <span
            key={starValue}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            style={{ color: (hovered || rating) >= starValue ? 'gold' : 'lightgray' }}
          >
            { (hovered || rating) >= starValue ? '★' : '☆' }
          </span>
      )
     })}
    </>
  )
}

export default App
