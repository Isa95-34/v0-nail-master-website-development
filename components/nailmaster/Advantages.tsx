'use client'

import { BookOpen, Users, MessageSquare, Smartphone, GraduationCap, Briefcase, Video, Award, Heart, Clock } from 'lucide-react'
import { useContent } from '@/context/SiteDataContext'

const iconMap: Record<string, typeof BookOpen> = {
  video: Video,
  users: Users,
  certificate: Award,
  support: MessageSquare,
  practice: BookOpen,
  job: Briefcase,
  book: BookOpen,
  message: MessageSquare,
  phone: Smartphone,
  graduation: GraduationCap,
  heart: Heart,
  clock: Clock,
}

export default function Advantages() {
  const { content, isLoading } = useContent()

  // Default values
  const title = content?.advantages_title || 'Почему выбирают нас'
  const advantages = content?.advantages || [
    { icon: 'video', title: 'Видеоуроки HD', description: 'Качественные уроки с разных ракурсов' },
    { icon: 'users', title: 'Малые группы', description: 'Индивидуальный подход к каждому' },
    { icon: 'certificate', title: 'Сертификат', description: 'Официальный документ по окончании' },
    { icon: 'support', title: 'Поддержка', description: 'Кураторы на связи 24/7' },
    { icon: 'practice', title: 'Практика', description: '80% курса — практические задания' },
    { icon: 'job', title: 'Трудоустройство', description: 'Помощь в поиске первых клиентов' },
  ]

  return (
    <section className="py-20 md:py-[100px]">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
            Преимущества
          </span>
          <h2 className="text-balance">{title}</h2>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-8 bg-background border border-border rounded-2xl animate-pulse">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full"></div>
                <div className="h-5 bg-muted rounded w-3/4 mx-auto mb-3"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))
          ) : (
            advantages.map((item, index) => {
              const IconComponent = iconMap[item.icon] || BookOpen
              return (
                <div
                  key={index}
                  className="p-8 bg-background border border-border rounded-2xl text-center transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary"
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-accent rounded-full text-primary">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg mb-3">{item.title}</h3>
                  <p className="text-[15px]">{item.description}</p>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
