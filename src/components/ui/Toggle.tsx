// src/components/ui/Toggle.tsx
'use client';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export function Toggle({ label, checked, onChange, description }: ToggleProps) {
  return (
    <div className="rounded-[10px] p-[4px]">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[14px] font-medium text-[#4B4257] block">{label}</span>
          {description && (
            <span className="text-[12px] text-[#7a7090]">{description}</span>
          )}
        </div>
        <button
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-[26px] w-[46px] items-center rounded-full transition-all duration-300 ${
            checked ? 'bg-[#7BA488]' : 'bg-[#d8d4e0]'
          }`}
        >
          <span
            className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-all duration-300 shadow-md ${
              checked ? 'translate-x-[24px]' : 'translate-x-[4px]'
            }`}
          />
        </button>
      </div>
    </div>
  );
}