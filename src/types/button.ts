// src/types/button.ts
export interface ButtonConfig {
  // === Базовые стили ===
  text: string;
  bgColor: string;
  textColor: string;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  // Добавь в интерфейс ButtonConfig (после borderColor):
  gradientBorder: boolean;
  gradientBorderAngle: number;
  gradientBorderColor1: string;
  gradientBorderColor2: string;
  gradientBorderColor3: string;

  

  // === Размеры ===
  size: 'sm' | 'md' | 'lg' | 'xl';
  customPaddingX: number;
  customPaddingY: number;
  customFontSize: number;
  width: 'auto' | 'full' | 'custom';
  customWidth: number;

  // === Иконки ===
  icon: string | null;
  iconPosition: 'left' | 'right';
  iconSize: number;

  // === Градиенты ===
  enableGradient: boolean;
  gradientType: 'linear' | 'radial';
  gradientAngle: number;
  gradientColor1: string;
  gradientColor2: string;
  gradientColor3: string;
  gradientText: boolean; // Градиентный текст

  // === Тени ===
  enableShadow: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowColor: string;
  shadowOpacity: number;
  insetShadow: boolean; // Внутренняя тень
  secondShadow: boolean; // Вторая тень
  secondShadowX: number;
  secondShadowY: number;
  secondShadowBlur: number;
  secondShadowColor: string;
  secondShadowOpacity: number;

  // === Glow эффект ===
  enableGlow: boolean;
  glowColor: string;
  glowBlur: number;
  glowOpacity: number;

  // === Анимированная граница ===
  animatedBorder: boolean;
  borderColor1: string;
  borderColor2: string;
  borderAnimationSpeed: number;

  

  // === Ripple эффект ===
  ripple: boolean;
  rippleColor: string;

  // === 3D Tilt ===
  tilt3D: boolean;
  tiltIntensity: number;

  // === Magnetic button ===
  magnetic: boolean;
  magneticStrength: number;

  // === Анимации ===
  hoverAnimation: 'none' | 'bounce' | 'shake' | 'pulse' | 'wiggle' | 'scale';
  entranceAnimation: 'none' | 'fadeIn' | 'slideIn' | 'zoomIn';
  hoverBgColor: string;
  hoverTextColor: string;
  enableHoverTransition: boolean;
  transitionDuration: number;

  // === Состояния ===
  loading: boolean;
  disabled: boolean;

  // === Анимации нажатия ===
  whileHoverScale: number;
  whileTapScale: number;

  // === Дополнительные ===
  customClasses: string;
}

export const defaultButtonConfig: ButtonConfig = {
  text: 'Click Me',
  bgColor: '#3b82f6',
  textColor: '#ffffff',
  borderRadius: 8,
  borderWidth: 0,
  borderColor: '#000000',

  // Размеры
  size: 'md',
  customPaddingX: 32,
  customPaddingY: 12,
  customFontSize: 16,
  width: 'auto',
  customWidth: 200,

  
  gradientBorder: false,
  gradientBorderAngle: 135,
  gradientBorderColor1: '#3b82f6',
  gradientBorderColor2: '#8b5cf6',
  gradientBorderColor3: '',
  // Иконки
  icon: null,
  iconPosition: 'left',
  iconSize: 20,

  // Градиенты
  enableGradient: false,
  gradientType: 'linear',
  gradientAngle: 135,
  gradientColor1: '#3b82f6',
  gradientColor2: '#8b5cf6',
  gradientColor3: '',
  gradientText: false,

  // Тени
  enableShadow: true,
  shadowX: 0,
  shadowY: 10,
  shadowBlur: 25,
  shadowSpread: -5,
  shadowColor: '#000000',
  shadowOpacity: 20,
  insetShadow: false,
  secondShadow: false,
  secondShadowX: 0,
  secondShadowY: 10,
  secondShadowBlur: 20,
  secondShadowColor: '#000000',
  secondShadowOpacity: 15,

  // Glow
  enableGlow: false,
  glowColor: '#3b82f6',
  glowBlur: 20,
  glowOpacity: 50,

  // Animated border
  animatedBorder: false,
  borderColor1: '#3b82f6',
  borderColor2: '#8b5cf6',
  borderAnimationSpeed: 3,

  

  // Ripple
  ripple: false,
  rippleColor: 'rgba(255, 255, 255, 0.6)',

  // 3D Tilt
  tilt3D: false,
  tiltIntensity: 10,

  // Magnetic
  magnetic: false,
  magneticStrength: 50,

  // Анимации
  hoverAnimation: 'none',
  entranceAnimation: 'none',
  hoverBgColor: '',
  hoverTextColor: '',
  enableHoverTransition: true,
  transitionDuration: 0.3,

  // Состояния
  loading: false,
  disabled: false,

  // Анимации нажатия
  whileHoverScale: 1.05,
  whileTapScale: 0.95,

  customClasses: '',
};