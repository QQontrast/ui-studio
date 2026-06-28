'use client';

import { useState } from 'react';
import { Coffee, MessageCircle, Heart } from 'lucide-react'; // Заменили Github на Heart

// ЗАМЕНИТЕ ЭТОТ ID на ваш реальный ID из Яндекс.Метрики после регистрации
//const YANDEX_METRIKA_ID = 00000000; 

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFeedbackClick = () => {
    setIsModalOpen(true);
    
    // Трекинг открытия формы
    if (typeof window !== 'undefined' && (window as any).ym) {
      //(window as any).ym(YANDEX_METRIKA_ID, 'reachGoal', 'feedback_opened');
    }
  };

  return (
    <>
      {/* Футер */}
      <footer className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-t border-white/20 py-3 px-6 z-50">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          
          {/* Левая часть - копирайт */}
          <div className="text-[10px] text-[#7a7090]/70 font-medium select-none">
            © 2026 Студия кнопок • developed by QQontrast
          </div>

          {/* Правая часть - кнопки действий */}
          <div className="flex items-center gap-3">
            
            {/* Кнопка поддержки */}
            <a
              href="https://pay.cloudtips.ru/p/ebecfa10"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#5E4A82]/10 to-[#7BA488]/10 hover:from-[#5E4A82]/20 hover:to-[#7BA488]/20 border border-[#5E4A82]/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(94,74,130,0.2)]"
            >
              <Coffee className="w-3.5 h-3.5 text-[#5E4A82] group-hover:text-[#7BA488] transition-colors" />
              <span className="text-[10px] font-bold text-[#5E4A82] uppercase tracking-wider group-hover:text-[#7BA488] hidden sm:inline">
                Поддержать
              </span>
            </a>

            {/* Кнопка обратной связи */}
            <button
              onClick={handleFeedbackClick}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#7BA488]/10 hover:bg-[#7BA488]/20 border border-[#7BA488]/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(123,164,136,0.2)]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#7BA488]" />
              <span className="text-[10px] font-bold text-[#7BA488] uppercase tracking-wider hidden sm:inline">
                Обратная связь
              </span>
            </button>
          </div>
        </div>
      </footer>

      {/* Модальное окно обратной связи */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-[90%] max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок модалки */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#E6E6FA]/30 to-transparent flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#5E4A82] flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Обратная связь
                  </h3>
                  <p className="text-xs text-[#7a7090] mt-1">
                    Помогите нам стать лучше!
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[#7a7090] hover:text-[#5E4A82]"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Google Form iframe */}
            <div className="p-0 flex-1 bg-gray-50">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSe2X37bGDSkeWT5WecsXaP2U3w9Kj75WrdGc9WxF2KMH6lGMA/viewform?embedded=true" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                className="min-h-[500px]"
              >
                Загрузка формы...
              </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}