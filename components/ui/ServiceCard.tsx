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
            {/* img */}
            <img 
                src={image} 
                alt=""
                className="block w-full aspect-square object-cover"
            />

            {/* Title */}
            <div className="px-8 py-7">
                <h4 className="service-title">
                    {title}
                </h4>
                <p className="description pt-3.5">
                    {description}
                </p>
            </div>
        </article>
    )
};
