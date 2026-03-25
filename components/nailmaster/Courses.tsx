'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Video, FileText, Calendar, MessageCircle, PhoneCall, Infinity } from 'lucide-react'
import { useContent, useCourses } from '@/context/SiteDataContext'

type CourseKey = 'start' | 'pro' | 'vip'

const courseFeatureIcons: Record<string, typeof Clock> = {
  clock: Clock,
  video: Video,
  file: FileText,
  calendar: Calendar,
  message: MessageCircle,
  phone: PhoneCall,
  infinity: Infinity,
}

// Default course data for SSR
const defaultCourses: Record<CourseKey, {
  badge: string
  badgeClass: string
  name: string
  description: string
  modules: string[]
  features: { icon: typeof Clock; label: string }[]
  priceOld: string
  priceCurrent: string
  image: string
}> = {
  start: {
    badge: 'Для новичков',
    badgeClass: 'bg-muted text-muted-foreground',
    name: 'Курс START',
    description: 'Идеальный выбор для тех, кто только начинает свой путь в маникюре.',
    modules: [
      'Модуль 1: Инструменты и материалы',
      'Модуль 2: Гигиена и стерилизация',
      'Модуль 3: Формы ногтей',
      'Модуль 4: Классический маникюр',
      'Модуль 5: Покрытие гель-лаком',
      'Модуль 6: Снятие покрытия',
    ],
    features: [
      { icon: Clock, label: '2 недели обучения' },
      { icon: Video, label: '12 видеоуроков' },
      { icon: FileText, label: '6 домашних заданий' },
      { icon: Calendar, label: 'Доступ 30 дней' },
    ],
    priceOld: '15 000',
    priceCurrent: '9 900',
    image: '/images/course-start.jpg',
  },
  pro: {
    badge: 'Популярный выбор',
    badgeClass: 'bg-primary text-primary-foreground',
    name: 'Курс PRO',
    description: 'Полная программа для тех, кто хочет стать профессиональным мастером маникюра.',
    modules: [
      'Все модули курса START',
      'Модуль 7: Аппаратный маникюр',
      'Модуль 8: Комбинированная техника',
      'Модуль 9: Укрепление ногтей',
      'Модуль 10: Дизайны и декор',
      'Модуль 11: Работа с клиентами',
      'Модуль 12: Бизнес-старт',
    ],
    features: [
      { icon: Clock, label: '4 недели обучения' },
      { icon: Video, label: '24 видеоурока' },
      { icon: FileText, label: '12 домашних заданий' },
      { icon: MessageCircle, label: 'Чат с куратором' },
      { icon: Calendar, label: 'Доступ 60 дней' },
    ],
    priceOld: '25 000',
    priceCurrent: '17 900',
    image: '/images/course-pro.jpg',
  },
  vip: {
    badge: 'Премиум',
    badgeClass: 'bg-gradient-to-r from-primary to-accent text-foreground',
    name: 'Курс VIP',
    description: 'Максимальный формат с индивидуальным сопровождением.',
    modules: [
      'Все модули курса PRO',
      'Модуль 13: Наращивание ногтей',
      'Модуль 14: Сложные дизайны',
      'Модуль 15: Работа с проблемными ногтями',
      'Модуль 16: Продвижение в соцсетях',
      'Модуль 17: Построение личного бренда',
      '4 индивидуальных созвона',
    ],
    features: [
      { icon: Clock, label: '6 недель обучения' },
      { icon: Video, label: '36 видеоуроков' },
      { icon: FileText, label: '18 домашних заданий' },
      { icon: PhoneCall, label: '4 личных созвона' },
      { icon: Infinity, label: 'Пожизненный доступ' },
    ],
    priceOld: '45 000',
    priceCurrent: '34 900',
    image: '/images/course-vip.jpg',
  },
}

const tabs: { key: CourseKey; label: string }[] = [
  { key: 'start', label: 'Start' },
  { key: 'pro', label: 'Pro' },
  { key: 'vip', label: 'VIP' },
]

const badgeConfig: Record<CourseKey, { badge: string; badgeClass: string }> = {
  start: { badge: 'Для новичков', badgeClass: 'bg-muted text-muted-foreground' },
  pro: { badge: 'Популярный выбор', badgeClass: 'bg-primary text-primary-foreground' },
  vip: { badge: 'Премиум', badgeClass: 'bg-gradient-to-r from-primary to-accent text-foreground' },
}

export default function Courses() {
  const [activeTab, setActiveTab] = useState<CourseKey>('start')
  const { content, isLoading: contentLoading } = useContent()
  const { courses: apiCourses, isLoading: coursesLoading } = useCourses()

  // Get content from API or defaults
  const title = content?.courses_title || 'Наши курсы'
  const subtitle = content?.courses_subtitle || 'Выберите программу обучения'

  // Build course data from API or use defaults
  const getCourseData = (key: CourseKey) => {
    const defaultData = defaultCourses[key]
    const apiData = apiCourses?.[key]

    if (!apiData) return defaultData

    return {
      badge: badgeConfig[key].badge,
      badgeClass: badgeConfig[key].badgeClass,
      name: apiData.name || defaultData.name,
      description: apiData.description || defaultData.description,
      modules: defaultData.modules, // Keep default modules for now
      features: apiData.features?.map((f, i) => ({
        icon: defaultData.features[i]?.icon || Clock,
        label: f,
      })) || defaultData.features,
      priceOld: apiData.old_price ? formatPrice(apiData.old_price) : defaultData.priceOld,
      priceCurrent: apiData.price ? formatPrice(apiData.price) : defaultData.priceCurrent,
      image: apiData.image || defaultData.image,
    }
  }

  const course = getCourseData(activeTab)
  const isLoading = contentLoading || coursesLoading

  return (
    <section id="courses" className="py-20 md:py-[100px] bg-secondary">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
            Курсы
          </span>
          <h2 className="mb-4 text-balance">{title}</h2>
          <p className="text-[17px] max-w-[600px] mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-3 text-base font-medium rounded-full border-2 transition-all ${
                activeTab === tab.key
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-background border-border hover:border-primary hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Course Content */}
        <div className="animate-fade-in" key={activeTab}>
          <div className="grid gap-10 bg-background rounded-2xl p-8 md:p-12 shadow-md lg:grid-cols-2 lg:gap-[60px]">
            {/* Info */}
            <div>
              <span className={`inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full mb-3 ${course.badgeClass}`}>
                {course.badge}
              </span>
              <h3 className="text-2xl md:text-3xl mb-4">{course.name}</h3>
              <p className="mb-6">{course.description}</p>

              {/* Modules */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-foreground mb-3">Программа курса:</h4>
                <ul className="grid gap-2">
                  {course.modules.map((module, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[15px] text-muted-foreground">
                      <span className="text-primary font-bold">•</span>
                      {module}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-4 mb-8">
                {course.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm"
                  >
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-base text-muted-foreground line-through">{course.priceOld} rub</span>
                  <span className="font-serif text-3xl font-semibold text-primary">{course.priceCurrent} rub</span>
                </div>
                <Link
                  href="#contacts"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  Записаться на курс
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-xl overflow-hidden relative">
              <Image
                src={course.image}
                alt={course.name}
                width={600}
                height={450}
                className="w-full h-full object-cover aspect-[4/3]"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function formatPrice(price: string): string {
  const num = parseInt(price.replace(/\D/g, ''), 10)
  return num.toLocaleString('ru-RU').replace(/,/g, ' ')
}
