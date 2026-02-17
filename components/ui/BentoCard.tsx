// components/ui/BentoCard.tsx
import React from 'react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  className?: string;
  badge?: string;
}

export const BentoCard = ({ title, description, icon, color, className = "", badge }: BentoCardProps) => (
  <div className={`group relative bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all p-8 flex flex-col justify-between overflow-hidden ${className}`}>
    {badge && (
      <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-black uppercase rotate-3">
        {badge}
      </div>
    )}
    <div className={`w-16 h-16 ${color} border-[3px] border-black flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-black uppercase mb-3 tracking-tight">{title}</h3>
      <p className="font-bold text-gray-600 leading-tight">{description}</p>
    </div>
  </div>
);