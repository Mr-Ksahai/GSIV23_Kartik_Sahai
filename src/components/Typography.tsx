import React, { ReactNode } from 'react';

interface TypographyProps {
  variant: 'title' | 'description'; 
  children: ReactNode; 
  color?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, color }) => {
  const className = `typography ${variant === 'title' ? 'text-xl font-bold' : 'text-base text-gray-600 line-clamp-2 overflow-hidden '}`;

  return <div className={className} style={variant === 'description' && color ? { color } : undefined}>{children}</div>;
};

export default Typography;
