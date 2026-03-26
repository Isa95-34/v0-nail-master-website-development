'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

export interface Review {
  id: string | number
  name: string
  course: string
  text: string
  rating: number
  avatar?: string
  image?: string
  isUserReview?: boolean
  approved?: boolean
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-primary">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'fill-current' : 'fill-none'}`}
        />
      ))}
    </div>
  )
}

const courseNames: Record<string, string> = {
  start: 'Курс START',
  pro: 'Курс PRO',
  vip: 'Курс VIP',
  general: 'Пользователь',
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [loading, setLoading] = useState(true)

  // Load reviews from API
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch('/api/reviews')
        const data = await res.json()
        setReviews(data)
      } catch (err) {
        console.error('Error loading reviews:', err)
      }
      setLoading(false)
    }
    loadReviews()
  }, [])

  // Update slides per view based on window width
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }
    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  const totalSlides = Math.ceil(reviews.length / slidesPerView)

  const goToSlide = useCallback((index: number) => {
    const maxSlide = totalSlides - 1
    setCurrentSlide(Math.max(0, Math.min(index, maxSlide)))
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0)
  }, [currentSlide, totalSlides, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1)
  }, [currentSlide, totalSlides, goToSlide])

  // Auto-advance slider
  useEffect(() => {
    if (reviews.length === 0) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide, reviews.length])

  if (loading) {
    return (
      <section id="reviews" className="py-20 md:py-[100px] bg-secondary">
        <div className="container mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
              Отзывы
            </span>
            <h2 className="mb-4 text-balance">Что говорят наши выпускники</h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </div>
      </section>
    )
  }

  if (reviews.length === 0) {
    return (
      <section id="reviews" className="py-20 md:py-[100px] bg-secondary">
        <div className="container mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
              Отзывы
            </span>
            <h2 className="mb-4 text-balance">Что говорят наши выпускники</h2>
            <p className="text-[17px] max-w-[600px] mx-auto">
              Отзывов пока нет. Будьте первым!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="reviews" className="py-20 md:py-[100px] bg-secondary">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
            Отзывы
          </span>
          <h2 className="mb-4 text-balance">Что говорят наши выпускники</h2>
          <p className="text-[17px] max-w-[600px] mx-auto">
            Реальные истории успеха наших учениц
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView + 6 / slidesPerView)}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 bg-background rounded-2xl p-8 shadow-sm"
                style={{ width: `calc(${100 / slidesPerView}% - ${(24 * (slidesPerView - 1)) / slidesPerView}px)` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {(review.avatar || review.image) ? (
                    <Image
                      src={review.avatar || review.image || ''}
                      alt={review.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-lg">
                      {review.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <span className="block font-semibold text-foreground">{review.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {courseNames[review.course] || review.course}
                    </span>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed mb-4">{review.text}</p>
                <StarRating rating={review.rating} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide ? 'bg-primary scale-125' : 'bg-border'
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
            aria-label="Следующий отзыв"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
