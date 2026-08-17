"use client";

import { useState } from "react";
import HeaderCTA from "../ui/HeaderCTA";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full h-(--header-height-sp) py-2 box-border md:h-(--header-height-pc) md:py-5 sticky top-0 z-50">
            <div className="bg-page-bg/80 backdrop-blur-sm">
                <div className="inner h-full py-2
                            grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] 
                            items-center">
                    {/* logo */}
                    <h1 className="logo">
                        <a href="/">
                            FORM.
                        </a>
                    </h1>

                    {/* PC navigation */}
                    <nav className="hidden md:flex gap-20">
                        <a href="#about">About</a>
                        <a href="#service">Service</a>
                    </nav>

                    {/* PC CTA */}
                    <div className="hidden md:block justify-self-end">
                        <HeaderCTA />
                    </div>

                    {/* SP hamburger */}
                    <button
                        type="button"
                        // SP → hidden（表示・非表示）
                        // 768px以上 → flex
                        className="md:hidden relative
                            justify-self-end
                            w-10 h-10
                            p-0
                    "
                        aria-label={
                            isMenuOpen
                                ? "メニューを閉じる"
                                : "メニューを開く"
                        }
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <span className={`hamburger-line ${isMenuOpen ? "is-open" : ""}`} />
                        <span className={`hamburger-line ${isMenuOpen ? "is-open" : ""}`} />
                    </button>
                </div>
            </div>

            {/* SP menu */}
            <nav className={`fixed top-(--header-height-sp) left-0 w-full h-[calc(100vh-var(--header-height-sp))] 
                            box-border bg-page-bg flex flex-col items-center justify-center gap-20 
                            text-center z-100 transition-transform duration-400 ease-[ease] 
                            ${isMenuOpen ? "translate-y-0" : "translate-y-full"}`}
            >
                <a href="#about" onClick={() => setIsMenuOpen(false)}>
                    About
                </a>

                <a href="#service" onClick={() => setIsMenuOpen(false)}>
                    Service
                </a>

                <HeaderCTA />
            </nav>
        </header>
    );
}
