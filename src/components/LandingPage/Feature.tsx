import type { FeatureData } from "@/types/types";

export default function Feature({
  image,
  title,
  sectionClasses,
  alignment,
  imageClassName,
}: FeatureData) {
  const alignmentClasses = {
    left: "lg:items-start lg:self-start lg:text-start",
    right: "lg:items-end lg:self-end lg:text-end",
  };

  return (
    <section
      className={`mx-8 flex max-w-lg flex-col items-center gap-4 md:m-0 lg:absolute lg:max-w-4xl ${alignmentClasses[alignment]} ${sectionClasses}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className={`aspect-[7/5] rounded-2xl drop-shadow-xl transition-all ease-in-out lg:w-96 ${imageClassName}`}
      />
      <div className="max-w-lg">
        <h4 className="text-2xl font-semibold lg:text-3xl">{title}</h4>
      </div>
    </section>
  );
}
