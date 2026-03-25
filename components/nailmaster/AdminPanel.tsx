'use client'

import { useState, useEffect, useCallback } from 'react'
import Modal from './Modal'
import { 
  Trash2, Star, AlertTriangle, FileText, BookOpen, 
  Phone, Image as ImageIcon, MessageSquare, Users, Save, Plus, 
  Check, X, Edit2, ChevronDown, LogOut, Upload, Loader2
} from 'lucide-react'
import Image from 'next/image'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Review {
  id: number
  name: string
  text: string
  rating: number
  course: string
  image?: string
  date: string
  approved: boolean
}

interface Application {
  id: number
  name: string
  contact: string
  course: string
  date: string
  status: 'new' | 'contacted' | 'enrolled' | 'rejected'
}

interface Course {
  name: string
  price: string
  old_price: string
  duration: string
  description: string
  features: string[]
  image: string
  popular?: boolean
}

interface DBData {
  content: Record<string, unknown>
  courses: Record<string, Course>
  contacts: Record<string, string>
  images: Record<string, unknown>
  blog: unknown[]
  faq: { question: string; answer: string }[]
  reviews: Review[]
  applications: Application[]
}

type Tab = 'content' | 'courses' | 'contacts' | 'images' | 'reviews' | 'applications'

const ADMIN_PASSWORD = 'admin123'

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('content')
  const [data, setData] = useState<DBData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ADMIN_PASSWORD}`,
  }), [])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/data')
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError('Ошибка загрузки данных')
      console.error(err)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated, loadData])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Неверный пароль')
    }
  }

  const handleClose = () => {
    setIsAuthenticated(false)
    setPassword('')
    setError('')
    setSuccess('')
    onClose()
  }

  const saveData = async (updates: Partial<DBData>) => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/data', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error('Save failed')
      const json = await res.json()
      setData(json.data)
      setSuccess('Сохранено!')
      setTimeout(() => setSuccess(''), 2000)
    } catch (err) {
      setError('Ошибка сохранения')
      console.error(err)
    }
    setSaving(false)
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Контент', icon: <FileText className="w-4 h-4" /> },
    { id: 'courses', label: 'Курсы', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'contacts', label: 'Контакты', icon: <Phone className="w-4 h-4" /> },
    { id: 'images', label: 'Изображения', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'reviews', label: 'Отзывы', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'applications', label: 'Заявки', icon: <Users className="w-4 h-4" /> },
  ]

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
        <div className="min-h-[500px]">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <button
              onClick={handleClose}
              className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-500/10 text-green-600 rounded-lg text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              {success}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : data ? (
            <>
              {activeTab === 'content' && (
                <ContentEditor data={data} onSave={saveData} saving={saving} />
              )}
              {activeTab === 'courses' && (
                <CoursesEditor data={data} onSave={saveData} saving={saving} />
              )}
              {activeTab === 'contacts' && (
                <ContactsEditor data={data} onSave={saveData} saving={saving} />
              )}
              {activeTab === 'images' && (
                <ImagesEditor data={data} onSave={saveData} saving={saving} authHeaders={authHeaders} />
              )}
              {activeTab === 'reviews' && (
                <ReviewsEditor authHeaders={authHeaders} />
              )}
              {activeTab === 'applications' && (
                <ApplicationsEditor authHeaders={authHeaders} />
              )}
            </>
          ) : null}
        </div>
      )}
    </Modal>
  )
}

// Content Editor Component
function ContentEditor({ 
  data, 
  onSave, 
  saving 
}: { 
  data: DBData
  onSave: (updates: Partial<DBData>) => void
  saving: boolean 
}) {
  const [content, setContent] = useState(data.content)

  const handleChange = (key: string, value: string) => {
    setContent({ ...content, [key]: value })
  }

  const handleSave = () => {
    onSave({ content })
  }

  const contentFields = [
    { key: 'hero_title', label: 'Заголовок Hero' },
    { key: 'hero_subtitle', label: 'Подзаголовок Hero' },
    { key: 'about_title', label: 'Заголовок О нас' },
    { key: 'about_text', label: 'Текст О нас', type: 'textarea' },
    { key: 'advantages_title', label: 'Заголовок Преимущества' },
    { key: 'courses_title', label: 'Заголовок Курсы' },
    { key: 'courses_subtitle', label: 'Подзаголовок Курсы' },
    { key: 'reviews_title', label: 'Заголовок Отзывы' },
    { key: 'reviews_subtitle', label: 'Подзаголовок Отзывы' },
    { key: 'gallery_title', label: 'Заголовок Галерея' },
    { key: 'gallery_subtitle', label: 'Подзаголовок Галерея' },
    { key: 'faq_title', label: 'Заголовок FAQ' },
    { key: 'cta_title', label: 'Заголовок CTA' },
    { key: 'cta_subtitle', label: 'Подзаголовок CTA' },
    { key: 'contacts_title', label: 'Заголовок Контакты' },
    { key: 'contacts_subtitle', label: 'Подзаголовок Контакты' },
  ]

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {contentFields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-foreground mb-1">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              value={String(content[field.key] || '')}
              onChange={(e) => handleChange(field.key, e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
            />
          ) : (
            <input
              type="text"
              value={String(content[field.key] || '')}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          )}
        </div>
      ))}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? 'Сохранение...' : 'Сохранить контент'}
      </button>
    </div>
  )
}

// Courses Editor Component
function CoursesEditor({ 
  data, 
  onSave, 
  saving 
}: { 
  data: DBData
  onSave: (updates: Partial<DBData>) => void
  saving: boolean 
}) {
  const [courses, setCourses] = useState(data.courses)
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  const handleCourseChange = (courseKey: string, field: string, value: string | string[] | boolean) => {
    setCourses({
      ...courses,
      [courseKey]: {
        ...courses[courseKey],
        [field]: value,
      },
    })
  }

  const handleFeaturesChange = (courseKey: string, featuresText: string) => {
    const features = featuresText.split('\n').filter(f => f.trim())
    handleCourseChange(courseKey, 'features', features)
  }

  const handleSave = () => {
    onSave({ courses })
  }

  const courseLabels: Record<string, string> = {
    start: 'Курс START',
    pro: 'Курс PRO',
    vip: 'Курс VIP',
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {Object.entries(courses).map(([key, course]) => (
        <div key={key} className="border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setExpandedCourse(expandedCourse === key ? null : key)}
            className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors"
          >
            <span className="font-medium">{courseLabels[key] || key}</span>
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold">{course.price} rub</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedCourse === key ? 'rotate-180' : ''}`} />
            </div>
          </button>
          {expandedCourse === key && (
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Название</label>
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => handleCourseChange(key, 'name', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Длительность</label>
                  <input
                    type="text"
                    value={course.duration}
                    onChange={(e) => handleCourseChange(key, 'duration', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Цена (rub)</label>
                  <input
                    type="text"
                    value={course.price}
                    onChange={(e) => handleCourseChange(key, 'price', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">��тарая цена (rub)</label>
                  <input
                    type="text"
                    value={course.old_price}
                    onChange={(e) => handleCourseChange(key, 'old_price', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Описание</label>
                <input
                  type="text"
                  value={course.description}
                  onChange={(e) => handleCourseChange(key, 'description', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Особенности (по одной на строку)</label>
                <textarea
                  value={course.features.join('\n')}
                  onChange={(e) => handleFeaturesChange(key, e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">URL изображения</label>
                <input
                  type="text"
                  value={course.image}
                  onChange={(e) => handleCourseChange(key, 'image', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? 'Сохранение...' : 'Сохранить курсы'}
      </button>
    </div>
  )
}

// Contacts Editor Component
function ContactsEditor({ 
  data, 
  onSave, 
  saving 
}: { 
  data: DBData
  onSave: (updates: Partial<DBData>) => void
  saving: boolean 
}) {
  const [contacts, setContacts] = useState(data.contacts)

  const handleChange = (key: string, value: string) => {
    setContacts({ ...contacts, [key]: value })
  }

  const handleSave = () => {
    onSave({ contacts })
  }

  const contactFields = [
    { key: 'phone', label: 'Телефон', placeholder: '+7 900 123-45-67' },
    { key: 'email', label: 'Email', placeholder: 'info@example.ru' },
    { key: 'telegram', label: 'Telegram', placeholder: '@username' },
    { key: 'whatsapp', label: 'WhatsApp URL', placeholder: 'https://wa.me/79001234567' },
    { key: 'whatsapp_message', label: 'Сообщение WhatsApp', placeholder: 'Здравствуйте!' },
    { key: 'address', label: 'Адрес', placeholder: 'Москва, ул. Примерная, 1' },
    { key: 'work_hours', label: 'Время работы', placeholder: 'Пн-Пт: 10:00 - 20:00' },
  ]

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {contactFields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-foreground mb-1">
            {field.label}
          </label>
          <input
            type="text"
            value={contacts[field.key] || ''}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
      ))}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? 'Сохранение...' : 'Сохранить контакты'}
      </button>
    </div>
  )
}

// Images Editor Component
function ImagesEditor({ 
  data, 
  onSave, 
  saving,
  authHeaders 
}: { 
  data: DBData
  onSave: (updates: Partial<DBData>) => void
  saving: boolean
  authHeaders: () => Record<string, string>
}) {
  const [images, setImages] = useState(data.images)
  const [uploading, setUploading] = useState(false)
  const [uploadType, setUploadType] = useState<'gallery' | 'hero' | 'about'>('gallery')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', uploadType)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')

      const { url } = await res.json()

      if (uploadType === 'gallery') {
        const gallery = [...(images.gallery as string[] || []), url]
        const newImages = { ...images, gallery }
        setImages(newImages)
        onSave({ images: newImages })
      } else if (uploadType === 'hero') {
        const newImages = { ...images, hero: url }
        setImages(newImages)
        onSave({ images: newImages })
      } else if (uploadType === 'about') {
        const newImages = { ...images, about: url }
        setImages(newImages)
        onSave({ images: newImages })
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Ошибка загрузки изображения')
    }
    setUploading(false)
    e.target.value = ''
  }

  const handleDeleteGalleryImage = async (url: string) => {
    if (!confirm('Удалить изображение?')) return
    
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const gallery = (images.gallery as string[] || []).filter(img => img !== url)
      const newImages = { ...images, gallery }
      setImages(newImages)
      onSave({ images: newImages })
    } catch (err) {
      console.error('Delete error:', err)
      alert('Ошибка удаления')
    }
  }

  const handleImageUrlChange = (type: 'hero' | 'about', url: string) => {
    const newImages = { ...images, [type]: url }
    setImages(newImages)
  }

  const handleSaveUrls = () => {
    onSave({ images })
  }

  const galleryImages = images.gallery as string[] || []

  return (
    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
      {/* Hero & About Images */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">Основные изображения</h4>
        
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Hero изображение</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={(images.hero as string) || ''}
              onChange={(e) => handleImageUrlChange('hero', e.target.value)}
              placeholder="/images/hero.jpg"
              className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
            <label className="px-3 py-2 text-sm font-medium rounded-lg bg-muted hover:bg-muted/80 cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { setUploadType('hero'); handleUpload(e); }} />
            </label>
          </div>
          {images.hero && (
            <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden bg-muted">
              <Image src={images.hero as string} alt="Hero" width={128} height={80} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">О нас изображение</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={(images.about as string) || ''}
              onChange={(e) => handleImageUrlChange('about', e.target.value)}
              placeholder="/images/about.jpg"
              className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
            <label className="px-3 py-2 text-sm font-medium rounded-lg bg-muted hover:bg-muted/80 cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { setUploadType('about'); handleUpload(e); }} />
            </label>
          </div>
          {images.about && (
            <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden bg-muted">
              <Image src={images.about as string} alt="About" width={128} height={80} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <button
          onClick={handleSaveUrls}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Сохранение...' : 'Сохранить URL'}
        </button>
      </div>

      {/* Gallery */}
      <div className="space-y-4 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Галерея работ ({galleryImages.length})</h4>
          <label className={`px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-[#b8983f] cursor-pointer flex items-center gap-2 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Добавить
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { setUploadType('gallery'); handleUpload(e); }} disabled={uploading} />
          </label>
        </div>

        {galleryImages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Нет изображений в галерее</p>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {galleryImages.map((url, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
                <Image src={url} alt={`Gallery ${index + 1}`} fill className="object-cover" />
                <button
                  onClick={() => handleDeleteGalleryImage(url)}
                  className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Reviews Editor Component
function ReviewsEditor({ authHeaders }: { authHeaders: () => Record<string, string> }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const loadReviews = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/reviews?all=true', { headers: authHeaders() })
      const json = await res.json()
      setReviews(json)
    } catch (err) {
      console.error('Error loading reviews:', err)
    }
    setLoading(false)
  }, [authHeaders])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  const handleApprove = async (id: number, approved: boolean) => {
    try {
      await fetch('/api/reviews', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ id, approved }),
      })
      loadReviews()
    } catch (err) {
      console.error('Error updating review:', err)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить отзыв?')) return
    try {
      await fetch(`/api/reviews?id=${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      loadReviews()
    } catch (err) {
      console.error('Error deleting review:', err)
    }
  }

  const handleEdit = (review: Review) => {
    setEditingId(review.id)
    setEditText(review.text)
  }

  const handleSaveEdit = async (id: number) => {
    try {
      await fetch('/api/reviews', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ id, text: editText }),
      })
      setEditingId(null)
      loadReviews()
    } catch (err) {
      console.error('Error updating review:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  const pendingReviews = reviews.filter(r => !r.approved)
  const approvedReviews = reviews.filter(r => r.approved)

  return (
    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            На модерации ({pendingReviews.length})
          </h4>
          <div className="space-y-3">
            {pendingReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                editingId={editingId}
                editText={editText}
                setEditText={setEditText}
                onApprove={handleApprove}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={() => setEditingId(null)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Approved Reviews */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" />
          Одобренные ({approvedReviews.length})
        </h4>
        {approvedReviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">Нет одобренных отзывов</p>
        ) : (
          <div className="space-y-3">
            {approvedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                editingId={editingId}
                editText={editText}
                setEditText={setEditText}
                onApprove={handleApprove}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={() => setEditingId(null)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ReviewCard({
  review,
  editingId,
  editText,
  setEditText,
  onApprove,
  onDelete,
  onEdit,
  onSaveEdit,
  onCancelEdit,
}: {
  review: Review
  editingId: number | null
  editText: string
  setEditText: (text: string) => void
  onApprove: (id: number, approved: boolean) => void
  onDelete: (id: number) => void
  onEdit: (review: Review) => void
  onSaveEdit: (id: number) => void
  onCancelEdit: () => void
}) {
  const isEditing = editingId === review.id

  return (
    <div className={`p-4 rounded-xl border ${review.approved ? 'bg-background border-border' : 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{review.name}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${star <= review.rating ? 'fill-primary text-primary' : 'fill-none text-border'}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary resize-none"
            />
          ) : (
            <p className="text-sm text-muted-foreground">{review.text}</p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={() => onSaveEdit(review.id)}
                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={onCancelEdit}
                className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {!review.approved && (
                <button
                  onClick={() => onApprove(review.id, true)}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  title="Одобрить"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
              {review.approved && (
                <button
                  onClick={() => onApprove(review.id, false)}
                  className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                  title="Снять одобрение"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onEdit(review)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                title="Редактировать"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(review.id)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                title="Удалить"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Applications Editor Component
function ApplicationsEditor({ authHeaders }: { authHeaders: () => Record<string, string> }) {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  const loadApplications = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/applications', { headers: authHeaders() })
      const json = await res.json()
      setApplications(json)
    } catch (err) {
      console.error('Error loading applications:', err)
    }
    setLoading(false)
  }, [authHeaders])

  useEffect(() => {
    loadApplications()
  }, [loadApplications])

  const handleStatusChange = async (id: number, status: Application['status']) => {
    try {
      await fetch('/api/applications', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ id, status }),
      })
      loadApplications()
    } catch (err) {
      console.error('Error updating application:', err)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить заявку?')) return
    try {
      await fetch(`/api/applications?id=${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      loadApplications()
    } catch (err) {
      console.error('Error deleting application:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  const filteredApps = filter === 'all' 
    ? applications 
    : applications.filter(a => a.course === filter || a.status === filter)

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    contacted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    enrolled: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  const statusLabels: Record<string, string> = {
    new: 'Новая',
    contacted: 'Связались',
    enrolled: 'Записан',
    rejected: 'Отклонена',
  }

  const courseLabels: Record<string, string> = {
    start: 'START',
    pro: 'PRO',
    vip: 'VIP',
    not_specified: 'Не указан',
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'new', 'contacted', 'enrolled', 'rejected'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              filter === f
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {f === 'all' ? 'Все' : statusLabels[f] || f}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
        {filteredApps.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Заявок не найдено</p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div key={app.id} className="p-4 bg-muted rounded-xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{app.name}</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[app.status]}`}>
                      {statusLabels[app.status]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{app.contact}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Курс: {courseLabels[app.course] || app.course}</span>
                    <span>{app.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value as Application['status'])}
                    className="px-2 py-1 text-xs border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                  >
                    <option value="new">Новая</option>
                    <option value="contacted">Связались</option>
                    <option value="enrolled">Записан</option>
                    <option value="rejected">Отклонена</option>
                  </select>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="pt-3 border-t border-border text-sm text-muted-foreground">
        Всего заявок: {applications.length} | 
        Новых: {applications.filter(a => a.status === 'new').length} | 
        Записано: {applications.filter(a => a.status === 'enrolled').length}
      </div>
    </div>
  )
}
