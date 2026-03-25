'use client'

import { useState, FormEvent } from 'react'
import Modal from './Modal'
import { Star } from 'lucide-react'
import type { Review } from './Reviews'

interface ReviewPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReviewPopup({ isOpen, onClose }: ReviewPopupProps) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (name.trim().length < 2 || text.trim().length < 10) {
      alert('Пожалуйста, заполните все поля корректно')
      return
    }

    // Create new review
    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      course: 'Пользователь',
      text: text.trim(),
      rating,
      isUserReview: true,
    }

    // Save to localStorage
    const savedReviews = localStorage.getItem('userReviews')
    const userReviews: Review[] = savedReviews ? JSON.parse(savedReviews) : []
    userReviews.push(newReview)
    localStorage.setItem('userReviews', JSON.stringify(userReviews))

    // Mark that review has been shown
    localStorage.setItem('reviewShown', 'true')

    // Reset form
    setName('')
    setText('')
    setRating(5)

    // Close modal
    onClose()

    // Refresh page to show new review
    window.location.reload()
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

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all"
          >
            Отправить
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
