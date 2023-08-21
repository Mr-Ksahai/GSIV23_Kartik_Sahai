import React, { ReactNode } from 'react';

interface TypographyProps {
  variant: 'title' | 'description'; 
  children: ReactNode; 
  color?: string;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, color, className }) => {
  const defaultclassName = variant === 'title' ? 'text-xl font-bold' : 'text-base text-gray-600';
  const finalClassName = `${defaultclassName} ${className}`

  return <div className={finalClassName} style={variant === 'description' && color ? { color } : undefined}>{children}</div>;
};

export default Typography;
