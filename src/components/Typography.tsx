import React, { ReactNode } from 'react';

interface TypographyProps {
  variant: 'title' | 'description'; 
  children: ReactNode; 
  color?: string;
  className?: string;
  lineClamp?: number;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, color, className, lineClamp }) => {
  const defaultclassName = variant === 'title' ? 'text-xl font-bold' : 'text-base text-gray-600 ';
  const lineClampClassName = lineClamp ? `line-clamp-${lineClamp} overflow-hidden` : '';
  const finalClassName = `${defaultclassName} ${className} ${lineClampClassName}`

  return <div className={finalClassName} style={variant === 'description' && color ? { color } : undefined}>{children}</div>;
};

export default Typography;
