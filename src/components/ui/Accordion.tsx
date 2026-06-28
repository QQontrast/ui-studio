// src/components/ui/Accordion.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Accordion({ title, icon, color, defaultOpen = false, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-[32px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-[10px]  flex items-center justify-between hover:bg-[#F3F1F5]/50 rounded-[12px] transition-all duration-300 group border-0"
      >
        <div className="flex items-center gap-[12px] min-w-0">
          <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 ${color} shadow-sm`}>
            {icon}
          </div>
          <span className="text-[20px] font-bold text-[#5E4A82] truncate">{title}</span>
        </div>
        
        <div className="flex-shrink-0 ml-[12px]">
          <motion.div
            className="w-[32px] h-[32px] rounded-full bg-[#F3F1F5] flex items-center justify-center group-hover:bg-[#E6E6FA] transition-colors duration-300"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="w-[16px] h-[16px] text-[#5E4A82]" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-[16px] pb-[16px] pt-[8px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}