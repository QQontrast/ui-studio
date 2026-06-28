// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Студия кнопок | Бесплатный генератор CSS компонентов',
  description: 'Создавайте красивые кнопки и UI элементы с предпросмотром в реальном времени. Копируйте готовый код для React и HTML/CSS. Бесплатный инструмент для разработчиков.',
  keywords: ['CSS генератор', 'button generator', 'UI компоненты', 'React components', 'HTML CSS', 'glassmorphism', 'neumorphism', 'генератор кнопок'],
  authors: [{ name: 'QQontrast' }],
  openGraph: {
    title: 'Студия кнопок | Генератор CSS компонентов',
    description: 'Бесплатный онлайн инструмент для создания красивых UI элементов',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Студия кнопок',
    description: 'Генератор CSS компонентов для разработчиков',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}