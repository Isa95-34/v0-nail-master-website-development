import Link from 'next/link'

const navLinks = [
  { href: '#home', label: 'Главная' },
  { href: '#about', label: 'О нас' },
  { href: '#courses', label: 'Курсы' },
  { href: '#pricing', label: 'Цены' },
]

const infoLinks = [
  { href: '#reviews', label: 'Отзывы' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#blog', label: 'Блог' },
  { href: '#contacts', label: 'Контакты' },
]

interface FooterProps {
  onPrivacyClick: () => void
  onOfferClick: () => void
}

export default function Footer({ onPrivacyClick, onOfferClick }: FooterProps) {
  return (
    <footer className="bg-foreground text-white pt-[60px]">
      <div className="container mx-auto px-5 md:px-10">
        <div className="grid gap-10 pb-10 border-b border-white/10 md:grid-cols-[1.5fr_2fr_1fr] md:gap-[60px]">
          {/* Brand */}
          <div>
            <Link href="#home" className="flex items-center gap-2 font-serif text-2xl font-semibold text-white mb-4">
              <span className="text-3xl">💅</span>
              <span>NailMaster</span>
            </Link>
            <p className="text-[15px] text-white/60 max-w-[280px]">
              Онлайн-школа маникюра. Обучаем профессии мастера маникюра с нуля.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-white text-base font-semibold mb-5">Навигация</h4>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[15px] text-white/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-white text-base font-semibold mb-5">Информация</h4>
              <nav className="flex flex-col gap-3">
                {infoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[15px] text-white/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-white text-base font-semibold mb-5">Документы</h4>
              <nav className="flex flex-col gap-3">
                <button
                  onClick={onPrivacyClick}
                  className="text-[15px] text-white/60 hover:text-primary transition-colors text-left"
                >
                  Политика конфиденциальности
                </button>
                <button
                  onClick={onOfferClick}
                  className="text-[15px] text-white/60 hover:text-primary transition-colors text-left"
                >
                  Договор оферты
                </button>
              </nav>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white text-base font-semibold mb-5">Контакты</h4>
            <a
              href="https://wa.me/79001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[15px] text-white/60 hover:text-primary transition-colors mb-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://t.me/nailmaster_courses"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[15px] text-white/60 hover:text-primary transition-colors mb-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
              Telegram
            </a>
            <a
              href="mailto:info@nailmaster-courses.ru"
              className="flex items-center gap-2.5 text-[15px] text-white/60 hover:text-primary transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-wrap justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; 2025 NailMaster. Все права защищены.
          </p>
          <p className="text-sm text-white/40 italic">
            Некоторые изображения сгенерированы ИИ
          </p>
        </div>
      </div>
    </footer>
  )
}
