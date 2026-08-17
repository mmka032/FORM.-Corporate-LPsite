"use client";

import { useEffect, useState } from "react";

// PC（md:以上）限定で、標準の矢印カーソルの代わりに表示する丸いカスタムカーソル。
// globals.cssのbody { cursor: none }（md:以上のみ）とセットで機能する：
// ここでマウスに丸を追従させ、globals.css側で矢印を消しているため、
// SPでは両方とも無効（この丸はhidden、矢印は残したまま）になる
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
                // top/leftではなくtransform: translateで動かすのは、
                // レイアウト計算(reflow)を発生させず、マウス追従を滑らかにするため
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            >
            {/* -translate-x-1/2 -translate-y-1/2：丸の中心がマウス座標に来るよう、
                自分の幅・高さの半分だけ左上にずらしている */}
            <div className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text" />
        </div>
    )
};
