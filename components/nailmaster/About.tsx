import Image from 'next/image'
import { Check } from 'lucide-react'

const features = [
  'Видеоуроки в HD-качестве',
  'Проверка домашних заданий',
  'Личный куратор',
  'Сертификат по окончании',
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-[100px] bg-secondary">
      <div className="container mx-auto px-5 md:px-10">
        <div className="grid gap-10 items-center lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/about.jpg"
              alt="Об обучении маникюру"
              width={600}
              height={450}
              className="w-full h-auto aspect-[4/3] object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-3">
              О нас
            </span>
            <h2 className="text-left mb-6 text-balance">
              Профессиональное обучение маникюру онлайн
            </h2>
            <p className="mb-4">
              Наша школа помогает начинающим мастерам освоить профессию маникюра с нуля. Мы разработали уникальную программу обучения, которая позволяет получить все необходимые навыки за 4 недели интенсивной практики.
            </p>
            <p className="mb-6">
              Каждый урок — это практика с обратной связью от профессионального куратора. Вы научитесь работать с клиентами, освоите современные техники и сможете начать зарабатывать сразу после окончания курса.
            </p>

            {/* Feature List */}
            <ul className="grid gap-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-foreground">
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
