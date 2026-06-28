// src/lib/codeGenerator.ts
import { ButtonConfig } from '@/types/button';

function hexToRgba(hex: string, opacity: number): string {
  if (!hex || hex.length < 7) return `rgba(0, 0, 0, ${opacity / 100})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function buildBackground(config: ButtonConfig): string {
  if (config.enableGradient) {
    const colors = [config.gradientColor1, config.gradientColor2, config.gradientColor3].filter(Boolean);
    if (config.gradientType === 'linear') {
      return `linear-gradient(${config.gradientAngle}deg, ${colors.join(', ')})`;
    }
    return `radial-gradient(circle, ${colors.join(', ')})`;
  }
  return config.bgColor;
}

function buildShadow(config: ButtonConfig): string {
  if (!config.enableShadow) return 'none';
  const shadows: string[] = [];
  const main = `${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px ${config.shadowSpread}px ${hexToRgba(config.shadowColor, config.shadowOpacity)}`;
  shadows.push(config.insetShadow ? `inset ${main}` : main);
  if (config.secondShadow) {
    shadows.push(`${config.secondShadowX}px ${config.secondShadowY}px ${config.secondShadowBlur}px 0px ${hexToRgba(config.secondShadowColor, config.secondShadowOpacity)}`);
  }
  return shadows.join(', ');
}

export interface GeneratedCode {
  reactTs: string;
  tailwind: string;
  htmlCss: string;
}

export function generateButtonCode(config: ButtonConfig): GeneratedCode {
  const bg = buildBackground(config);
  const shadow = buildShadow(config);
  const widthStyle = config.width === 'full' ? "width: '100%', " : config.width === 'custom' ? `width: '${config.customWidth}px',` : '';
  
  const textGradient = config.gradientText && config.enableGradient
    ? `backgroundImage: 'linear-gradient(${config.gradientAngle}deg, ${config.gradientColor1}, ${config.gradientColor2})', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',`
    : '';
  
  const gradientBorder = config.gradientBorder
    ? `border: '${config.borderWidth}px solid transparent', backgroundImage: 'linear-gradient(${config.bgColor}, ${config.bgColor}), linear-gradient(var(--gradient-angle, ${config.gradientBorderAngle}deg), ${config.gradientBorderColor1}, ${config.gradientBorderColor2}${config.gradientBorderColor3 ? `, ${config.gradientBorderColor3}` : ''})', backgroundOrigin: 'padding-box, border-box', backgroundClip: 'padding-box, border-box',`
    : `border: '${config.borderWidth}px solid ${config.borderColor}',`;
  
  const gradientBorderCSS = config.gradientBorder && config.animatedBorder
    ? `
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes rotateGradient {
  from { --gradient-angle: 0deg; }
  to { --gradient-angle: 360deg; }
}
.animated-gradient-border {
  animation: rotateGradient ${config.borderAnimationSpeed}s linear infinite;
}`
    : '';
  
  const animatedBorderClass = config.gradientBorder && config.animatedBorder ? 'animated-gradient-border' : '';
  
  // Логика transition
  const transitionProperty = config.enableHoverTransition ? 'all' : 'transform';
  const transitionStyle = `${transitionProperty} ${config.transitionDuration}s ease`;
  
  // Hover colors (только если нет градиента для bg)
  const hoverBg = config.enableHoverTransition && config.hoverBgColor && !config.enableGradient ? config.hoverBgColor : '';
  const hoverText = config.enableHoverTransition && config.hoverTextColor ? config.hoverTextColor : '';

  // === 1. React + TypeScript ===
  const reactTs = `import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useRef, useState } from 'react';
${config.icon ? `import { ${config.icon} } from 'lucide-react';` : ''}

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

// Ripple компонент
function Ripple({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0.6 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: 20, height: 20,
        transform: 'translate(-50%, -50%)',
        background: color, zIndex: 3,
      }}
    />
  );
}

const hoverVariants: any = {
  none: {},
  scale: { scale: ${config.whileHoverScale} },
  bounce: { y: [0, -10, 0], transition: { duration: 0.5, repeat: Infinity } },
  shake: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
  pulse: { scale: [1, 1.05, 1], transition: { duration: 1, repeat: Infinity } },
  wiggle: { rotate: [0, -3, 3, -3, 3, 0], transition: { duration: 0.5 } },
};

const entranceVariants: any = {
  none: { opacity: 1, y: 0 },
  fadeIn: { opacity: [0, 1], transition: { duration: 0.5 } },
  slideIn: { y: [20, 0], opacity: [0, 1], transition: { duration: 0.5 } },
  zoomIn: { scale: [0.5, 1], opacity: [0, 1], transition: { duration: 0.5 } },
};

export function CustomButton({ onClick, disabled }: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [${config.tiltIntensity}, -${config.tiltIntensity}]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-${config.tiltIntensity}, ${config.tiltIntensity}]);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || ${config.disabled} || ${config.loading}) return;
    onClick?.();
    ${config.ripple ? `if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    }` : ''}
  };

  ${config.tilt3D || config.magnetic ? `const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    ${config.tilt3D ? `const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);` : ''}
    ${config.magnetic ? `if (buttonRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;
      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      if (dist < ${config.magneticStrength} * 2) {
        const strength = (${config.magneticStrength} * 2 - dist) / (${config.magneticStrength} * 2);
        setMagneticPos({ x: distX * strength * 0.3, y: distY * strength * 0.3 });
      } else {
        setMagneticPos({ x: 0, y: 0 });
      }
    }` : ''}
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    ${config.tilt3D ? `mouseX.set(0); mouseY.set(0);` : ''}
    ${config.magnetic ? `setMagneticPos({ x: 0, y: 0 });` : ''}
  };` : ''}

  const buttonStyle: CSSProperties = {
    background: '${bg}',
    color: '${config.textColor}',
    borderRadius: '${config.borderRadius}px',
    ${gradientBorder}
    padding: '${config.customPaddingY}px ${config.customPaddingX}px',
    fontSize: '${config.customFontSize}px',
    fontWeight: 600,
    cursor: ${config.disabled ? "'not-allowed'" : "'pointer'"},
    boxShadow: '${shadow}',
    ${widthStyle}display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    overflow: 'hidden',
    opacity: ${config.disabled ? 0.5 : 1},
    transition: '${transitionStyle}',
    ${textGradient}
  };

  return (
    <div 
      ref={containerRef}
      className="relative inline-flex items-center justify-center"
      ${config.tilt3D || config.magnetic ? `onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}` : ''}
    >
      ${config.enableGlow ? `<div
        className="absolute rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
        style={{
          width: 200, height: 100,
          background: '${config.glowColor}',
          opacity: isHovered ? ${config.glowOpacity / 100} : 0,
          filter: 'blur(${config.glowBlur}px)',
        }}
      />` : ''}
      <motion.div
        style={
          ${config.tilt3D}
            ? { rotateX, rotateY, perspective: 1000, transformStyle: 'preserve-3d' }
            : ${config.magnetic}
            ? { x: magneticPos.x, y: magneticPos.y }
            : {}
        }
        animate={entranceVariants['${config.entranceAnimation}'] || {}}
        className="will-change-transform"
      >
        <motion.button
          ref={buttonRef}
          style={buttonStyle}
          whileHover={{ 
            ...hoverVariants['${config.hoverAnimation}'],
            ${hoverBg ? `background: '${hoverBg}',` : ''}
            ${hoverText ? `color: '${hoverText}',` : ''}
          }}
          whileTap={{ scale: ${config.whileTapScale} }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleClick}
          disabled={disabled || ${config.disabled}}
          className="relative ${animatedBorderClass}"
        >
          ${config.ripple ? `{ripples.map((ripple) => (
            <Ripple key={ripple.id} x={ripple.x} y={ripple.y} color="${config.rippleColor}" />
          ))}` : ''}
          
          ${config.loading ? '<span className="animate-spin">⏳</span>' : ''}
          ${config.icon && config.iconPosition === 'left' ? `<${config.icon} size={${config.iconSize}} />` : ''}
          ${config.text}
          ${config.icon && config.iconPosition === 'right' ? `<${config.icon} size={${config.iconSize}} />` : ''}
        </motion.button>
      </motion.div>
      
      ${gradientBorderCSS ? `<style>{\`${gradientBorderCSS}\`}</style>` : ''}
    </div>
  );
}`;

  // === 2. Tailwind CSS (Готов для Tailwind Playground) ===
const tailwind = `<!-- Вставь это в Tailwind Playground -->
<div class="relative inline-flex items-center justify-center p-20" id="tw-btn-wrapper">
  
  <!-- Glow эффект (появляется при hover) -->
  ${config.enableGlow ? `<div class="tw-glow absolute w-[200px] h-[100px] rounded-full pointer-events-none opacity-0 transition-opacity duration-300 blur-[${config.glowBlur}px]" style="background: ${config.glowColor};"></div>` : ''}
  
  <!-- Контейнер для 3D Tilt + Entrance -->
  <div class="tw-tilt ${config.entranceAnimation !== 'none' ? `tw-entrance-${config.entranceAnimation}` : ''}" id="tw-tilt-container">
    
    <!-- Сама кнопка -->
    <button 
      class="tw-btn group relative inline-flex items-center justify-center gap-2 font-semibold rounded-[${config.borderRadius}px] border-[${config.borderWidth}px] px-[${config.customPaddingX}px] py-[${config.customPaddingY}px] text-[${config.customFontSize}px] ${config.width === 'full' ? 'w-full' : config.width === 'custom' ? `w-[${config.customWidth}px]` : ''} ${config.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} overflow-hidden transition-all duration-[${Math.round(config.transitionDuration * 1000)}ms] ${animatedBorderClass}"
      style="
        background: ${bg};
        color: ${config.textColor};
        border-color: ${config.gradientBorder ? 'transparent' : config.borderColor};
        box-shadow: ${shadow};
        ${config.gradientBorder ? `background-image: linear-gradient(${config.bgColor}, ${config.bgColor}), linear-gradient(var(--gradient-angle, ${config.gradientBorderAngle}deg), ${config.gradientBorderColor1}, ${config.gradientBorderColor2}${config.gradientBorderColor3 ? `, ${config.gradientBorderColor3}` : ''}); background-origin: padding-box, border-box; background-clip: padding-box, border-box;` : ''}
        ${config.gradientText && config.enableGradient ? `background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;` : ''}
      "
      id="tw-main-btn"
      ${config.disabled ? 'disabled' : ''}
    >
      ${config.loading ? '<span class="tw-spinner inline-block animate-spin">⏳</span>' : ''}
      ${config.icon && config.iconPosition === 'left' ? `<i data-lucide="${config.icon.toLowerCase()}" class="w-[${config.iconSize}px] h-[${config.iconSize}px]"></i>` : ''}
      <span class="relative z-10">${config.text}</span>
      ${config.icon && config.iconPosition === 'right' ? `<i data-lucide="${config.icon.toLowerCase()}" class="w-[${config.iconSize}px] h-[${config.iconSize}px]"></i>` : ''}
    </button>
    
  </div>
