// src/components/ui/ColorPicker.tsx
'use client';

import { Pipette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="mb-[4px]">
      <label className="text-[14px] font-medium text-[#4B4257] block mb-[10px]">{label}</label>
      <div className="flex gap-[10px] items-center">
        <div className="relative group">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-[44px] h-[44px] rounded-[10px] cursor-pointer"
          />
          <Pipette className="w-[14px] h-[14px] text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-[14px] py-[10px] bg-[#F3F1F5] border border-[#d8d4e0] rounded-[10px] text-[14px] font-mono text-[#4B4257] focus:outline-none focus:ring-2 focus:ring-[#7BA488]/30 focus:border-[#7BA488] transition-all"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}