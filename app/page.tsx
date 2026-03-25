'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/nailmaster/Header'
import Hero from '@/components/nailmaster/Hero'
import About from '@/components/nailmaster/About'
import Advantages from '@/components/nailmaster/Advantages'
import Courses from '@/components/nailmaster/Courses'
import Pricing from '@/components/nailmaster/Pricing'
import Reviews from '@/components/nailmaster/Reviews'
import Gallery from '@/components/nailmaster/Gallery'
import FAQ from '@/components/nailmaster/FAQ'
import Blog from '@/components/nailmaster/Blog'
import CTA from '@/components/nailmaster/CTA'
import Contacts from '@/components/nailmaster/Contacts'
import Footer from '@/components/nailmaster/Footer'
import ScrollToTop from '@/components/nailmaster/ScrollToTop'
import CookieNotice from '@/components/nailmaster/CookieNotice'
import PrivacyModal from '@/components/nailmaster/PrivacyModal'
import OfferModal from '@/components/nailmaster/OfferModal'
import ThankYouModal from '@/components/nailmaster/ThankYouModal'
import ReviewPopup from '@/components/nailmaster/ReviewPopup'
import AdminPanel from '@/components/nailmaster/AdminPanel'

export default function Home() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [offerOpen, setOfferOpen] = useState(false)
  const [thankYouOpen, setThankYouOpen] = useState(false)
  const [reviewPopupOpen, setReviewPopupOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  // Handle WhatsApp return logic - show review popup when user returns to tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const visitedWhatsApp = localStorage.getItem('visitedWhatsApp')
        const reviewShown = localStorage.getItem('reviewShown')

        // Check if user returned from WhatsApp
        if (visitedWhatsApp === 'true' && reviewShown !== 'true') {
          // Small delay to ensure page is loaded
          const timer = setTimeout(() => {
            setReviewPopupOpen(true)
            // Reset the WhatsApp flag
            localStorage.removeItem('visitedWhatsApp')
          }, 500)
          return () => clearTimeout(timer)
        }
      }
    }

    // Also check on initial load
    const visitedWhatsApp = localStorage.getItem('visitedWhatsApp')
    const reviewShown = localStorage.getItem('reviewShown')
    if (visitedWhatsApp === 'true' && reviewShown !== 'true') {
      const timer = setTimeout(() => {
        setReviewPopupOpen(true)
        localStorage.removeItem('visitedWhatsApp')
      }, 1500)
      return () => clearTimeout(timer)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Handle hash changes for privacy/offer
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#privacy') {
        setPrivacyOpen(true)
      } else if (hash === '#offer') {
        setOfferOpen(true)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Admin access handler
  const handleAdminAccess = () => {
    setAdminOpen(true)
  }

  const handleFormSuccess = () => {
    setThankYouOpen(true)
  }

  const handlePrivacyClose = () => {
    setPrivacyOpen(false)
    if (window.location.hash === '#privacy') {
      window.history.pushState('', '', window.location.pathname)
    }
  }

  const handleOfferClose = () => {
    setOfferOpen(false)
    if (window.location.hash === '#offer') {
      window.history.pushState('', '', window.location.pathname)
    }
  }

  return (
    <>
      <Header onAdminAccess={handleAdminAccess} />
      <main>
        <Hero />
        <About />
        <Advantages />
        <Courses />
        <Pricing />
        <Reviews />
        <Gallery />
        <FAQ />
        <Blog />
        <CTA />
        <Contacts onFormSuccess={handleFormSuccess} />
      </main>
      <Footer
        onPrivacyClick={() => setPrivacyOpen(true)}
        onOfferClick={() => setOfferOpen(true)}
      />

      {/* Utility Components */}
      <ScrollToTop />
      <CookieNotice />

      {/* Modals */}
      <PrivacyModal isOpen={privacyOpen} onClose={handlePrivacyClose} />
      <OfferModal isOpen={offerOpen} onClose={handleOfferClose} />
      <ThankYouModal isOpen={thankYouOpen} onClose={() => setThankYouOpen(false)} />
      <ReviewPopup isOpen={reviewPopupOpen} onClose={() => setReviewPopupOpen(false)} />
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  )
}
