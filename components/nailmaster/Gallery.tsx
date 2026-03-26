'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useContent, useImages } from '@/context/SiteDataContext'

export default function Gallery() {
  const { content } = useContent()
  const { images, isLoading } = useImages()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  // Default values
  const title = content?.gallery_title || 'Работы наших учениц'
  const subtitle = content?.gallery_subtitle || 'Результаты после прохождения курса'
  const galleryImages = images?.gallery || [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
    '/images/gallery-5.jpg',
    '/images/gallery-6.jpg',
    '/images/gallery-7.jpg',
    '/images/gallery-8.jpg',
  ]

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
            <h2 className="mb-4 text-balance">{title}</h2>
            <p className="text-[17px] max-w-[600px] mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {galleryImages.map((src, index) => (
              <button
                key={index}
                onClick={() => openLightbox(src)}
                className="relative rounded-xl overflow-hidden aspect-square cursor-pointer group"
              >
                <Image
                  src={src}
                  alt={`Работа выпускницы ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
                {isLoading && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
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
