import Feature from "./Feature";
import Hero from "./Hero";
import Github from "../assets/github.svg";

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
        <Hero fileInputcallable={handleDrop} />
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
        <Feature />
      </main>
      <footer className="flex w-full items-center justify-between py-4">
        <span>Made with ❤️ by Albert</span>
        <a href="https://github.com/alberba/file-converter" target="_blank">
          <img src={Github} alt="" className="h-8" />
        </a>
      </footer>
    </div>
  );
}
