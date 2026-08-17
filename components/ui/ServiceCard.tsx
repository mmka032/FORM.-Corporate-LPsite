// Serviceセクションの1カード（画像＋タイトル＋説明文）

import Image from "next/image";

type ServiceCardProps = {
    title: string;
    description: string;
    image: string;
};

export default function ServiceCard({
    title,
    description,
    image,
}: ServiceCardProps) {
    return (
        <article className="bg-card-bg">
            {/* img：静止画1枚のみでアニメーションもないため、next/imageで最適化・遅延読み込みできる */}
            <div className="relative w-full aspect-square">
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                />
            </div>

            {/* Title */}
            <div className="px-8 py-7">
                <h3 className="service-title">
                    {title}
                </h3>
                <p className="description pt-3.5">
                    {description}
                </p>
            </div>
        </article>
    )
};
