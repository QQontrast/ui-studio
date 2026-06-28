// src/lib/styleBuilder.ts
import { ButtonConfig } from '@/types/button';

// Кэш для hexToRgba
const rgbaCache = new Map<string, string>();

function hexToRgba(hex: string, opacity: number): string {
  const cacheKey = `${hex}-${opacity}`;
  if (rgbaCache.has(cacheKey)) return rgbaCache.get(cacheKey)!;
  
  if (!hex || hex.length < 7) {
    return `rgba(0, 0, 0, ${opacity / 100})`;
  }
  
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const result = `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  
  rgbaCache.set(cacheKey, result);
  return result;
}

export function buildBackground(config: ButtonConfig): string {
  if (config.enableGradient) {
    const colors = [config.gradientColor1, config.gradientColor2, config.gradientColor3]
      .filter(Boolean);
    if (config.gradientType === 'linear') {
      return `linear-gradient(${config.gradientAngle}deg, ${colors.join(', ')})`;
    }
    return `radial-gradient(circle, ${colors.join(', ')})`;
  }
  return config.bgColor;
}

export function buildBoxShadow(config: ButtonConfig): string {
  if (!config.enableShadow) return 'none';

  const shadows: string[] = [];

  // Основная тень
  const mainR = parseInt(config.shadowColor.slice(1, 3), 16);
  const mainG = parseInt(config.shadowColor.slice(3, 5), 16);
  const mainB = parseInt(config.shadowColor.slice(5, 7), 16);
  const mainA = config.shadowOpacity / 100;
  const mainShadow = `${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px ${config.shadowSpread}px rgba(${mainR}, ${mainG}, ${mainB}, ${mainA})`;
  shadows.push(config.insetShadow ? `inset ${mainShadow}` : mainShadow);

  // Вторая тень
  if (config.secondShadow) {
    const r2 = parseInt(config.secondShadowColor.slice(1, 3), 16);
    const g2 = parseInt(config.secondShadowColor.slice(3, 5), 16);
    const b2 = parseInt(config.secondShadowColor.slice(5, 7), 16);
    const a2 = config.secondShadowOpacity / 100;
    shadows.push(`${config.secondShadowX}px ${config.secondShadowY}px ${config.secondShadowBlur}px 0px rgba(${r2}, ${g2}, ${b2}, ${a2})`);
  }

  return shadows.join(', ');
}

export function buildButtonStyles(config: ButtonConfig): React.CSSProperties {
  // Размеры на основе пресета
  const sizeStyles: Record<string, { px: number; py: number; fontSize: number }> = {
    sm: { px: 16, py: 8, fontSize: 13 },
    md: { px: 24, py: 10, fontSize: 14 },
    lg: { px: 32, py: 14, fontSize: 16 },
    xl: { px: 40, py: 18, fontSize: 18 },
  };
  const size = sizeStyles[config.size] || sizeStyles.md;

  // Ширина
  let width: string | number | undefined;
  if (config.width === 'full') width = '100%';
  else if (config.width === 'custom') width = `${config.customWidth}px`;

  // Градиентный текст
  const textGradient: React.CSSProperties = config.gradientText && config.enableGradient
    ? {
        backgroundImage: `linear-gradient(${config.gradientAngle}deg, ${config.gradientColor1}, ${config.gradientColor2})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    : {};

  // Градиентная граница
const gradientBorderStyles: React.CSSProperties = config.gradientBorder
  ? {
      border: `${config.borderWidth}px solid transparent`,
      backgroundImage: `
        linear-gradient(${config.bgColor}, ${config.bgColor}),
        linear-gradient(var(--gradient-angle, ${config.gradientBorderAngle}deg), ${config.gradientBorderColor1}, ${config.gradientBorderColor2}${config.gradientBorderColor3 ? `, ${config.gradientBorderColor3}` : ''})
      `,
      backgroundOrigin: 'padding-box, border-box',
      backgroundClip: 'padding-box, border-box',
    }
  : {};

  // Обычный фон (если нет градиентной границы)
  const backgroundStyles: React.CSSProperties = !config.gradientBorder
    ? {
        backgroundColor: config.bgColor,
        backgroundImage: config.enableGradient
          ? `${config.gradientType === 'linear' ? 'linear-gradient' : 'radial-gradient'}(${config.gradientType === 'linear' ? `${config.gradientAngle}deg` : 'circle'}, ${[config.gradientColor1, config.gradientColor2, config.gradientColor3].filter(Boolean).join(', ')})`
          : undefined,
      }
    : {};

  return {
    ...backgroundStyles,
    color: config.textColor,
    borderRadius: `${config.borderRadius}px`,
    borderWidth: config.gradientBorder ? '0px' : `${config.borderWidth}px`,
    borderColor: config.gradientBorder ? 'transparent' : config.borderColor,
    borderStyle: config.borderWidth > 0 && !config.gradientBorder ? 'solid' : 'none',
    padding: `${config.customPaddingY}px ${config.customPaddingX}px`,
    fontSize: `${config.customFontSize}px`,
    fontWeight: 600,
    cursor: config.disabled ? 'not-allowed' : 'pointer',
    boxShadow: buildBoxShadow(config),
    width,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: config.icon ? '8px' : undefined,
    position: 'relative',
    overflow: 'hidden',
    opacity: config.disabled ? 0.5 : 1,
    transition: config.enableHoverTransition
      ? `all ${config.transitionDuration}s ease`
      : `transform ${config.transitionDuration}s ease`,
    ...textGradient,
    ...gradientBorderStyles,
  };
}

export function buildHoverStyles(config: ButtonConfig): React.CSSProperties {
  const styles: React.CSSProperties = {};
  
  if (config.enableHoverTransition) {
    if (config.hoverBgColor) {
      if (!config.enableGradient) {
        styles.background = config.hoverBgColor;
      }
    }
    if (config.hoverTextColor) {
      styles.color = config.hoverTextColor;
    }
  }
  
  return styles;
}