'use client'

import { createContext, useContext, ReactNode } from 'react'
import useSWR from 'swr'

// Types for our data
export interface HeroStats {
  students: string
  students_label: string
  experience: string
  experience_label: string
  employment: string
  employment_label: string
}

export interface Advantage {
  icon: string
  title: string
  description: string
}

export interface Course {
  name: string
  price: string
  old_price: string
  duration: string
  description: string
  features: string[]
  image: string
  popular?: boolean
}

export interface Review {
  id: number
  name: string
  text: string
  rating: number
  course: string
  image?: string
  date: string
  approved: boolean
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface SiteContent {
  hero_title: string
  hero_subtitle: string
  hero_stats: HeroStats
  about_title: string
  about_text: string
  about_features: string[]
  advantages_title: string
  advantages: Advantage[]
  courses_title: string
  courses_subtitle: string
  pricing_title: string
  pricing_subtitle: string
  reviews_title: string
  reviews_subtitle: string
  gallery_title: string
  gallery_subtitle: string
  faq_title: string
  blog_title: string
  blog_subtitle: string
  cta_title: string
  cta_subtitle: string
  contacts_title: string
  contacts_subtitle: string
}

export interface SiteContacts {
  phone: string
  telegram: string
  email: string
  whatsapp: string
  whatsapp_message: string
  address: string
  work_hours: string
}

export interface SiteImages {
  hero: string
  about: string
  gallery: string[]
}

export interface SiteData {
  content: SiteContent
  courses: Record<string, Course>
  contacts: SiteContacts
  images: SiteImages
  blog: BlogPost[]
  faq: FAQItem[]
  reviews: Review[]
}

interface SiteDataContextType {
  data: SiteData | null
  isLoading: boolean
  error: Error | null
  mutate: () => void
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined)

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const { data, error, isLoading, mutate } = useSWR<SiteData>('/api/data', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // Cache for 1 minute
  })

  return (
    <SiteDataContext.Provider value={{ data: data || null, isLoading, error: error || null, mutate }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const context = useContext(SiteDataContext)
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider')
  }
  return context
}

// Individual hooks for specific data sections
export function useContent() {
  const { data, isLoading, error } = useSiteData()
  return { content: data?.content || null, isLoading, error }
}

export function useCourses() {
  const { data, isLoading, error } = useSiteData()
  return { courses: data?.courses || null, isLoading, error }
}

export function useContacts() {
  const { data, isLoading, error } = useSiteData()
  return { contacts: data?.contacts || null, isLoading, error }
}

export function useImages() {
  const { data, isLoading, error } = useSiteData()
  return { images: data?.images || null, isLoading, error }
}

export function useBlog() {
  const { data, isLoading, error } = useSiteData()
  return { blog: data?.blog || [], isLoading, error }
}

export function useFAQ() {
  const { data, isLoading, error } = useSiteData()
  return { faq: data?.faq || [], isLoading, error }
}

export function useReviews() {
  const { data, isLoading, error } = useSiteData()
  return { reviews: data?.reviews?.filter(r => r.approved) || [], isLoading, error }
}
