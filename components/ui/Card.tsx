import React from "react";

export const Card = ({ children, className = "", bgColor = "bg-white" }: { children: React.ReactNode, className?: string, bgColor?: string }) => (
  <div className={`${bgColor} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 ${className}`}>
    {children}
  </div>
);