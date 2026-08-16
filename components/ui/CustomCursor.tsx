"use client";

import { useEffect, useState } from "react";


export default function CustomCursor() {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            })
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div 
            className="pointer-events-none fixed left-0 top-0 z-9999 hidden md:block"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            >
            <div className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text" />
        </div>
    )
};
