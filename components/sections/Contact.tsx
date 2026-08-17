// Contactセクション（見出し＋案内文＋フォーム）

import Image from "next/image";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import ContactForm from "./ContactForm";

export default function Contact() {
    return (
        <section id="contact" className="relative section-contact">

            {/* 装飾線：画面幅いっぱい 上 */}
            <Image
                src="/contact-gold-decorative-line-1.svg"
                alt=""
                width={1440}
                height={470}
                className="absolute top-2.5 left-0 z-10 w-full h-auto"
            />

            <div className="inner relative z-10">

                {/* 見出し */}
                <FadeIn>
                    <SectionHeading
                        en="Contact"
                        ja="さあ、つくりはじめよう。"
                        jaSp={{
                            first: "さあ、",
                            second: "つくりはじめよう",
                        }}
                    />

                    {/* Contact content */}
                    {/* 他セクションはlg:で切り替えているが、ここは2カラム化(grid-cols-2)自体がxl:から始まるため、
                        余白もxl:に合わせている。lg:のままだとフォーム(width:550px)とテキストが窮屈になり、
                        デザインのズレが大きくなるための意図的な差異 */}
                    <div className="grid xl:grid-cols-2">

                        {/* テキスト */}
                        <div className="order-1">
                            <p className="body-text pt-12.5 md:pt-23 xl:pt-25">
                                Webサイトの新規制作からリニューアルまで。
                                <br className="hidden md:block" />
                                まだ具体的な内容が決まっていない段階でも、
                                <br className="hidden md:block" />
                                お気軽にご相談ください。
                            </p>
                        </div>

                        {/* フォーム */}
                        <div className="order-2 flex justify-center pt-12.5 xl:justify-end">
                            <ContactForm />
                        </div>

                        {/* FORM.：同一ページ内トップへ戻る導線 */}
                        <a href="#" className="logo order-3 mt-20 xl:mt-0">
                            FORM.
                        </a>

                    </div>
                </FadeIn>
            </div>

            {/* 装飾線：画面幅いっぱい 下 */}
            <Image
                src="/contact-gold-decorative-line-2.svg"
                alt=""
                width={1440}
                height={356}
                className="absolute left-0 bottom-20 z-0 w-full h-auto"
            />

        </section>
    );
}