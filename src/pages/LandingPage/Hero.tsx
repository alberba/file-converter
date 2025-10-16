type HeroProps = {
  fileInputcallable: (
    dragEvent: React.DragEvent<HTMLElement> | React.FormEvent<HTMLElement>,
  ) => Promise<void>;
};

export default function Hero({ fileInputcallable }: HeroProps) {
  return (
    <section className="flex flex-col items-center gap-8 text-center sm:h-auto sm:gap-12 sm:pb-6">
      <h1 className="mx-auto max-w-4xl text-5xl font-bold sm:text-6xl lg:max-w-5xl lg:text-8xl">
        Convierte <strong>tus imágenes</strong> a cualquier formato
      </h1>
      <div className="flex flex-col items-center gap-2 text-xl sm:flex-row sm:text-2xl">
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
          onChange={(e) => fileInputcallable(e)}
          accept=".jpg, .jpeg, .webp, .gif"
          data-testid="file-input"
        />
      </div>
    </section>
  );
}