</div>

<!-- Lucide Icons CDN -->
<script src="https://unpkg.com/lucide@latest"></script>

<style>
/* Tailwind-специфичные стили */

/* Hover изменения цветов (через group-hover) */
${config.enableHoverTransition && hoverBg ? `#tw-btn-wrapper:hover #tw-main-btn { background: ${hoverBg} !important; }` : ''}
${config.enableHoverTransition && hoverText ? `#tw-btn-wrapper:hover #tw-main-btn { color: ${hoverText} !important; }` : ''}

/* Glow при hover на wrapper */
${config.enableGlow ? `#tw-btn-wrapper:hover .tw-glow { opacity: ${config.glowOpacity / 100}; }` : ''}

/* Hover анимации (scale, bounce, shake, pulse, wiggle) */
${config.hoverAnimation === 'scale' ? `#tw-btn-wrapper:hover #tw-main-btn { transform: scale(${config.whileHoverScale}); }` : ''}
${config.hoverAnimation === 'bounce' ? `
@keyframes tw-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
#tw-btn-wrapper:hover #tw-main-btn { animation: tw-bounce 0.5s infinite; }` : ''}
${config.hoverAnimation === 'shake' ? `
@keyframes tw-shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-5px); } 40%, 80% { transform: translateX(5px); } }
#tw-btn-wrapper:hover #tw-main-btn { animation: tw-shake 0.5s; }` : ''}
${config.hoverAnimation === 'pulse' ? `
@keyframes tw-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
#tw-btn-wrapper:hover #tw-main-btn { animation: tw-pulse 1s infinite; }` : ''}
${config.hoverAnimation === 'wiggle' ? `
@keyframes tw-wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
#tw-btn-wrapper:hover #tw-main-btn { animation: tw-wiggle 0.5s infinite; }` : ''}

