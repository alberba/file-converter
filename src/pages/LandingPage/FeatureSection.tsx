import feature1 from "@/assets/feat1.webp";
import feature2 from "@/assets/feat2.webp";
import feature3 from "@/assets/feat3.webp";
import Feature from "./Feature";
import type { FeatureData } from "@/types/types";

export default function FeatureSection() {
  const features: FeatureData[] = [
    {
      title: "Optimiza tus imágenes para web en segundos",
      image: {
        src: feature1,
        alt: "Imagen que demuestra una optimización de imágenes",
      },
      alignment: "left" as const,

      imageClassName: "rotate-2 hover:-rotate-1",
    },
    {
      title: "Convierte tus imágenes entre formatos sin perder calidad",
      image: {
        src: feature2,
        alt: "Imagen de las distintas extensiones que soporta la página",
      },
      alignment: "right" as const,
      sectionClasses: "lg:top-52 lg:right-0",
      imageClassName: "hover:rotate-3",
    },
    {
      title: "Reescala el tamaño de la imagen a las dimensiones que tu desees",
      image: {
        src: feature3,
        alt: "Foto que demuestra la posibilidad de reescalado de imágenes",
      },
      alignment: "left" as const,
      sectionClasses: "lg:top-138 lg:left-18",
      imageClassName: "-rotate-1 hover:rotate-2",
    },
  ];

  return (
    <div
      id="features-container"
      className="static mx-auto flex w-full flex-col items-center justify-center gap-12 pt-12 lg:relative lg:block lg:h-225"
    >
      {features.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))}
    </div>
  );
}
