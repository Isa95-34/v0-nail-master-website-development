'use client'

import { useState, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

interface ContactsProps {
  onFormSuccess: () => void
}

interface ContactData {
  phone: string
  telegram: string
  email: string
  whatsapp: string
  whatsapp_message: string
  address: string
  work_hours: string
}

export default function Contacts({ onFormSuccess }: ContactsProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    course: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [contacts, setContacts] = useState<ContactData | null>(null)

  // Load contacts from API
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const res = await fetch('/api/data')
        const data = await res.json()
        setContacts(data.contacts)
      } catch (err) {
        console.error('Error loading contacts:', err)
      }
    }
    loadContacts()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Введите ваше имя'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}$/

    if (!emailRegex.test(formData.contact) && !phoneRegex.test(formData.contact)) {
      newErrors.contact = 'Введите корректный email или телефон'
    }

    if (!formData.consent) {
      newErrors.consent = 'Необходимо согласие'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitting(true)

    try {
      // Submit application to API
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          contact: formData.contact.trim(),
          course: formData.course || 'not_specified',
        }),
      })

      if (!res.ok) {
        throw new Error('Ошибка отправки')
      }

      // Set flag that user is going to WhatsApp (for review popup)
      localStorage.setItem('visitedWhatsApp', 'true')

      // Generate WhatsApp link
      const courseText = formData.course ? ` Интересует курс: ${formData.course.toUpperCase()}` : ''
      const message = `Здравствуйте! Меня зовут ${formData.name}.${courseText}. Хочу записаться на курс.`
      const whatsappNumber = contacts?.whatsapp?.replace('https://wa.me/', '') || '79001234567'
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      
      // Reset form
      setFormData({ name: '', contact: '', course: '', consent: false })
      
      // Show thank you
      onFormSuccess()

      // Open WhatsApp after delay
      setTimeout(() => {
        window.open(whatsappLink, '_blank')
      }, 1500)
    } catch (err) {
      console.error('Error submitting application:', err)
      setErrors({ submit: 'Ошибка отправки. Попробуйте еще раз.' })
    }

    setSubmitting(false)
  }

  const phone = contacts?.phone || '+7 (900) 123-45-67'
  const telegram = contacts?.telegram || '@nailmaster_courses'
  const email = contacts?.email || 'info@nailmaster-courses.ru'
  const whatsapp = contacts?.whatsapp || 'https://wa.me/79001234567'
  const whatsappMessage = contacts?.whatsapp_message || 'Здравствуйте! Хочу узнать о курсах'

  return (
    <section id="contacts" className="py-20 md:py-[100px] bg-secondary">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
            Контакты
          </span>
          <h2 className="mb-4 text-balance">Свяжитесь с нами</h2>
          <p className="text-[17px] max-w-[600px] mx-auto">
            Ответим на все вопросы и поможем выбрать курс
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-[60px]">
          {/* Contact Info */}
          <div>
            {/* WhatsApp */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-1">WhatsApp</h4>
                <a
                  href={`${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => localStorage.setItem('visitedWhatsApp', 'true')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* Telegram */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-1">Telegram</h4>
                <a
                  href={`https://t.me/${telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {telegram}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-1">Email</h4>
                <a
                  href={`mailto:${email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 bg-background rounded-2xl p-12 text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-[15px]">
                Онлайн-школа<br />
                Обучение проходит дистанционно
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-8 md:p-10 shadow-md">
            <h3 className="text-center mb-8">Записаться на курс</h3>

            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-[15px] font-medium text-foreground">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Введите ваше имя"
                className={`w-full px-5 py-3.5 text-base border rounded-xl bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                  errors.name ? 'border-destructive' : 'border-border'
                }`}
              />
              {errors.name && <span className="text-destructive text-sm mt-1 block">{errors.name}</span>}
            </div>

            <div className="mb-5">
              <label htmlFor="contact" className="block mb-2 text-[15px] font-medium text-foreground">
                Телефон или Email
              </label>
              <input
                type="text"
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="+7 (___) ___-__-__ или email"
                className={`w-full px-5 py-3.5 text-base border rounded-xl bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                  errors.contact ? 'border-destructive' : 'border-border'
                }`}
              />
              {errors.contact && <span className="text-destructive text-sm mt-1 block">{errors.contact}</span>}
            </div>

            <div className="mb-5">
              <label htmlFor="course" className="block mb-2 text-[15px] font-medium text-foreground">
                Интересующий курс
              </label>
              <select
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-5 py-3.5 text-base border border-border rounded-xl bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Выберите курс</option>
                <option value="start">START — 9 900 rub</option>
                <option value="pro">PRO — 17 900 rub</option>
                <option value="vip">VIP — 34 900 rub</option>
              </select>
            </div>

            <div className="mb-5 flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="w-5 h-5 mt-0.5 shrink-0 accent-primary"
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                Я согласен(а) с{' '}
                <Link href="#privacy" className="text-primary underline">
                  политикой конфиденциальности
                </Link>{' '}
                и даю согласие на обработку персональных данных
              </label>
            </div>
            {errors.consent && <span className="text-destructive text-sm mb-4 block">{errors.consent}</span>}
            {errors.submit && <span className="text-destructive text-sm mb-4 block">{errors.submit}</span>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-8 py-4 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all disabled:opacity-50"
            >
              {submitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
