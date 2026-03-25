'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const galleryItems = [
  { src: '/images/gallery-1.jpg', alt: 'Работа выпускницы - маникюр' },
  { src: '/images/gallery-2.jpg', alt: 'Работа выпускницы - дизайн ногтей' },
  { src: '/images/gallery-3.jpg', alt: 'Работа выпускницы - французский маникюр' },
  { src: '/images/gallery-4.jpg', alt: 'Работа выпускницы - градиент' },
  { src: '/images/gallery-5.jpg', alt: 'Работа выпускницы - нюдовый маникюр' },
  { src: '/images/gallery-6.jpg', alt: 'Работа выпускницы - арт дизайн' },
  { src: '/images/gallery-7.jpg', alt: 'Работа выпускницы - стразы' },
  { src: '/images/gallery-8.jpg', alt: 'Работа выпускницы - геометрия' },
]

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  const openLightbox = (src: string) => {
    setCurrentImage(src)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setCurrentImage(null)
    document.body.style.overflow = ''
  }

  return (
    <>
      <section id="gallery" className="py-20 md:py-[100px]">
        <div className="container mx-auto px-5 md:px-10">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
              Галерея
            </span>
            <h2 className="mb-4 text-balance">Работы наших выпускниц</h2>
            <p className="text-[17px] max-w-[600px] mx-auto">
              Результаты обучения на наших курсах
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {galleryItems.map((item) => (
              <button
                key={item.src}
                onClick={() => openLightbox(item.src)}
                className="relative rounded-xl overflow-hidden aspect-square cursor-pointer group"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-5 cursor-pointer animate-fade-in"
          onClick={closeLightbox}
          onKeyDown={(e) => e.key === 'Escape' && closeLightbox()}
        >
          <div className="relative max-w-[90%] max-h-[90vh] animate-scale-in">
            <Image
              src={currentImage}
              alt="Галерея"
              width={1200}
              height={900}
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
            />
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 p-2 text-white hover:text-primary transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
