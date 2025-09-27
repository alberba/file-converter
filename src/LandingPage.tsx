type LandingPageProps = {
  handleDrop: (
    dragEvent: React.DragEvent<HTMLElement> | React.FormEvent<HTMLElement>,
  ) => Promise<void>;
};

export default function LandingPage({ handleDrop }: LandingPageProps) {
  return (
    <div
      className="landing-container mx-auto h-screen max-w-7xl"
      onDrop={handleDrop}
      onDragOver={(ev) => ev.preventDefault()}
    >
      {/*<Header />*/}
      <main className="mt-58 flex w-full flex-col items-center gap-8 text-center">
        <h2 className="mx-auto max-w-5xl text-8xl font-bold">
          Convierte <strong>tus imágenes</strong> a cualquier formato
        </h2>
        <div className="flex items-center gap-2 text-2xl">
          <p>Simplemente arrastra tu imagen o </p>
          <label
            htmlFor="inputFile"
            className="bg-accent cursor-pointer rounded-4xl p-4 py-2 text-lg font-semibold text-white"
          >
            Haz click aquí
          </label>
          <input
            type="file"
            name="inputFile"
            id="inputFile"
            className="hidden"
            onInput={(e) => handleDrop(e)}
            accept=".jpg, .jpeg, .webp, .gif"
          />
        </div>
        <section>
          <article>
            <img src="" alt="" />
            <p className="text-sm text-gray-500">
              Soportamos JPG, PNG, WEBP y GIF
            </p>
          </article>
          <article>
            <p>
              Reescala el tamaño de la imagen a las dimensiones que tu desees
            </p>
            <img src="" alt="" />
          </article>
        </section>
      </main>
    </div>
  );
}
