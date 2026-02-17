import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, href, variant = 'primary', className, onClick }: ButtonProps) => {
  const baseStyles = "px-8 py-4 font-black text-xl uppercase tracking-wider transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-4 border-black inline-block cursor-pointer";
  
  const variants = {
    primary: "bg-[#FFB800] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]",
    secondary: "bg-[#FF4081] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]",
    accent: "bg-[#4CAF50] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return <Link href={href} className={combinedStyles}>{children}</Link>;
  }

  return <button onClick={onClick} className={combinedStyles}>{children}</button>;
};

export default Button;