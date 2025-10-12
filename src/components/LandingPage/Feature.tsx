import feature1 from "@/assets/feat1.webp";
import feature2 from "@/assets/feat2.webp";
import feature3 from "@/assets/feat3.webp";

export default function Feature() {
  return (
    <div
      id="features-container"
      className="static mx-auto flex w-full flex-col items-center justify-center gap-12 pt-12 lg:relative lg:block lg:h-225"
    >
      <section className="mx-8 flex max-w-lg flex-col items-center gap-4 md:m-0 lg:absolute lg:max-w-4xl lg:items-start lg:self-start lg:text-start">
        <img
          src={feature1}
          alt="Foto de la feature 1"
          className="aspect-[7/5] rotate-2 rounded-2xl drop-shadow-xl transition-all ease-in-out hover:-rotate-1 lg:w-96"
        />
        <div className="max-w-lg">
          <h4 className="text-2xl font-semibold lg:text-3xl">
            Optimiza tus imágenes para web en segundos
          </h4>
        </div>
      </section>
      <section className="mx-8 flex max-w-lg flex-col items-center gap-4 md:m-0 lg:absolute lg:top-52 lg:right-0 lg:max-w-4xl lg:items-end lg:self-end lg:text-end">
        <img
          src={feature2}
          alt="Foto de la feature 2"
          className="aspect-[7/5] rounded-2xl drop-shadow-xl transition-all ease-in-out hover:rotate-3 lg:w-96"
        />
        <div className="max-w-lg">
          <h4 className="text-2xl font-semibold lg:text-3xl">
            Convierte tus imágenes entre formatos sin perder calidad
          </h4>
        </div>
      </section>
      <section className="mx-8 flex max-w-lg flex-col items-center gap-4 md:m-0 lg:absolute lg:top-138 lg:left-18 lg:max-w-4xl lg:items-start lg:self-start lg:text-start">
        <img
          src={feature3}
          alt="Foto de la feature 3"
          className="aspect-[7/5] -rotate-1 rounded-2xl drop-shadow-xl transition-all ease-in-out hover:rotate-2 lg:w-96"
        />
        <div className="max-w-lg">
          <h4 className="text-2xl font-semibold lg:text-3xl">
            Reescala el tamaño de la imagen a las dimensiones que tu desees
          </h4>
        </div>
      </section>
    </div>
  );
}
