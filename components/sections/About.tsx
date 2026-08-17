import Image from "next/image";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";

export default function About() {
    return (
        <section id="about" className="relative section-about">
            {/* 装飾線：画面幅いっぱい */}
            <Image
                src="/about-gold-decorative-line.svg"
                alt=""
                width={1440}
                height={125}
                className="absolute top-2.5 left-0 z-10 w-full h-auto"
            />

            <div className="inner">
                <FadeIn>    
                    <SectionHeading
                        en="About"
                        ja="美しいだけでは、終わらせない。"
                        jaSp={{
                            first: "美しいだけでは、",
                            second: "終わらせない。",
                        }}
                    />

                    <p className="body-text section-gap">
                        私たちは、企業やブランドが持つ価値を丁寧に見つめ、<br className="hidden md:block" />
                        デザインとテクノロジーによって、その魅力を最大限に引き出します。<br className="hidden md:block" />
                        見た目の美しさだけではなく、<br className="hidden md:block" />
                        「誰に、何を、どう伝えるか」まで考えたWeb体験を設計します。
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}