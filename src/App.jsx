import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { About } from './pages/about'
import { Contact } from './pages/contact'
import { Projects } from './pages/projects'
import { Layout } from './components/layout'
import './App.css'



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App


