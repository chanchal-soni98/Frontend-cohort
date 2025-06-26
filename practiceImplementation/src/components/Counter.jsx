import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
  return (
    <div>
    
    <h1>Counter Application</h1>
    <h1>{count}</h1>
    <button onClick={() => setCount(p => p+1)}>Increment</button>
    <button onClick={()=> setCount(p => p-1)}>Decrement</button>
    <button onClick={()=>setCount(0)}>Reset</button>
    </div>
  )
}

export default Counter