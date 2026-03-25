import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NailMaster — курсы маникюра | Онлайн-школа маникюра',
  description: 'Онлайн-курсы по маникюру — станьте профессиональным мастером за 4 недели. Обучение с нуля до профи. 500+ выпускников, 98% довольных учениц.',
  keywords: 'маникюр, курсы маникюра, обучение маникюру, онлайн курсы, nail master, школа маникюра',
  authors: [{ name: 'NailMaster' }],
  openGraph: {
    title: 'NailMaster — курсы маникюра',
    description: 'Онлайн-курсы по маникюру — станьте профессиональным мастером за 4 недели.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c9a962',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
