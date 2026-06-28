// src/components/ui/Slider.tsx
'use client';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, step = 1, unit = '', onChange }: SliderProps) {
  return (
    <div className="mb-[4px]">
      <div className="flex justify-between items-center mb-[10px]">
        <label className="text-[14px] font-medium text-[#4B4257]">{label}</label>
        <span className="text-[12px] font-mono bg-[#E6E6FA] text-[#5E4A82] px-[10px] py-[3px] rounded-[6px] border border-[#5E4A82]/20 font-semibold">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}