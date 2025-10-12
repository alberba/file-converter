import Feature from "./Feature";
import Hero from "./Hero";
import Github from "../assets/github.svg";
import ArrowUp from "../assets/Arrowup";

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
      <main className="mt-58 flex w-full flex-col items-center gap-16 text-center">
        <Hero fileInputcallable={handleDrop} />
        <a href="#features-container">
          <ArrowUp className="h-8 animate-bounce text-black" />
        </a>
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
