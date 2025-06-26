// import './App.css'
// import {Provider} from 'react-redux';
// import { store } from './Redux/store.js';
// import { Counter } from './components/Counter.jsx';
// import ThemeToggle from './components/ThemeToggle.jsx';
// import Todo from './components/Todo.jsx';



// export default function App() {
//   return (
//     <Provider store={store}>
//       <Todo/>
//       {/* <ThemeToggle/>
//       <Counter/> */}
//     </Provider>
   
//   )
// }

import React from "react";
import RunningTicker from "./Ticker/RunningTicker";

function App() {
  return (
    <div>
      <RunningTicker message="⚡ Important Notice Important Notice" speed={15} />
    </div>
  );
}

export default App;


