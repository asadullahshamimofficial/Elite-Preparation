import React, { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

export default function CollapsibleSection({
  title,
  icon: Icon = BookOpen,
  borderColor = 'var(--accent-emerald)',
  titleColor,
  titleAr,
  defaultOpen = true,
  children
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="section-block transition-all duration-200"
      style={{ borderLeftColor: borderColor }}
    >
      {/* Clickable Header for Section Accordion */}
      <div
        className="section-title cursor-pointer select-none flex items-center justify-between gap-2"
        style={{ color: titleColor || borderColor }}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "সেকশন বন্ধ করুন" : "সেকশন খুলুন"}
      >
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {Icon && <Icon size={18} className="shrink-0" />}
          <span className="font-bold">{title}</span>
          {titleAr && <span className="font-serif text-xs opacity-80 mr-auto">({titleAr})</span>}
        </div>

        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center bg-black/30 hover:bg-amber-500/20 text-current transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown size={14} />
        </div>
      </div>

      {/* Expandable Content Body */}
      {isOpen && (
        <div className="pt-2 animate-in fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
