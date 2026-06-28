// src/components/ui/ButtonPreview.tsx
'use client';

import React, { memo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useButtonStore } from '@/store/buttonStore';
import { buildButtonStyles } from '@/lib/styleBuilder';
import { Sun, Moon, Grid3X3, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Ripple компонент
function Ripple({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0.6 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: 20,
        height: 20,
        transform: 'translate(-50%, -50%)',
        background: color,
        zIndex: 3,
      }}
    />
  );
}

const ButtonPreviewInner = () => {
  const config = useButtonStore((state) => state.config);
  const previewBg = useButtonStore((state) => state.previewBg);
  const setPreviewBg = useButtonStore((state) => state.setPreviewBg);

  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [config.tiltIntensity, -config.tiltIntensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-config.tiltIntensity, config.tiltIntensity]);

  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const baseStyles = buildButtonStyles(config);

  const handleClick = (e: React.MouseEvent) => {
    if (config.disabled || config.loading) return;
    if (config.ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    if (config.magnetic && buttonRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;
      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      
      if (dist < config.magneticStrength * 2) {
        const strength = (config.magneticStrength * 2 - dist) / (config.magneticStrength * 2);
        setMagneticPos({
          x: distX * strength * 0.3,
          y: distY * strength * 0.3,
        });
      } else {
        setMagneticPos({ x: 0, y: 0 });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setMagneticPos({ x: 0, y: 0 });
  };

  const IconComponent: any = config.icon 
    ? (LucideIcons as any)[config.icon]
    : null;

  const bgClass = {
    light: 'bg-white',
    dark: 'bg-[#4B4257]',
    checkerboard: 'checkerboard',
  }[previewBg];

  const bgButtons = [
    { id: 'light' as const, icon: Sun },
    { id: 'dark' as const, icon: Moon },
    { id: 'checkerboard' as const, icon: Grid3X3 },
  ];

  const hoverVariants: any = {
    none: {},
    scale: { scale: config.whileHoverScale },
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

  // src/components/ui/ButtonPreview.tsx
// ... (весь код до return остаётся таким же)

  return (
    <div className={`relative w-full h-full min-h-[300px] rounded-xl overflow-hidden ${bgClass} transition-colors duration-500`}>
      {/* CSS для hover-смены цветов */}
      {config.enableHoverTransition && (
        <style>{`
          .hover-color-btn:hover {
            ${config.hoverBgColor && !config.enableGradient ? `background: ${config.hoverBgColor} !important;` : ''}
            ${config.hoverTextColor ? `color: ${config.hoverTextColor} !important;` : ''}
          }
          .hover-color-btn:hover .shimmer-effect {
            opacity: 0.8;
          }
        `}</style>
      )}

      {/* CSS анимация для вращающегося градиентного бордера */}
      {config.gradientBorder && config.animatedBorder && (
        <style>{`
          @keyframes rotateGradient {
            from { --gradient-angle: 0deg; }
            to { --gradient-angle: 360deg; }
          }
          .animated-gradient-border {
            animation: rotateGradient ${config.borderAnimationSpeed}s linear infinite;
          }
        `}</style>
      )}

      {/* Переключатель фона */}
      <div className="absolute top-4 right-4 z-30 flex gap-1 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl border border-[#d8d4e0] shadow-lg">
        {bgButtons.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setPreviewBg(id)}
            className={`p-2 rounded-lg transition-all ${
              previewBg === id
                ? 'bg-[#5E4A82] text-white shadow-md'
                : 'text-[#7a7090] hover:text-[#5E4A82] hover:bg-[#F3F1F5]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>

      {/* Контейнер для центрирования */}
      <div 
        ref={containerRef}
        className="flex items-center justify-center w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {previewBg === 'dark' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#5E4A82]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#7BA488]/15 rounded-full blur-3xl" />
          </>
        )}

        {/* Glow эффект */}
        {config.enableGlow && (
          <div
            className="absolute rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
            style={{
              width: 200,
              height: 100,
              background: config.glowColor,
              opacity: isHovered ? config.glowOpacity / 100 : 0,
              filter: `blur(${config.glowBlur}px)`,
            }}
          />
        )}

        <motion.div
          style={
            config.tilt3D
              ? { rotateX, rotateY, perspective: 1000, transformStyle: 'preserve-3d' }
              : config.magnetic
              ? { x: magneticPos.x, y: magneticPos.y }
              : {}
          }
          animate={entranceVariants[config.entranceAnimation] || {}}
          className="will-change-transform"
        >
          <motion.button
            ref={buttonRef}
            style={baseStyles}
            whileHover={hoverVariants[config.hoverAnimation] || {}}
            whileTap={{ scale: config.whileTapScale }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            disabled={config.disabled || config.loading}
            className={`relative ${config.gradientBorder && config.animatedBorder ? 'animated-gradient-border' : ''} ${config.enableHoverTransition ? 'hover-color-btn' : ''}`}
          >
            {/* Ripple эффекты */}
            {ripples.map((ripple) => (
              <Ripple key={ripple.id} x={ripple.x} y={ripple.y} color={config.rippleColor} />
            ))}

            {/* Содержимое кнопки */}
            <div className="relative z-10">
              {config.loading ? (
                <Loader2 className="w-5 h-5 animate-spin" color={config.textColor} />
              ) : (
                <>
                  {IconComponent && config.iconPosition === 'left' && (
                    <IconComponent 
                      className="flex-shrink-0" 
                      size={config.iconSize} 
                      color={config.textColor}
                    />
                  )}
                  <span>{config.text}</span>
                  {IconComponent && config.iconPosition === 'right' && (
                    <IconComponent 
                      className="flex-shrink-0" 
                      size={config.iconSize} 
                      color={config.textColor}
                    />
                  )}
                </>
              )}
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export const ButtonPreview = memo(ButtonPreviewInner);