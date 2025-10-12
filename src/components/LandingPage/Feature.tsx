import feature1 from "@/assets/feat1.png";
import feature2 from "@/assets/feat2.webp";
import feature3 from "@/assets/feat3.webp";

export default function Feature() {
  return (
    <div id="features-container" className="relative pt-12 h-225 w-full">
      <section className="absolute flex max-w-4xl flex-col gap-4 self-start text-start">
        <img
          src={feature1}
          alt="Foto de la feature 1"
          className="aspect-[7/5] w-96 rotate-2 rounded-2xl drop-shadow-xl transition-all ease-in-out hover:-rotate-1"
        />
        <div className="max-w-md">
          <h4 className="text-3xl font-semibold">
            Optimiza tus imágenes para web en segundos
          </h4>
        </div>
      </section>
      <section className="absolute top-52 right-0 flex max-w-4xl flex-col items-end gap-4 self-end text-end">
        <img
          src={feature2}
          alt="Foto de la feature 2"
          className="aspect-[7/5] w-96 rounded-2xl drop-shadow-xl transition-all ease-in-out hover:rotate-3"
        />
        <div className="max-w-md">
          <h4 className="text-3xl font-semibold">
            Convierte tus imágenes entre formatos sin perder calidad
          </h4>
        </div>
      </section>
      <section className="absolute top-138 left-18 flex max-w-4xl flex-col gap-4 self-start text-start">
        <img
          src={feature3}
          alt="Foto de la feature 1"
          className="aspect-[7/5] w-96 -rotate-1 rounded-2xl drop-shadow-xl transition-all ease-in-out hover:rotate-2"
        />
        <div className="max-w-md">
          <h4 className="text-3xl font-semibold">
            Reescala el tamaño de la imagen a las dimensiones que tu desees
          </h4>
        </div>
      </section>
    </div>
  );
}
