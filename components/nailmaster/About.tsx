'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { useContent, useImages } from '@/context/SiteDataContext'

export default function About() {
  const { content, isLoading } = useContent()
  const { images } = useImages()

  // Default values
  const title = content?.about_title || 'О нашей школе'
  const text = content?.about_text || 'NailMaster — это онлайн-школа маникюра, где вы получите все необходимые знания и навыки для старта карьеры мастера.'
  const features = content?.about_features || [
    'Обучение с нуля до профессионала',
    'Практические задания с обратной связью',
    'Сертификат по окончании курса',
    'Поддержка кураторов 24/7'
  ]
  const aboutImage = images?.about || '/images/about.jpg'

  return (
    <section id="about" className="py-20 md:py-[100px] bg-secondary">
      <div className="container mx-auto px-5 md:px-10">
        <div className="grid gap-10 items-center lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl relative">
            <Image
              src={aboutImage}
              alt="Об обучении маникюру"
              width={600}
              height={450}
              className="w-full h-auto aspect-[4/3] object-cover"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-3">
              О нас
            </span>
            <h2 className="text-left mb-6 text-balance">
              {title}
            </h2>
            <p className="mb-6">
              {text}
            </p>

            {/* Feature List */}
            <ul className="grid gap-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <span className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs rounded-full shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
