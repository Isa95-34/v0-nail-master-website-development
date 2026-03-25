'use client'

import Modal from './Modal'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Политика конфиденциальности">
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold text-foreground mt-0 mb-3">1. Общие положения</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">2. Сбор информации</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          Мы собираем следующую информацию: имя, контактные данные (телефон, email), данные об использовании сайта.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">3. Использование информации</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          Собранная информация используется для: обработки заявок, связи с пользователями, улучшения качества услуг, отправки информационных материалов (с согласия пользователя).
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">4. Защита данных</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          Мы принимаем все необходимые меры для защиты персональных данных от несанкционированного доступа, изменения или уничтожения.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">5. Права пользователей</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          Вы имеете право: запросить доступ к своим данным, исправить неточности, удалить свои данные, отозвать согласие на обработку.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">6. Контакты</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          По вопросам обработки персональных данных обращайтесь: info@nailmaster-courses.ru
        </p>
      </div>

      <button
        onClick={onClose}
        className="mt-6 inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium rounded-full border-[1.5px] border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
      >
        Закрыть
      </button>
    </Modal>
  )
}