/* Tap (active) scale */
#tw-main-btn:active { transform: scale(${config.whileTapScale}) !important; }

/* Entrance анимации */
${config.entranceAnimation === 'fadeIn' ? `@keyframes tw-fadeIn { from { opacity: 0; } to { opacity: 1; } } .tw-entrance-fadeIn { animation: tw-fadeIn 0.5s ease-out; }` : ''}
${config.entranceAnimation === 'slideIn' ? `@keyframes tw-slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .tw-entrance-slideIn { animation: tw-slideIn 0.5s ease-out; }` : ''}
${config.entranceAnimation === 'zoomIn' ? `@keyframes tw-zoomIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } } .tw-entrance-zoomIn { animation: tw-zoomIn 0.5s ease-out; }` : ''}

/* Градиентная анимированная граница */
${config.gradientBorder && config.animatedBorder ? `
@property --gradient-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes tw-rotateGradient { from { --gradient-angle: 0deg; } to { --gradient-angle: 360deg; } }
.animated-gradient-border { animation: tw-rotateGradient ${config.borderAnimationSpeed}s linear infinite; }` : ''}

/* Ripple эффект */
${config.ripple ? `
@keyframes tw-ripple { to { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
.tw-ripple-span { position: absolute; border-radius: 9999px; width: 20px; height: 20px; transform: translate(-50%, -50%) scale(0); animation: tw-ripple 0.6s ease-out; pointer-events: none; z-index: 3; }` : ''}

