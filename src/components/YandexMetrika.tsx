'use client';

import { useEffect } from 'react';

// ЗАМЕНИТЕ ЭТОТ ID на ваш реальный ID из Яндекс.Метрики
const YANDEX_METRIKA_ID = 110225343; 

export function YandexMetrika() {
  useEffect(() => {
    // Проверяем, что код выполняется в браузере
    if (typeof window === 'undefined') return;

    // Стандартная функция инициализации Яндекс.Метрики
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    // Инициализация счётчика
    (window as any).ym(YANDEX_METRIKA_ID, "init", {
         clickmap:true,
         trackLinks:true,
         accurateTrackBounce:true,
         webvisor:true
    });

    // Добавляем noscript часть для пользователей без JS (опционально, но рекомендуется)
    const noscriptDiv = document.createElement('div');
    noscriptDiv.innerHTML = `<img src="https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" />`;
    document.body.appendChild(noscriptDiv);

  }, []);

  return null;
}