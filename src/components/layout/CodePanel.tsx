'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useButtonStore } from '@/store/buttonStore';
import { generateButtonCode } from '@/lib/codeGenerator';
import { Copy, Check, Code2, Braces, Globe } from 'lucide-react';

// ЗАМЕНИТЕ ЭТОТ ID на ваш реальный ID из Яндекс.Метрики
const YANDEX_METRIKA_ID = 110225343;

type CodeFormat = 'reactTs' | 'tailwind' | 'htmlCss';

const formatLabels: Record<CodeFormat, string> = {
  reactTs: 'React + TS',
  tailwind: 'Tailwind',
  htmlCss: 'HTML/CSS',
};

const formatIcons: Record<CodeFormat, React.ComponentType<{ className?: string }>> = {
  reactTs: Code2,
  tailwind: Braces,
  htmlCss: Globe,
};

const formatLanguages: Record<CodeFormat, string> = {
  reactTs: 'tsx',
  tailwind: 'tsx',
  htmlCss: 'html',
};

export function CodePanel() {
  const { config } = useButtonStore();
  const [copied, setCopied] = useState(false);
  const [activeFormat, setActiveFormat] = useState<CodeFormat>('reactTs');

  const generatedCode = generateButtonCode(config);
  const code = generatedCode[activeFormat];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      
      // Трекинг успешного копирования
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(YANDEX_METRIKA_ID, 'reachGoal', 'code_copied', {
          format: activeFormat,
          timestamp: Date.now()
        });
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      
      // Трекинг ошибки
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(YANDEX_METRIKA_ID, 'reachGoal', 'copy_failed');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#3d3550]">
      {/* Табы переключения */}
      <div className="flex gap-1 p-3 border-b border-[#5E4A82]/50 bg-[#4B4257]">
        {(Object.keys(formatLabels) as CodeFormat[]).map((format) => {
          const Icon = formatIcons[format];
          const isActive = activeFormat === format;
          
          return (
            <button
              key={format}
              onClick={() => setActiveFormat(format)}
              className={`flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 border-2 ${
                isActive
                  ? 'bg-[#7BA488] text-white border-[#7BA488] shadow-lg shadow-[#7BA488]/30 scale-105'
                  : 'bg-[#5E4A82]/50 text-[#E6E6FA] border-transparent hover:bg-[#5E4A82] hover:border-[#5E4A82]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {formatLabels[format]}
            </button>
          );
        })}
      </div>

      {/* Кнопка копирования */}
      <div className="flex justify-end p-3 border-b border-[#5E4A82]/50 bg-[#4B4257]/50">
        <button
          onClick={handleCopy}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
            copied
              ? 'bg-[#7BA488] text-white shadow-lg shadow-[#7BA488]/30'
              : 'bg-[#5E4A82] hover:bg-[#7BA488] text-white border border-[#5E4A82] hover:border-[#7BA488]'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Скопировано!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Копировать
            </>
          )}
        </button>
      </div>

      {/* Блок с кодом */}
      <div className="flex-1 overflow-y-auto bg-[#3d3550]">
        <SyntaxHighlighter
          language={formatLanguages[activeFormat]}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.8125rem',
            lineHeight: '1.6',
            background: '#3d3550',
            minHeight: '100%',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: '#7a7090',
            paddingRight: '1rem',
            minWidth: '2.5rem',
            fontSize: '0.75rem',
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}