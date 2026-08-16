"use client";

import { useEffect, useRef, useState } from "react";

type FadeInProps = {
    children: React.ReactNode;
    className?: string;
};

export default function FadeIn({
    children,
    className = "",
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible,setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if(!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`
                transition-all
                duration-1500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
                ${className}
            `}
        >
            {children}
        </div>
    );
}
