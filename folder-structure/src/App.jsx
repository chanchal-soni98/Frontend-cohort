// import './App.css'
import FolderStructure from './components/FolderStructure'
import explorer from './data/explorer'

function App() {
  

  return (
    <div style={{ padding: 20 }}>
      <h2>📂 File Explorer</h2>
      <FolderStructure explorer={explorer} />
    </div>
  )
}

export default App
