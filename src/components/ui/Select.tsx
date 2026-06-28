// src/components/ui/Select.tsx
'use client';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <div className="mb-[4px]">
      <label className="text-[14px] font-medium text-[#4B4257] block mb-[10px]">{label}</label>
      <div className="flex gap-[8px] flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-[16px] py-[8px] text-[13px] font-medium rounded-[8px] transition-all ${
              value === option.value
                ? 'bg-[#5E4A82] text-white shadow-md'
                : 'bg-[#F3F1F5] text-[#7a7090] hover:bg-[#E6E6FA]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}