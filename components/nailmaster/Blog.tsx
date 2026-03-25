import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    image: '/images/blog-1.jpg',
    category: 'Материалы',
    title: 'Как выбрать базу для гель-лака: полное руководство',
    excerpt: 'Разбираемся в видах баз, их особенностях и подбираем идеальный вариант для разных типов ногтей.',
  },
  {
    image: '/images/blog-2.jpg',
    category: 'Тренды',
    title: 'Тренды маникюра 2025: что будет модно в новом сезоне',
    excerpt: 'Обзор главных трендов года: цвета, формы, дизайны и техники, которые будут на пике популярности.',
  },
  {
    image: '/images/blog-3.jpg',
    category: 'Советы',
    title: '5 ошибок новичков, которые портят маникюр',
    excerpt: 'Разбираем типичные ошибки начинающих мастеров и рассказываем, как их избежать с первых дней работы.',
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-20 md:py-[100px]">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
            Блог
          </span>
          <h2 className="mb-4 text-balance">Полезные статьи</h2>
          <p className="text-[17px] max-w-[600px] mx-auto">
            Советы и рекомендации для мастеров маникюра
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="bg-background rounded-2xl overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden">
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
                  {post.category}
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
          ))}
        </div>
      </div>
    </section>
  )
}
