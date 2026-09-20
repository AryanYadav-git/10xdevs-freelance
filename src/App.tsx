import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { useTheme } from './hooks/useTheme'
import { Admin } from './pages/Admin'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { ScheduleMeeting } from './pages/ScheduleMeeting'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <BrowserRouter>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:projectId" element={<ProjectDetail />} />
          <Route path="/schedule" element={<ScheduleMeeting />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
