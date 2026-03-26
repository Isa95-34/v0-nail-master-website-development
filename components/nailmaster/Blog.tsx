'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useContent, useBlog } from '@/context/SiteDataContext'

export default function Blog() {
  const { content } = useContent()
  const { blog, isLoading } = useBlog()

  // Default values
  const title = content?.blog_title || 'Полезные статьи'
  const subtitle = content?.blog_subtitle || 'Советы и тренды в мире маникюра'
  const blogPosts = blog.length > 0 ? blog : [
    {
      id: 1,
      title: 'Как выбрать базу для гель-лака',
      excerpt: 'Разбираем основные виды баз и их особенности для разных типов ногтей',
      image: '/images/blog-1.jpg',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Тренды маникюра 2024',
      excerpt: 'Актуальные цвета, формы и дизайны, которые будут в моде весь год',
      image: '/images/blog-2.jpg',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: '5 ошибок начинающих мастеров',
      excerpt: 'Разбираем типичные ошибки и как их избежать на старте карьеры',
      image: '/images/blog-3.jpg',
      date: '2024-01-05'
    }
  ]

  return (
    <section id="blog" className="py-20 md:py-[100px]">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
            Блог
          </span>
          <h2 className="mb-4 text-balance">{title}</h2>
          <p className="text-[17px] max-w-[600px] mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-background rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-[16/10] bg-muted"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-20"></div>
                  <div className="h-5 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : (
            blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-background rounded-2xl overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wide rounded-full mb-3">
                    Статья
                  </span>
                  <h3 className="text-lg leading-snug mb-3">{post.title}</h3>
                  <p className="text-[15px] mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href="#"
                    className="text-[15px] font-medium text-primary hover:text-[#b8983f] transition-colors"
                  >
                    Читать далее &rarr;
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
