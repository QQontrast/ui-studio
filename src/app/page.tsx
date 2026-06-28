// src/app/page.tsx
'use client';

import { useState } from 'react';
import { SettingsPanel } from '@/components/layout/SettingsPanel';
import { ButtonPreview } from '@/components/ui/ButtonPreview';
import { CodePanel } from '@/components/layout/CodePanel';
import { YandexMetrika } from '@/components/YandexMetrika';
import { Sparkles, Coffee, MessageCircle } from 'lucide-react';

// ЗАМЕНИТЕ ЭТОТ ID на ваш реальный ID из Яндекс.Метрики
const YANDEX_METRIKA_ID = 110225343; 

export default function Home() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleFeedbackClick = () => {
    setIsFeedbackOpen(true);
    
    // Трекинг открытия формы
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(YANDEX_METRIKA_ID, 'reachGoal', 'feedback_opened');
    }
  };

  return (
    <main className="h-screen bg-[#F3F1F5] flex flex-col overflow-hidden">
      
      {/* Подключение Метрики */}
      <YandexMetrika />

      {/* ✨ Хедер с кнопками действий */}
      <header className="flex-shrink-0 h-16 border-b border-white/20 bg-white/50 backdrop-blur-2xl z-40 animate-in fade-in slide-in-from-top duration-700">
        <div className="px-6 h-full flex items-center justify-between max-w-[1920px] mx-auto w-full">
          
          {/* Логотип + название */}
          <div className="flex items-center gap-4 group cursor-default">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#5E4A82] via-[#7BA488] to-[#5E4A82] rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition duration-700 animate-pulse" />
              
              <Sparkles className="relative z-10 w-5 h-5 text-[#5E4A82] group-hover:text-[#7BA488] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-base font-bold tracking-tight leading-none relative overflow-hidden">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4B4257] via-[#5E4A82] to-[#4B4257] bg-[length:200%_auto] animate-shimmer">
                  Студия кнопок
                </span>
              </h1>
              <p className="text-[10px] text-[#7a7090]/80 font-medium mt-0.5 tracking-[0.2em] uppercase">
                UI Генератор
              </p>
            </div>
          </div>

          {/* Правая часть хедера: Индикаторы + Кнопки действий */}
          <div className="flex items-center gap-4">
            
            {/* Группа кнопок действий */}
            <div className="flex items-center gap-2">
              {/* Кнопка поддержки */}
              <a
                href="https://pay.cloudtips.ru/p/ebecfa10"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#5E4A82]/10 to-[#7BA488]/10 hover:from-[#5E4A82]/20 hover:to-[#7BA488]/20 border border-[#5E4A82]/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(94,74,130,0.2)]"
              >
                <Coffee className="w-3.5 h-3.5 text-[#5E4A82] group-hover:text-[#7BA488] transition-colors" />
                {/* Убрали hidden sm:inline, теперь текст виден всегда */}
                <span className="text-[10px] font-bold text-[#5E4A82] uppercase tracking-wider group-hover:text-[#7BA488] whitespace-nowrap">
                  Поддержать
                </span>
              </a>

              {/* Кнопка обратной связи */}
              <button
                onClick={handleFeedbackClick}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7BA488]/10 hover:bg-[#7BA488]/20 border border-[#7BA488]/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(123,164,136,0.2)]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#7BA488]" />
                {/* Убрали hidden sm:inline, теперь текст виден всегда */}
                <span className="text-[10px] font-bold text-[#7BA488] uppercase tracking-wider whitespace-nowrap">
                  Обратная связь
                </span>
              </button>
            </div>

            {/* Разделитель */}
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

            {/* Индикаторы статуса и версии */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7BA488] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7BA488] shadow-[0_0_6px_#7BA488]" />
                </span>
                <span className="text-[10px] font-bold text-[#5E4A82] uppercase tracking-widest">Ready</span>
              </div>
              <div className="px-2.5 py-1 bg-white/80 border border-[#E6E6FA] text-[#7a7090] rounded-md text-[10px] font-bold font-mono shadow-sm backdrop-blur-sm hover:bg-white transition-colors">
                v1.0 developed by QQontrast 
              </div>
            </div>
          </div>
          
        </div>
      </header>

      {/* 📐 СЕТКА: 35% / 30% / 35% */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* Левая панель: Настройки */}
        <aside className="w-[35%] min-w-[380px] bg-white flex flex-col border-r border-gray-100 shadow-[2px_0_20px_-5px_rgba(0,0,0,0.03)] z-30 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
          <div className="p-4 flex-shrink-0 bg-gradient-to-r from-[#E6E6FA]/30 to-transparent border-b border-gray-50">
            <h2 className="text-xs font-bold text-[#5E4A82] uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#5E4A82] rounded-full shadow-[0_0_8px_rgba(94,74,130,0.5)]"></span>
              Настройки
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 min-h-0 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
            <SettingsPanel />
          </div>
        </aside>

        {/* Центр: Превью */}
        <section className="flex-1 bg-[#F3F1F5] relative flex flex-col min-w-[300px] animate-in fade-in zoom-in-95 duration-700 delay-200">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#5E4A82]/5 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7BA488]/5 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />

          <div className="p-4 flex-shrink-0 flex items-center justify-between z-10">
            <h2 className="text-xs font-bold text-[#7a7090] uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#7BA488] rounded-full shadow-[0_0_8px_rgba(123,164,136,0.5)]"></span>
              Превью
            </h2>
          </div>
          
          <div className="flex-1 p-8 flex items-center justify-center min-h-0 z-10">
            <ButtonPreview />
          </div>
        </section>

        {/* Правая панель: Код */}
        <aside className="w-[35%] min-w-[380px] bg-[#1E1B24] flex flex-col border-l border-white/5 shadow-[-2px_0_20px_-5px_rgba(0,0,0,0.3)] z-30 animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
          <div className="p-4 flex-shrink-0 bg-gradient-to-r from-[#2A2632] to-[#1E1B24] border-b border-white/5">
            <h2 
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-3"
              style={{ color: '#FFFFFF', paddingLeft: '3px'}}
            >
              Сгенерированный код
            </h2>
          </div>
          <div className="flex-1 overflow-hidden relative min-h-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5E4A82]/50 to-transparent" />
            <CodePanel />
          </div>
        </aside>

      </div>

                                          {/* Модальное окно обратной связи (СПРАВА, 40%, полупрозрачный фон) */}
      {isFeedbackOpen && (
        <>
          {/* Затемненный оверлей на весь экран */}
          <div 
            className="fixed inset-0 z-[200] bg-black/30"
            onClick={() => setIsFeedbackOpen(false)}
          />
          
          {/* Панель справа: ЖЕСТКОЕ позиционирование + полупрозрачный белый фон */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: '40%',
              minWidth: '350px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)', // Для Safari
              zIndex: 300,
              borderLeft: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.1)'
            }}
            className="animate-in slide-in-from-right duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок панели */}
            <div className="p-6 border-b border-white/30 bg-gradient-to-r from-[#E6E6FA]/40 to-transparent flex-shrink-0 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#5E4A82] flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Обратная связь
                </h3>
                <p className="text-xs text-[#7a7090] mt-1">
                  Ваше мнение важно для нас
                </p>
              </div>
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/60 transition-colors text-[#7a7090] hover:text-[#5E4A82]"
              >
                ✕
              </button>
            </div>

            {/* Google Form iframe */}
            <div className="flex-1 p-6 overflow-y-auto">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSe2X37bGDSkeWT5WecsXaP2U3w9Kj75WrdGc9WxF2KMH6lGMA/viewform?embedded=true" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                className="min-h-[500px] rounded-lg"
              >
                Загрузка формы...
              </iframe>
            </div>
          </div>
        </>
      )}
      
    </main>
  );
}