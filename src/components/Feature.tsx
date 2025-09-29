export default function Feature() {
  return (
    <div className="relative mt-12 w-full h-225">
      <section className="absolute flex max-w-4xl flex-col gap-4 self-start text-start">
        <div className="bg-accent aspect-[7/5] w-96 rotate-2 rounded-2xl transition-all ease-in-out hover:-rotate-1"></div>
        <div className="max-w-md">
          <h4 className="text-3xl font-semibold">
            Reescala el tamaño de la imagen a las dimensiones que tu desees
          </h4>
        </div>
      </section>
      <section className="absolute top-40 right-0 flex max-w-4xl flex-col items-end gap-4 self-end text-end">
        <div className="bg-accent aspect-[7/5] w-96 rounded-2xl transition-all ease-in-out hover:rotate-3"></div>
        <div className="max-w-md">
          <h4 className="text-3xl font-semibold">
            Reescala el tamaño de la imagen a las dimensiones que tu desees
          </h4>
        </div>
      </section>
      <section className="absolute top-130 left-18 flex max-w-4xl flex-col gap-4 self-start text-start">
        <div className="bg-accent aspect-[7/5] w-96 -rotate-1 rounded-2xl transition-all ease-in-out hover:rotate-2"></div>
        <div className="max-w-md">
          <h4 className="text-3xl font-semibold">
            Reescala el tamaño de la imagen a las dimensiones que tu desees
          </h4>
        </div>
      </section>
    </div>
  );
}
