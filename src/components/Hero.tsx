type HeroProps = {
  fileInputcallable: (
    dragEvent: React.DragEvent<HTMLElement> | React.FormEvent<HTMLElement>,
  ) => Promise<void>;
};

export default function Hero({ fileInputcallable }: HeroProps) {
  return (
    <section className="flex flex-col items-center gap-8">
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
          onInput={(e) => fileInputcallable(e)}
          accept=".jpg, .jpeg, .webp, .gif"
        />
      </div>
    </section>
  );
}
