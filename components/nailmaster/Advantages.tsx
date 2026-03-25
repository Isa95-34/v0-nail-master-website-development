import { BookOpen, Users, MessageSquare, Smartphone, GraduationCap, Briefcase } from 'lucide-react'

const advantages = [
  {
    icon: BookOpen,
    title: 'Структурированная программа',
    description: 'Пошаговое обучение от простого к сложному. Каждый урок логически связан с предыдущим.',
  },
  {
    icon: Users,
    title: 'Опытные преподаватели',
    description: 'Практикующие мастера с многолетним опытом работы и обучения.',
  },
  {
    icon: MessageSquare,
    title: 'Обратная связь',
    description: 'Проверка каждого домашнего задания с подробными комментариями.',
  },
  {
    icon: Smartphone,
    title: 'Удобный формат',
    description: 'Учитесь в любое время с любого устройства. Доступ к урокам 24/7.',
  },
  {
    icon: GraduationCap,
    title: 'Сертификат',
    description: 'Официальный сертификат о прохождении курса для вашего портфолио.',
  },
  {
    icon: Briefcase,
    title: 'Помощь с трудоустройством',
    description: 'Советы по поиску клиентов и продвижению своих услуг.',
  },
]

export default function Advantages() {
  return (
    <section className="py-20 md:py-[100px]">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
            Преимущества
          </span>
          <h2 className="text-balance">Почему выбирают нас</h2>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="p-8 bg-background border border-border rounded-2xl text-center transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-accent rounded-full text-primary">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg mb-3">{item.title}</h3>
              <p className="text-[15px]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
