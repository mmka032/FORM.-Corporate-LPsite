import Image from "next/image";
import FadeIn from "../ui/FadeIn";

export default function Hero() {
    return (
        <section className="relative h-[calc(100vh-var(--header-height-sp))] md:h-[calc(100vh-var(--header-height-pc))]">
            {/* 装飾線：画面幅いっぱい */}
            <Image
                src="/hero-gold-decorative-line.svg"
                alt=""
                width={1440}
                height={457}
                className="absolute top-2.5 left-0 z-10 w-full h-auto"
            />

            {/* 文字 */}
            <div className="relative z-10 inner h-full">
                <div className="h-full flex items-center">
                    <div className="w-full">
                        <FadeIn>
                            <h1 className="hero-title">
                                静かな強さを、<br />
                                デザインに。
                            </h1>

                            <p className="body-text pt-3.5 md:pt-7">
                                UI/UXからWebデザイン、実装まで。<br />
                                企業の価値を、伝わるWeb体験へ。
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