/* Tilt transition */
.tw-tilt { transition: transform 0.1s ease-out; will-change: transform; }
</style>

<script>
  lucide.createIcons();
  const wrapper = document.getElementById('tw-btn-wrapper');
  const tilt = document.getElementById('tw-tilt-container');
  const btn = document.getElementById('tw-main-btn');

  ${config.ripple ? `
  // Ripple
  btn.addEventListener('click', (e) => {
    if (btn.disabled) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'tw-ripple-span';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    ripple.style.background = '${config.rippleColor}';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });` : ''}

  ${config.tilt3D || config.magnetic ? `
  // 3D Tilt + Magnetic
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    let transform = '';
    
    ${config.tilt3D ? `
    const rotateX = ${config.tiltIntensity} * (-y * 2);
    const rotateY = ${config.tiltIntensity} * (x * 2);
    transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;` : ''}
    
    ${config.magnetic ? `
    const btnRect = btn.getBoundingClientRect();
    const distX = e.clientX - (btnRect.left + btnRect.width / 2);
    const distY = e.clientY - (btnRect.top + btnRect.height / 2);
    const dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < ${config.magneticStrength} * 2) {
      const strength = (${config.magneticStrength} * 2 - dist) / (${config.magneticStrength} * 2);
      transform += \` translate(\${distX * strength * 0.3}px, \${distY * strength * 0.3}px)\`;
    }` : ''}
    
    tilt.style.transform = transform;
  });
  
  wrapper.addEventListener('mouseleave', () => {
    tilt.style.transform = '';
  });` : ''}
</script>`;

  // === 3. HTML + CSS (с JavaScript для интерактивных фичей) ===
  
  // CSS keyframes для hover animations
  const hoverKeyframes = `
@keyframes hover-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes hover-shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}
@keyframes hover-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes hover-wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}`;
  
  const entranceKeyframes = `
@keyframes entrance-fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes entrance-slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes entrance-zoomIn {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}`;

  

  // Определяем какая hover-анимация активна
  let hoverAnimationCSS = '';
  switch (config.hoverAnimation) {
    case 'scale':
      hoverAnimationCSS = `transform: scale(${config.whileHoverScale});`;
      break;
    case 'bounce':
      hoverAnimationCSS = `animation: hover-bounce 0.5s infinite;`;
      break;
    case 'shake':
      hoverAnimationCSS = `animation: hover-shake 0.5s;`;
      break;
    case 'pulse':
      hoverAnimationCSS = `animation: hover-pulse 1s infinite;`;
      break;
    case 'wiggle':
      hoverAnimationCSS = `animation: hover-wiggle 0.5s infinite;`;
      break;
  }

  // Entrance animation
  let entranceAnimationCSS = '';
  if (config.entranceAnimation !== 'none') {
    entranceAnimationCSS = `animation: entrance-${config.entranceAnimation} 0.5s ease-out;`;
  }

  // Hover colors CSS
  const hoverColorsCSS = config.enableHoverTransition && (hoverBg || hoverText) ? `
.custom-btn:hover {
  ${hoverBg ? `background: ${hoverBg} !important;` : ''}
  ${hoverText ? `color: ${hoverText} !important;` : ''}
}` : '';

  // JavaScript для интерактивных фичей
  const interactiveJS = (config.ripple || config.tilt3D || config.magnetic) ? `
<script>
  const btn = document.querySelector('.custom-btn');
  const wrapper = document.querySelector('.button-wrapper');
  ${config.tilt3D ? `const tiltContainer = document.querySelector('.tilt-container');` : ''}
  ${config.ripple ? `
  // Ripple Effect
  btn.addEventListener('click', (e) => {
    if (btn.disabled) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = '${config.rippleColor}';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });` : ''}
  ${config.tilt3D || config.magnetic ? `
  // Mouse tracking
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    ${config.tilt3D ? `const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = ${config.tiltIntensity} * (-y * 2);
    const rotateY = ${config.tiltIntensity} * (x * 2);
    tiltContainer.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;` : ''}
    ${config.magnetic ? `const btnRect = btn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    const distX = e.clientX - btnCenterX;
    const distY = e.clientY - btnCenterY;
    const dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < ${config.magneticStrength} * 2) {
      const strength = (${config.magneticStrength} * 2 - dist) / (${config.magneticStrength} * 2);
      ${config.tilt3D ? `tiltContainer.style.transform += \` translate(\${distX * strength * 0.3}px, \${distY * strength * 0.3}px)\`;` : `tiltContainer.style.transform = \`translate(\${distX * strength * 0.3}px, \${distY * strength * 0.3}px)\`;`}
    }` : ''}
  });
  
  wrapper.addEventListener('mouseleave', () => {
    ${config.tilt3D ? `tiltContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';` : ''}
    ${config.magnetic ? `${config.tilt3D ? '' : `tiltContainer.style.transform = 'translate(0, 0)';`}` : ''}
  });` : ''}
</script>` : '';

  const htmlCss = `<!-- HTML -->
<div class="button-wrapper">
  ${config.enableGlow ? `<div class="glow-effect"></div>` : ''}
  <div class="tilt-container">
    <button class="custom-btn ${animatedBorderClass}"${config.disabled ? ' disabled' : ''}>
      
      ${config.loading ? '<span class="spinner">⏳</span>' : ''}
      ${config.icon && config.iconPosition === 'left' ? '<svg class="icon"><!-- Icon SVG --></svg>' : ''}
      <span class="btn-text">${config.text}</span>
      ${config.icon && config.iconPosition === 'right' ? '<svg class="icon"><!-- Icon SVG --></svg>' : ''}
    </button>
  </div>
</div>

<!-- CSS -->
<style>
${gradientBorderCSS}
${hoverKeyframes}
${entranceKeyframes}


.button-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tilt-container {
  transition: transform 0.1s ease-out;
  will-change: transform;
  ${entranceAnimationCSS}
}

.custom-btn {
  background: ${bg};
  color: ${config.textColor};
  border-radius: ${config.borderRadius}px;
  ${config.gradientBorder 
  ? `border: ${config.borderWidth}px solid transparent;
  background-image: linear-gradient(${config.bgColor}, ${config.bgColor}), linear-gradient(var(--gradient-angle, ${config.gradientBorderAngle}deg), ${config.gradientBorderColor1}, ${config.gradientBorderColor2}${config.gradientBorderColor3 ? `, ${config.gradientBorderColor3}` : ''});
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;`
  : `border: ${config.borderWidth}px solid ${config.borderColor};`
}
  padding: ${config.customPaddingY}px ${config.customPaddingX}px;
  font-size: ${config.customFontSize}px;
  font-weight: 600;
  cursor: ${config.disabled ? 'not-allowed' : 'pointer'};
  box-shadow: ${shadow};
  ${widthStyle ? widthStyle.replace(/'/g, '') : ''}display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  opacity: ${config.disabled ? 0.5 : 1};
  transition: ${transitionStyle};
  ${config.gradientText && config.enableGradient ? `background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;` : ''}
}

.custom-btn:hover {
  ${hoverAnimationCSS}
}

.custom-btn:active {
  transform: scale(${config.whileTapScale});
}

.custom-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

${hoverColorsCSS}

${config.enableGlow ? `.glow-effect {
  position: absolute;
  width: 200px;
  height: 100px;
  background: ${config.glowColor};
  border-radius: 50%;
  filter: blur(${config.glowBlur}px);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
}

.button-wrapper:hover .glow-effect {
  opacity: ${config.glowOpacity / 100};
}` : ''}



${config.ripple ? `.ripple {
  position: absolute;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple-effect 0.6s ease-out;
  pointer-events: none;
  z-index: 3;
}

@keyframes ripple-effect {
  to {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}` : ''}

${config.loading ? `.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}` : ''}
</style>
${interactiveJS}`;

  return { reactTs, tailwind, htmlCss };
}