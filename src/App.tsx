import { useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import Index from './pages/Index'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const queryClient = new QueryClient()

const App = () => {
  useEffect(() => {
    gsap.config({ nullTargetWarn: false })

    const cursor = document.createElement('div')
    cursor.className =
      'fixed w-6 h-6 rounded-full pointer-events-none z-50 border border-said-green mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block'
    document.body.appendChild(cursor)

    // Cursor follower
    const follower = document.createElement('div')
    follower.className =
      'fixed w-12 h-12 rounded-full pointer-events-none z-50 bg-said-green/10 transform -translate-x-1/2 -translate-y-1/2 hidden md:block'
    document.body.appendChild(follower)

    // GSAP animations for cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 })
    gsap.set(follower, { xPercent: -50, yPercent: -50 })

    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { duration: 0.2, x: e.clientX, y: e.clientY })
      gsap.to(follower, { duration: 0.8, x: e.clientX, y: e.clientY })
    })

    // Links hover effect
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.3 })
        gsap.to(follower, { scale: 0.5, opacity: 0.5, duration: 0.3 })
      })

      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
        gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 })
      })
    })

    return () => {
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor)
      if (follower.parentNode) follower.parentNode.removeChild(follower)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-1'>
              <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/about' element={<About />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
