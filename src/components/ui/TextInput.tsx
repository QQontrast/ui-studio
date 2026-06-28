// src/components/ui/TextInput.tsx
'use client';

import { Type } from 'lucide-react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({ label, value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="mb-[4px]">
      <label className="text-[14px] font-medium text-[#4B4257] block mb-[10px] flex items-center gap-[8px]">
        <Type className="w-[14px] h-[14px] text-[#7BA488]" />
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-[14px] py-[10px] bg-[#F3F1F5] border border-[#d8d4e0] rounded-[10px] text-[14px] text-[#4B4257] focus:outline-none focus:ring-2 focus:ring-[#7BA488]/30 focus:border-[#7BA488] transition-all"
      />
    </div>
  );
}