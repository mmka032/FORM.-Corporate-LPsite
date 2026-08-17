// スクロールで画面内に入ったらフェードインさせるラッパー
"use client";

import { useEffect, useRef, useState } from "react";

// スクロールで画面内に入ったタイミングで、フェードイン＋下からの浮き上がりを付与するラッパー。
// About/Service/Contactなど、複数セクションの見出しや本文をこれで包んで使い回している
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
                    // 一度表示したら監視をやめる＝スクロールで再び画面外に出ても
                    // アニメーションを繰り返さない、一度きりの演出にするため
                    observer.unobserve(element);
                }
            },
            {
                // 要素が15%見えた時点で発火させる（完全に画面内に入ってからだと反応が遅く感じるため）
                threshold: 0.15,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            // duration-1500・cubic-bezier(0.22,1,0.36,1)は「ゆっくり減速しながら止まる」動き。
            // Tailwind標準のeaseより緩やかにしたいため、値を直接指定している
            className={`transition-all duration-1500 ease-[cubic-bezier(0.22,1,0.36,1)] 
                ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} 
                ${className}`}
            >
            {children}
        </div>
    );
}
