'use client';

import { useEffect } from 'react';

// ЗАМЕНИТЕ ЭТОТ ID на ваш реальный ID из Яндекс.Метрики
const YANDEX_METRIKA_ID = 110225343; 

export function YandexMetrika() {
  useEffect(() => {
    // Проверяем, что код выполняется в браузере
    if (typeof window === 'undefined') return;

    // Стандартная функция инициализации Яндекс.Метрики
    (function(m: any, e: any, t: any, r: any, i: any) {
        m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments); };
        
        // Исправлено: используем Date.now() вместо 1 * new Date()
        m[i].l = Date.now(); 
        
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) { return; }
        }
        
        var k = e.createElement(t);
        var a = e.getElementsByTagName(t)[0];
        
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    // Инициализация счётчика
    (window as any).ym(YANDEX_METRIKA_ID, "init", {
         clickmap: true,
         trackLinks: true,
         accurateTrackBounce: true,
         webvisor: true
    });

  }, []);

  return null;
}