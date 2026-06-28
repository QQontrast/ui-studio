// src/components/layout/SettingsPanel.tsx
'use client';

import { useButtonStore } from '@/store/buttonStore';
import { PresetsList } from '@/components/ui/PresetsList';
import { Slider } from '@/components/ui/Slider';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { TextInput } from '@/components/ui/TextInput';
import { Accordion } from '@/components/ui/Accordion';
import { IconPicker } from '@/components/ui/IconPicker';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { 
  Settings, 
  Square, 
  Palette, 
  Circle, 
  Play, 
  Sparkles,
  Box,
  Move,
  Layers,
  RotateCcw,
  MousePointer,
  Wand2
} from 'lucide-react';

export function SettingsPanel() {
  const { config, updateConfig } = useButtonStore();

  return (
    <div className="px-[16px]">
      
      {/* Пресеты */}
      <div className="mb-[40px]">
        <h3 className="text-[13px] font-bold text-[#5E4A82] uppercase tracking-wider mb-[20px] flex items-center gap-[8px]">
          <span className="w-[8px] h-[8px] bg-[#7BA488] rounded-full"></span>
          Шаблоны
        </h3>
        <PresetsList />
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d8d4e0] to-transparent mb-[40px]"></div>

      {/* Основные */}
      <Accordion
        title="Основные"
        defaultOpen={true}
        color="bg-gradient-to-br from-[#5E4A82]/20 to-[#7BA488]/20"
        icon={<Settings className="w-[18px] h-[18px] text-[#5E4A82]" />}
      >
        <div className="space-y-[20px]">
          <div className="rounded-[10px] p-[4px]">
            <TextInput label="Текст кнопки" value={config.text} onChange={(value) => updateConfig({ text: value })} placeholder="Click Me" />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <ColorPicker label="Цвет фона" value={config.bgColor} onChange={(value) => updateConfig({ bgColor: value })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <ColorPicker label="Цвет текста" value={config.textColor} onChange={(value) => updateConfig({ textColor: value })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Slider label="Радиус скругления" value={config.borderRadius} min={0} max={50} unit="px" onChange={(value) => updateConfig({ borderRadius: value })} />
          </div>
        </div>
      </Accordion>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d8d4e0] to-transparent my-[40px]"></div>

      {/* Размеры */}
      <Accordion
        title="Размеры"
        color="bg-gradient-to-br from-[#7BA488]/20 to-[#5E4A82]/20"
        icon={<Box className="w-[18px] h-[18px] text-[#7BA488]" />}
      >
        <div className="space-y-[20px]">
          <div className="rounded-[10px] p-[4px]">
            <Select label="Пресет размера" value={config.size} options={[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
              { value: 'xl', label: 'XL' },
            ]} onChange={(value) => updateConfig({ size: value as any })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Slider label="Padding X" value={config.customPaddingX} min={8} max={64} unit="px" onChange={(value) => updateConfig({ customPaddingX: value })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Slider label="Padding Y" value={config.customPaddingY} min={4} max={32} unit="px" onChange={(value) => updateConfig({ customPaddingY: value })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Slider label="Размер шрифта" value={config.customFontSize} min={12} max={32} unit="px" onChange={(value) => updateConfig({ customFontSize: value })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Select label="Ширина" value={config.width} options={[
              { value: 'auto', label: 'Auto' },
              { value: 'full', label: 'Full Width' },
              { value: 'custom', label: 'Custom' },
            ]} onChange={(value) => updateConfig({ width: value as any })} />
          </div>
          {config.width === 'custom' && (
            <div className="rounded-[10px] p-[4px]">
              <Slider label="Ширина (px)" value={config.customWidth} min={100} max={600} unit="px" onChange={(value) => updateConfig({ customWidth: value })} />
            </div>
          )}
        </div>
      </Accordion>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d8d4e0] to-transparent my-[40px]"></div>

      {/* Иконки */}
      <Accordion
        title="Иконки"
        color="bg-gradient-to-br from-[#5E4A82]/20 to-[#7BA488]/20"
        icon={<MousePointer className="w-[18px] h-[18px] text-[#5E4A82]" />}
      >
        <div className="space-y-[20px]">
          <div className="rounded-[10px] p-[4px]">
            <IconPicker value={config.icon} onChange={(value) => updateConfig({ icon: value })} />
          </div>
          {config.icon && (
            <>
              <div className="rounded-[10px] p-[4px]">
                <Select label="Позиция иконки" value={config.iconPosition} options={[
                  { value: 'left', label: 'Слева' },
                  { value: 'right', label: 'Справа' },
                ]} onChange={(value) => updateConfig({ iconPosition: value as any })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <Slider label="Размер иконки" value={config.iconSize} min={12} max={32} unit="px" onChange={(value) => updateConfig({ iconSize: value })} />
              </div>
            </>
          )}
        </div>
      </Accordion>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d8d4e0] to-transparent my-[40px]"></div>

      {/* Границы */}
<Accordion
  title="Границы"
  color="bg-gradient-to-br from-[#7BA488]/20 to-[#5E4A82]/20"
  icon={<Square className="w-[18px] h-[18px] text-[#7BA488]" />}
>
  <div className="space-y-[20px]">
    <div className="rounded-[10px] p-[4px]">
      <Slider label="Толщина границы" value={config.borderWidth} min={0} max={10} unit="px" onChange={(value) => updateConfig({ borderWidth: value })} />
    </div>
    <div className="rounded-[10px] p-[4px]">
      <ColorPicker label="Цвет границы" value={config.borderColor} onChange={(value) => updateConfig({ borderColor: value })} />
    </div>
    
    {/* Градиентная граница */}
    <div className="rounded-[10px] p-[4px]">
      <Toggle label="Градиентная граница" checked={config.gradientBorder} onChange={(checked) => updateConfig({ gradientBorder: checked })} description="Градиент вместо сплошного цвета" />
    </div>
    
    {config.gradientBorder && (
      <>
        <div className="rounded-[10px] p-[4px]">
          <Slider label="Угол градиента" value={config.gradientBorderAngle} min={0} max={360} unit="°" onChange={(value) => updateConfig({ gradientBorderAngle: value })} />
        </div>
        <div className="rounded-[10px] p-[4px]">
          <ColorPicker label="Цвет 1" value={config.gradientBorderColor1} onChange={(value) => updateConfig({ gradientBorderColor1: value })} />
        </div>
        <div className="rounded-[10px] p-[4px]">
          <ColorPicker label="Цвет 2" value={config.gradientBorderColor2} onChange={(value) => updateConfig({ gradientBorderColor2: value })} />
        </div>
        <div className="rounded-[10px] p-[4px]">
          <ColorPicker label="Цвет 3 (опционально)" value={config.gradientBorderColor3 || '#ffffff'} onChange={(value) => updateConfig({ gradientBorderColor3: value === '#ffffff' ? '' : value })} />
        </div>
      </>
    )}
    
    {/* Анимированная граница */}
    <div className="rounded-[10px] p-[4px]">
      <Toggle label="Анимированная граница" checked={config.animatedBorder} onChange={(checked) => updateConfig({ animatedBorder: checked })} description="Вращение градиента" />
    </div>
    {config.animatedBorder && (
      <div className="rounded-[10px] p-[4px]">
        <Slider label="Скорость анимации" value={config.borderAnimationSpeed} min={1} max={10} unit="s" step={0.5} onChange={(value) => updateConfig({ borderAnimationSpeed: value })} />
      </div>
    )}
  </div>
</Accordion>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d8d4e0] to-transparent my-[40px]"></div>

      {/* Тень */}
      <Accordion
        title="Тень"
        color="bg-gradient-to-br from-[#7BA488]/20 to-[#5E4A82]/20"
        icon={<Circle className="w-[18px] h-[18px] text-[#7BA488]" />}
      >
        <div className="space-y-[20px]">
          <div className="rounded-[10px] p-[4px]">
            <Toggle label="Включить тень" checked={config.enableShadow} onChange={(checked) => updateConfig({ enableShadow: checked })} />
          </div>
          {config.enableShadow && (
            <>
              <div className="rounded-[10px] p-[4px]">
                <Slider label="Смещение X" value={config.shadowX} min={-50} max={50} unit="px" onChange={(value) => updateConfig({ shadowX: value })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <Slider label="Смещение Y" value={config.shadowY} min={-50} max={50} unit="px" onChange={(value) => updateConfig({ shadowY: value })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <Slider label="Размытие" value={config.shadowBlur} min={0} max={100} unit="px" onChange={(value) => updateConfig({ shadowBlur: value })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <Slider label="Распространение" value={config.shadowSpread} min={-50} max={50} unit="px" onChange={(value) => updateConfig({ shadowSpread: value })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <ColorPicker label="Цвет тени" value={config.shadowColor} onChange={(value) => updateConfig({ shadowColor: value })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <Slider label="Непрозрачность" value={config.shadowOpacity} min={0} max={100} unit="%" onChange={(value) => updateConfig({ shadowOpacity: value })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <Toggle label="Внутренняя тень (inset)" checked={config.insetShadow} onChange={(checked) => updateConfig({ insetShadow: checked })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <Toggle label="Вторая тень" checked={config.secondShadow} onChange={(checked) => updateConfig({ secondShadow: checked })} />
              </div>
              {config.secondShadow && (
                <>
                  <div className="rounded-[10px] p-[4px]">
                    <Slider label="Тень 2: X" value={config.secondShadowX} min={-50} max={50} unit="px" onChange={(value) => updateConfig({ secondShadowX: value })} />
                  </div>
                  <div className="rounded-[10px] p-[4px]">
                    <Slider label="Тень 2: Y" value={config.secondShadowY} min={-50} max={50} unit="px" onChange={(value) => updateConfig({ secondShadowY: value })} />
                  </div>
                  <div className="rounded-[10px] p-[4px]">
                    <Slider label="Тень 2: Размытие" value={config.secondShadowBlur} min={0} max={100} unit="px" onChange={(value) => updateConfig({ secondShadowBlur: value })} />
                  </div>
                  <div className="rounded-[10px] p-[4px]">
                    <ColorPicker label="Тень 2: Цвет" value={config.secondShadowColor} onChange={(value) => updateConfig({ secondShadowColor: value })} />
                  </div>
                  <div className="rounded-[10px] p-[4px]">
                    <Slider label="Тень 2: Непрозрачность" value={config.secondShadowOpacity} min={0} max={100} unit="%" onChange={(value) => updateConfig({ secondShadowOpacity: value })} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Accordion>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d8d4e0] to-transparent my-[40px]"></div>

      {/* Эффекты */}
      <Accordion
        title="Эффекты"
        color="bg-gradient-to-br from-[#5E4A82]/20 to-[#7BA488]/20"
        icon={<Wand2 className="w-[18px] h-[18px] text-[#5E4A82]" />}
      >
        <div className="space-y-[20px]">
          {/* Glow */}
          <div className="rounded-[10px] p-[4px]">
            <Toggle label="Glow эффект" checked={config.enableGlow} onChange={(checked) => updateConfig({ enableGlow: checked })} description="Свечение при наведении" />
          </div>
          {config.enableGlow && (
            <>
              <div className="rounded-[10px] p-[4px]">
                <ColorPicker label="Цвет свечения" value={config.glowColor} onChange={(value) => updateConfig({ glowColor: value })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <Slider label="Радиус свечения" value={config.glowBlur} min={5} max={50} unit="px" onChange={(value) => updateConfig({ glowBlur: value })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <Slider label="Непрозрачность" value={config.glowOpacity} min={10} max={100} unit="%" onChange={(value) => updateConfig({ glowOpacity: value })} />
              </div>
            </>
          )}

          

          {/* Ripple */}
          <div className="rounded-[10px] p-[4px]">
            <Toggle label="Ripple эффект" checked={config.ripple} onChange={(checked) => updateConfig({ ripple: checked })} description="Волна при клике" />
          </div>
          {config.ripple && (
            <div className="rounded-[10px] p-[4px]">
              <ColorPicker label="Цвет волны" value={config.rippleColor} onChange={(value) => updateConfig({ rippleColor: value })} />
            </div>
          )}

          {/* 3D Tilt */}
          <div className="rounded-[10px] p-[4px]">
            <Toggle label="3D Tilt" checked={config.tilt3D} onChange={(checked) => updateConfig({ tilt3D: checked })} description="Наклон за курсором" />
          </div>
          {config.tilt3D && (
            <div className="rounded-[10px] p-[4px]">
              <Slider label="Интенсивность" value={config.tiltIntensity} min={5} max={30} unit="°" onChange={(value) => updateConfig({ tiltIntensity: value })} />
            </div>
          )}

          {/* Magnetic */}
          <div className="rounded-[10px] p-[4px]">
            <Toggle label="Magnetic" checked={config.magnetic} onChange={(checked) => updateConfig({ magnetic: checked })} description="Притяжение к курсору" />
          </div>
          {config.magnetic && (
            <div className="rounded-[10px] p-[4px]">
              <Slider label="Сила притяжения" value={config.magneticStrength} min={10} max={100} unit="px" onChange={(value) => updateConfig({ magneticStrength: value })} />
            </div>
          )}
        </div>
      </Accordion>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d8d4e0] to-transparent my-[40px]"></div>

      {/* Анимации */}
      <Accordion
        title="Анимации"
        color="bg-gradient-to-br from-[#7BA488]/20 to-[#5E4A82]/20"
        icon={<Play className="w-[18px] h-[18px] text-[#7BA488]" />}
      >
        <div className="space-y-[20px]">
          <div className="rounded-[10px] p-[4px]">
            <Select label="Анимация при наведении" value={config.hoverAnimation} options={[
              { value: 'none', label: 'Нет' },
              { value: 'scale', label: 'Увеличение' },
              { value: 'bounce', label: 'Прыжок' },
              { value: 'shake', label: 'Тряска' },
              { value: 'pulse', label: 'Пульсация' },
              { value: 'wiggle', label: 'Покачивание' },
            ]} onChange={(value) => updateConfig({ hoverAnimation: value as any })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Select label="Анимация появления" value={config.entranceAnimation} options={[
              { value: 'none', label: 'Нет' },
              { value: 'fadeIn', label: 'Fade In' },
              { value: 'slideIn', label: 'Slide In' },
              { value: 'zoomIn', label: 'Zoom In' },
            ]} onChange={(value) => updateConfig({ entranceAnimation: value as any })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Toggle label="Смена цвета при наведении" checked={config.enableHoverTransition} onChange={(checked) => updateConfig({ enableHoverTransition: checked })} />
          </div>
          {config.enableHoverTransition && (
            <>
              <div className="rounded-[10px] p-[4px]">
                <ColorPicker label="Цвет фона (hover)" value={config.hoverBgColor || config.bgColor} onChange={(value) => updateConfig({ hoverBgColor: value })} />
              </div>
              <div className="rounded-[10px] p-[4px]">
                <ColorPicker label="Цвет текста (hover)" value={config.hoverTextColor || config.textColor} onChange={(value) => updateConfig({ hoverTextColor: value })} />
              </div>
            </>
          )}
          <div className="rounded-[10px] p-[4px]">
            <Slider label="Длительность перехода" value={config.transitionDuration} min={0} max={2} step={0.1} unit="s" onChange={(value) => updateConfig({ transitionDuration: value })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Slider label="Увеличение при наведении" value={config.whileHoverScale} min={0.8} max={1.5} step={0.05} onChange={(value) => updateConfig({ whileHoverScale: value })} />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Slider label="Сжатие при клике" value={config.whileTapScale} min={0.5} max={1.2} step={0.05} onChange={(value) => updateConfig({ whileTapScale: value })} />
          </div>
        </div>
      </Accordion>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d8d4e0] to-transparent my-[40px]"></div>

      {/* Состояния */}
      <Accordion
        title="Состояния"
        color="bg-gradient-to-br from-[#5E4A82]/20 to-[#7BA488]/20"
        icon={<Layers className="w-[18px] h-[18px] text-[#5E4A82]" />}
      >
        <div className="space-y-[20px]">
          <div className="rounded-[10px] p-[4px]">
            <Toggle label="Loading состояние" checked={config.loading} onChange={(checked) => updateConfig({ loading: checked })} description="Показать спиннер" />
          </div>
          <div className="rounded-[10px] p-[4px]">
            <Toggle label="Disabled состояние" checked={config.disabled} onChange={(checked) => updateConfig({ disabled: checked })} description="Кнопка неактивна" />
          </div>
        </div>
      </Accordion>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d8d4e0] to-transparent my-[40px]"></div>

      {/* Кнопка сброса */}
      <button
        onClick={() => useButtonStore.getState().resetConfig()}
        className="w-full px-[24px] py-[16px] bg-gradient-to-r from-[#F3F1F5] to-[#E6E6FA] hover:from-[#E6E6FA] hover:to-[#F3F1F5] text-[#5E4A82] rounded-[12px] transition-all duration-300 text-[14px] font-bold flex items-center justify-center gap-[12px] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      >
        <RotateCcw className="w-[20px] h-[20px]" />
        Сбросить настройки
      </button>
    </div>
  );
}