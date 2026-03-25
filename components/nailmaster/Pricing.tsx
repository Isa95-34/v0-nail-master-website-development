import Link from 'next/link'
import { Check, Minus } from 'lucide-react'

const features = [
  { label: 'Цена', start: '9 900 rub', pro: '17 900 rub', vip: '34 900 rub', isPrice: true },
  { label: 'Видеоуроки', start: '12', pro: '24', vip: '36' },
  { label: 'Домашние задания', start: '6', pro: '12', vip: '18' },
  { label: 'Поддержка куратора', start: false, pro: true, vip: true },
  { label: 'Проверка работ', start: 'Базовая', pro: 'Подробная', vip: 'Расширенная' },
  { label: 'Личные созвоны', start: false, pro: false, vip: '4 созвона' },
  { label: 'Сертификат', start: true, pro: true, vip: true },
  { label: 'Доступ к материалам', start: '30 дней', pro: '60 дней', vip: 'Навсегда' },
]

const mobileCards = [
  {
    name: 'START',
    price: '9 900 rub',
    features: ['12 видеоуроков', '6 домашних заданий', 'Базовая проверка работ', 'Сертификат', 'Доступ 30 дней'],
    isPopular: false,
  },
  {
    name: 'PRO',
    price: '17 900 rub',
    features: ['24 видеоурока', '12 домашних заданий', 'Поддержка куратора', 'Подробная проверка', 'Сертификат', 'Доступ 60 дней'],
    isPopular: true,
  },
  {
    name: 'VIP',
    price: '34 900 rub',
    features: ['36 видеоуроков', '18 домашних заданий', '4 личных созвона', 'Расширенная проверка', 'Сертификат', 'Пожизненный доступ'],
    isPopular: false,
  },
]

function renderValue(value: boolean | string) {
  if (value === true) return <Check className="w-5 h-5 text-primary mx-auto" />
  if (value === false) return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
  return <span>{value}</span>
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-[100px]">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-full mb-4">
            Тарифы
          </span>
          <h2 className="mb-4 text-balance">Сравнение тарифов</h2>
          <p className="text-[17px] max-w-[600px] mx-auto">
            Выберите подходящий формат обучения
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse bg-background rounded-2xl overflow-hidden shadow-md">
            <thead>
              <tr>
                <th className="p-5 text-left bg-muted font-serif text-xl font-semibold">Возможности</th>
                <th className="p-5 text-center bg-muted font-serif text-xl font-semibold">START</th>
                <th className="p-5 text-center bg-primary text-primary-foreground font-serif text-xl font-semibold relative">
                  PRO
                  <span className="block text-[10px] uppercase tracking-wider font-sans font-semibold mt-1">Хит</span>
                </th>
                <th className="p-5 text-center bg-muted font-serif text-xl font-semibold">VIP</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={feature.label} className={index === features.length - 1 ? '' : 'border-b border-border'}>
                  <td className="p-5 text-[15px] text-muted-foreground">{feature.label}</td>
                  <td className={`p-5 text-center text-[15px] ${feature.isPrice ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                    {renderValue(feature.start)}
                  </td>
                  <td className={`p-5 text-center text-[15px] bg-primary/5 ${feature.isPrice ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                    {renderValue(feature.pro)}
                  </td>
                  <td className={`p-5 text-center text-[15px] ${feature.isPrice ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                    {renderValue(feature.vip)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="p-6"></td>
                <td className="p-6 text-center">
                  <Link
                    href="#contacts"
                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full border-[1.5px] border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Выбрать
                  </Link>
                </td>
                <td className="p-6 text-center bg-primary/5">
                  <Link
                    href="#contacts"
                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-[#b8983f] transition-all"
                  >
                    Выбрать
                  </Link>
                </td>
                <td className="p-6 text-center">
                  <Link
                    href="#contacts"
                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full border-[1.5px] border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Выбрать
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-6 md:hidden">
          {mobileCards.map((card) => (
            <div
              key={card.name}
              className={`bg-background border rounded-2xl p-8 text-center relative ${
                card.isPopular ? 'border-primary shadow-md' : 'border-border'
              }`}
            >
              {card.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wide rounded-full">
                  Популярный
                </span>
              )}
              <h3 className="text-2xl mb-2">{card.name}</h3>
              <div className="font-serif text-3xl font-semibold text-primary mb-6">{card.price}</div>
              <ul className="text-left mb-6">
                {card.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 py-2 border-b border-border last:border-0 text-[15px] text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="#contacts"
                className={`inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium rounded-full transition-all ${
                  card.isPopular
                    ? 'bg-primary text-primary-foreground hover:bg-[#b8983f]'
                    : 'border-[1.5px] border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                Выбрать
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
