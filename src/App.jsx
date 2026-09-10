import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import HomePage from './pages/HomePage'
import AudioPage from './pages/AudioPage'
import WebDesignPage from './pages/WebDesignPage'
import PhotoPage from './pages/PhotoPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Portfolio from './pages/Portfolio'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: false }}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="audio" element={<AudioPage />} />
          <Route path="web-design" element={<WebDesignPage />} />
          <Route path="photo" element={<PhotoPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}