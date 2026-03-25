'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    question: 'Нужен ли опыт для прохождения курса?',
    answer: 'Нет, опыт не требуется. Наши курсы разработаны для начинающих с нуля. Вы получите все необходимые знания и навыки в процессе обучения.',
  },
  {
    question: 'Какие материалы нужны для обучения?',
    answer: 'После оплаты вы получите подробный список материалов и инструментов. Мы также предоставим рекомендации по выбору и ссылки на проверенных поставщиков.',
  },
  {
    question: 'Сколько времени нужно уделять обучению?',
    answer: 'Рекомендуем уделять обучению минимум 1-2 часа в день. Но вы можете учиться в удобном для вас темпе — доступ к урокам открыт 24/7.',
  },
  {
    question: 'Как проходит проверка домашних заданий?',
    answer: 'Вы отправляете фото или видео своей работы куратору. В течение 24-48 часов получаете подробный разбор с рекомендациями по улучшению.',
  },
  {
    question: 'Выдаётся ли сертификат?',
    answer: 'Да, после успешного прохождения курса и выполнения всех домашних заданий вы получаете официальный сертификат в электронном и печатном виде.',
  },
  {
    question: 'Можно ли оплатить в рассрочку?',
    answer: 'Да, мы предоставляем возможность оплаты в рассрочку на 3-6 месяцев без переплаты. Свяжитесь с нами для уточнения условий.',
  },
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 md:py-[100px] bg-secondary">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-balance">Часто задаваемые вопросы</h2>
        </div>

        {/* FAQ List */}
        <div className="max-w-[800px] mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-background rounded-xl mb-4 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 flex items-center justify-between gap-4 text-left font-medium text-foreground hover:text-primary transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-primary shrink-0 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-[300px]' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-6 text-[15px] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
