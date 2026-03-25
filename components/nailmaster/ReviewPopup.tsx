'use client'

import { useState, FormEvent } from 'react'
import Modal from './Modal'
import { Star, CheckCircle } from 'lucide-react'

interface ReviewPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReviewPopup({ isOpen, onClose }: ReviewPopupProps) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [course, setCourse] = useState('general')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (name.trim().length < 2) {
      setError('Пожалуйста, введите ваше имя (минимум 2 символа)')
      return
    }

    if (text.trim().length < 10) {
      setError('Пожалуйста, напишите отзыв (минимум 10 символов)')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          text: text.trim(),
          rating,
          course,
        }),
      })

      if (!res.ok) {
        throw new Error('Ошибка отправки')
      }

      // Mark that review has been shown
      localStorage.setItem('reviewShown', 'true')

      // Show success state
      setSubmitted(true)

      // Close after delay
      setTimeout(() => {
        setSubmitted(false)
        setName('')
        setText('')
        setRating(5)
        setCourse('general')
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Error submitting review:', err)
      setError('Ошибка отправки отзыва. Попробуйте еще раз.')
    }

    setSubmitting(false)
  }

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Спасибо за отзыв!">
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">
            Ваш отзыв отправлен!
          </p>
          <p className="text-muted-foreground">
            После проверки модератором он появится на сайте.
          </p>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Поделитесь своим опытом">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="reviewName" className="block mb-2 text-[15px] font-medium text-foreground">
            Ваше имя
          </label>
          <input
            type="text"
            id="reviewName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите ваше имя"
            className="w-full px-5 py-3.5 text-base border border-border rounded-xl bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="reviewCourse" className="block mb-2 text-[15px] font-medium text-foreground">
            Какой курс проходили?
          </label>
          <select
            id="reviewCourse"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full px-5 py-3.5 text-base border border-border rounded-xl bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="general">Не указывать</option>
            <option value="start">Курс START</option>
            <option value="pro">Курс PRO</option>
            <option value="vip">Курс VIP</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="reviewText" className="block mb-2 text-[15px] font-medium text-foreground">
            Ваш отзыв
          </label>
          <textarea
            id="reviewText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Расскажите о вашем опыте..."
            rows={4}
            className="w-full px-5 py-3.5 text-base border border-border rounded-xl bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-[15px] font-medium text-foreground">
            Оценка
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? 'fill-primary text-primary'
                      : 'fill-none text-border'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-destructive text-sm mb-4">{error}</p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 px-6 py-3 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all disabled:opacity-50"
          >
            {submitting ? 'Отправка...' : 'Отправить'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-base font-medium rounded-full border-[1.5px] border-border text-foreground hover:border-primary hover:text-primary transition-all"
          >
            Закрыть
          </button>
        </div>
      </form>
    </Modal>
  )
}
