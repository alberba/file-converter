import Feature from "./Feature";
import Hero from "./Hero";
import ArrowUp from "@/assets/ArrowUp";
import Footer from "./Footer";

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
          <ArrowUp className="h-8 rotate-180 animate-bounce text-black" />
        </a>
        <Feature />
      </main>
      <Footer />
    </div>
  );
}
