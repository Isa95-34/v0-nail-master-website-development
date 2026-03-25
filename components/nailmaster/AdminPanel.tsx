'use client'

import { useState, useEffect } from 'react'
import Modal from './Modal'
import { Trash2, Star, AlertTriangle } from 'lucide-react'
import type { Review } from './Reviews'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const ADMIN_PASSWORD = 'admin123' // Simple password for demo

  useEffect(() => {
    if (isAuthenticated) {
      loadReviews()
    }
  }, [isAuthenticated])

  const loadReviews = () => {
    const savedReviews = localStorage.getItem('userReviews')
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Неверный пароль')
    }
  }

  const handleDeleteReview = (id: string) => {
    const updatedReviews = reviews.filter((r) => r.id !== id)
    setReviews(updatedReviews)
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews))
  }

  const handleClearAll = () => {
    if (confirm('Вы уверены, что хотите удалить все отзывы?')) {
      setReviews([])
      localStorage.setItem('userReviews', JSON.stringify([]))
    }
  }

  const handleClose = () => {
    setIsAuthenticated(false)
    setPassword('')
    setError('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Админ-панель">
      {!isAuthenticated ? (
        <div className="max-w-[300px] mx-auto py-8">
          <p className="text-center text-muted-foreground mb-6">
            Введите пароль для доступа к админ-панели
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-5 py-3.5 text-base border border-border rounded-xl bg-background mb-4 transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          {error && (
            <p className="text-destructive text-sm mb-4 text-center">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full px-6 py-3 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all"
          >
            Войти
          </button>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Пароль для демо: admin123
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Пользовательские отзывы ({reviews.length})</h3>
            {reviews.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Очистить все
              </button>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Пользовательских отзывов пока нет</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 bg-muted rounded-xl flex items-start gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">{review.name}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= review.rating
                                ? 'fill-primary text-primary'
                                : 'fill-none text-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors shrink-0"
                    aria-label="Удалить отзыв"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
