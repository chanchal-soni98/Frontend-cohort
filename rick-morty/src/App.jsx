import './App.css';
import Footer from './Component/Footer';
import Main from './Component/Main';
import CharDetail from './Component/CharDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Main /><Footer /></>} />
        <Route path="/character/:id" element={<><CharDetail /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;
