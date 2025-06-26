import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../Redux/themeSlice';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state)=> state.theme.theme);
    
  return (
    <div>
        <h1>Theme: {theme}</h1>
        <button onClick={() => dispatch(toggleTheme())}>Theme Toggle</button>
    </div>
  )
}

export default ThemeToggle