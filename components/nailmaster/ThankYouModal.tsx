'use client'

import Link from 'next/link'
import Modal from './Modal'
import { Check } from 'lucide-react'

interface ThankYouModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-[#4a9d6e] rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl mb-4">Спасибо за заявку!</h2>
        <p className="text-[17px] mb-8 max-w-[400px] mx-auto">
          Мы получили вашу заявку и свяжемся с вами в течение 24 часов. Проверьте WhatsApp или почту.
        </p>
        <Link
          href="#home"
          onClick={onClose}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all"
        >
          Вернуться на главную
        </Link>
      </div>
    </Modal>
  )
}
