import Link from 'next/link'
import Image from 'next/image'

const stats = [
  { number: '500+', label: 'Выпускников' },
  { number: '98%', label: 'Довольных учениц' },
  { number: '4', label: 'Недели обучения' },
]

export default function Hero() {
  return (
    <section id="home" className="pt-[120px] pb-20 md:pt-[140px] md:pb-[100px] bg-gradient-to-br from-secondary to-background">
      <div className="container mx-auto px-5 md:px-10">
        <div className="grid gap-10 items-center lg:grid-cols-2 lg:gap-[60px]">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-balance">
              Онлайн-курсы по маникюру — стань мастером за 4 недели
            </h1>
            <p className="text-lg mb-8 max-w-[540px] mx-auto lg:mx-0">
              Освойте профессию мастера маникюра с нуля и начните зарабатывать. Практические уроки, поддержка куратора и сертификат по окончании.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="#courses"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                Выбрать курс
              </Link>
              <Link
                href="#contacts"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full border-[1.5px] border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Получить программу
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start flex-wrap">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="block font-serif text-4xl font-semibold text-primary">
                    {stat.number}
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/hero.jpg"
              alt="Профессиональный маникюр"
              width={600}
              height={600}
              className="w-full h-auto aspect-[4/3] lg:aspect-square object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
