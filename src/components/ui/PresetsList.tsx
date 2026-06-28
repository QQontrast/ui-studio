// src/components/ui/PresetsList.tsx
'use client';

import { useButtonStore } from '@/store/buttonStore';
import { buttonPresets } from '@/lib/presets';
import { Sparkles, Palette, Square, Box, Ghost } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Palette,
  Square,
  Box,
  Ghost,
};

export function PresetsList() {
  const { applyPreset } = useButtonStore();

  return (
    <div className="grid grid-cols-5 gap-2">
      {buttonPresets.map((preset) => {
        const Icon = iconMap[preset.icon] || Sparkles;
        return (
          <button
            key={preset.id}
            onClick={() => applyPreset(preset.config)}
            className="group relative flex flex-col items-center gap-1.5 p-3 bg-[#F3F1F5] hover:bg-gradient-to-br hover:from-[#E6E6FA] hover:to-[#F3F1F5] border border-[#d8d4e0] hover:border-[#5E4A82]/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#5E4A82]/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
              <Icon className="w-4 h-4 text-[#7a7090] group-hover:text-[#5E4A82] transition-colors duration-300" />
            </div>
            <span className="text-[9px] font-medium text-[#7a7090] group-hover:text-[#5E4A82] text-center leading-tight transition-colors duration-300">
              {preset.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}