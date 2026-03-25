'use client'

import Modal from './Modal'

interface OfferModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OfferModal({ isOpen, onClose }: OfferModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Договор оферты">
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold text-foreground mt-0 mb-3">1. Предмет договора</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          Исполнитель обязуется предоставить Заказчику доступ к онлайн-курсу по маникюру в соответствии с выбранным тарифом.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">2. Порядок оказания услуг</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          После оплаты Заказчик получает доступ к личному кабинету с видеоуроками в течение 24 часов. Доступ предоставляется на срок, указанный в описании тарифа.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">3. Стоимость и порядок оплаты</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          Стоимость услуг определяется выбранным тарифом. Оплата производится на сайте или по реквизитам, предоставленным менеджером. Возможна оплата в рассрочку.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">4. Права и обязанности сторон</h3>
        <p className="text-[15px] leading-relaxed mb-2">
          Исполнитель обязуется: предоставить качественный контент, обеспечить техническую поддержку, проверять домашние задания (в соответствии с тарифом).
        </p>
        <p className="text-[15px] leading-relaxed mb-4">
          Заказчик обязуется: своевременно оплатить услуги, соблюдать авторские права, не распространять материалы третьим лицам.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">5. Возврат средств</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          Возврат возможен в течение 14 дней с момента оплаты, если Заказчик не прошёл более 30% курса.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">6. Ответственность</h3>
        <p className="text-[15px] leading-relaxed mb-4">
          Стороны несут ответственность в соответствии с законодательством РФ.
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
