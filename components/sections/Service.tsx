import { services } from "@/data/services";
import { serviceImages } from "@/data/serviceImages";
import ServiceCard from "../ui/ServiceCard";
import FadeIn from "../ui/FadeIn";

export default function Service() {
    return (
        <section id="service" className="section-service">
            {/* 見出し */}
            <div className="relative">
                {/* heading */}
                <FadeIn>
                    <h2 className="heading-en text-center">
                        Service
                    </h2>
                </FadeIn>

                <FadeIn>
                    <div className="inner relative z-10 -mt-[clamp(28px,4.86vw,70px)]">
                        {/* 3 cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1.5">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.title}
                                    title={service.title}
                                    description={service.description}
                                    image={service.image}
                                />
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* リード文 */}
            <FadeIn>
                <p className="service-lead text-center pt-12.5 md:pt-23 lg:pt-25">
                    {/* SP → br表示 → 改行 */}
                    {/* 768px〜  → br非表示 → 1行 */}
                    アイデアを、<br className="md:hidden" />
                    価値あるWeb体験へ。
                </p>

                {/* Moving image */}
                <div className="overflow-hidden pt-12.5 md:pt-23 lg:pt-25">
                    <div className="service-marquee">
                        {[...serviceImages, ...serviceImages].map((
                            image, index) => {
                            return (
                                <img
                                    key={`${image}-${index}`}
                                    src={image}
                                    alt=""
                                    className="service-marquee-image"
                                />
                            );
                        }
                        )}
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
