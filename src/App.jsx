import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { About } from './pages/about'
import { Contact } from './pages/contact'
import { Projects } from './pages/projects'
import { Layout } from './components/layout'
import './App.css'
import { useEffect } from 'react'
import { CustomCursor } from './components/CustomCursor'



function App() {
  useEffect(() => {
    // Add momentum scrolling
    document.body.style.scrollBehavior = 'smooth'
    
    // Enhanced smooth scrolling with CSS
    const style = document.createElement('style')
    style.innerHTML = `
      * {
        scroll-behavior: smooth !important;
      }
      html {
        scroll-snap-type: y proximity;
      }
    `
    document.head.appendChild(style)
  }, [])



  return (
    <>

      
      <CustomCursor />
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


