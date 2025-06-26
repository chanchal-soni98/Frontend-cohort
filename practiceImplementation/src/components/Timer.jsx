import React, { useEffect, useState } from 'react'
// Create a timer app that starts and pauses with useEffect, implementing a cleanup function.
const Timer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() =>{
        let timer;
        if(isRunning){
            timer = setInterval(() =>{
                setTime(p => p+1);
            },1000)
        }

        return () => clearInterval(timer);
    },[isRunning]);



  return (
    <div>
        <h1>Timer : {time}</h1>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
    </div>
  )
}

export default Timer