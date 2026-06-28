// src/components/ui/IconPicker.tsx
'use client';

import * as Icons from 'lucide-react';

interface IconPickerProps {
  value: string | null;
  onChange: (icon: string | null) => void;
}

const popularIcons = [
  'ArrowRight', 'Star', 'Heart', 'Zap', 'ShoppingCart',
  'User', 'Mail', 'Phone', 'MapPin', 'Calendar',
  'Check', 'X', 'Plus', 'Minus', 'Search',
  'Menu', 'Home', 'Settings', 'LogOut', 'Download',
  'Upload', 'Edit', 'Trash', 'Copy', 'ExternalLink',
  'Github', 'Twitter', 'Facebook', 'Instagram', 'Linkedin',
];

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="mb-[4px]">
      <label className="text-[14px] font-medium text-[#4B4257] block mb-[10px]">Иконка</label>
      
      <div className="flex gap-[8px] mb-[10px]">
        <button
          onClick={() => onChange(null)}
          className={`flex-1 px-[12px] py-[8px] text-[13px] font-medium rounded-[8px] transition-all ${
            value === null
              ? 'bg-[#5E4A82] text-white'
              : 'bg-[#F3F1F5] text-[#7a7090] hover:bg-[#E6E6FA]'
          }`}
        >
          Нет иконки
        </button>
      </div>

      <div className="grid grid-cols-6 gap-[8px] max-h-[200px] overflow-y-auto p-[12px] bg-[#F3F1F5]/50 rounded-[10px]">
        {popularIcons.map((iconName) => {
          const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
          if (!IconComponent) return null;

          return (
            <button
              key={iconName}
              onClick={() => onChange(iconName)}
              className={`p-[8px] rounded-[6px] transition-all ${
                value === iconName
                  ? 'bg-[#5E4A82] text-white'
                  : 'bg-white text-[#7a7090] hover:bg-[#E6E6FA]'
              }`}
              title={iconName}
            >
              <IconComponent className="w-[18px] h-[18px]" />
            </button>
          );
        })}
      </div>
    </div>
  );
}