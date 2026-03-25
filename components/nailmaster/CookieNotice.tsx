'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted')
    if (!cookieAccepted) {
      // Show with slight delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true')
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-foreground text-white p-4 z-50 animate-fade-in">
      <div className="container mx-auto px-5 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/80 text-center sm:text-left">
          Мы используем cookies для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с использованием cookies.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAccept}
            className="px-6 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-[#b8983f] transition-colors whitespace-nowrap"
          >
            Принять
          </button>
          <button
            onClick={handleClose}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
