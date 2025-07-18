import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { home } from './pages/home'
import { about } from './pages/about'
import { contact } from './pages/contact'
import { projects } from './pages/projects'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={home() } />
          <Route path="/about" element={about()} />
          <Route path="/contact" element={contact()} />
          <Route path="/projects" element={projects()} />
        </Routes>
      </Router>
    </>
  )
}

export default App


