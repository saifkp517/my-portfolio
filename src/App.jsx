import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import WebSocketsArticle from './pages/articles/WebSocketsArticle.jsx'
import RedisArticle from './pages/articles/RedisArticle.jsx'

// Scrolls to the top on route changes (article ↔ home), but leaves in-page
// hash scrolling (e.g. Home's own #zentra handling) alone.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/websockets" element={<WebSocketsArticle />} />
        <Route path="/articles/redis" element={<RedisArticle />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
