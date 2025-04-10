import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 24 }) => {
    return (
        <div className={cn('flex items-center justify-center', className)} style={{ width: size, height: size }}>
            <Image
                src="/logo.png"
                alt="Prism AI"
                width={size}
                height={size}
                className="w-full h-full object-contain"
                priority={true}
                quality={95}
            />
        </div>
    );
};

export default Logo; 