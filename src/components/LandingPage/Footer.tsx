import Github from "@/assets/github.svg";

export default function Footer() {
  return (
    <footer className="mt-8 flex w-full items-center justify-between py-4">
      <span>
        Made with ❤️ by{" "}
        <a className="font-semibold" href="https://github.com/alberba">
          alberba
        </a>
      </span>
      <div className="flex items-center gap-6">
        <a
          href="https://github.com/alberba/file-converter/issues"
          className="underline"
          target="_blank"
        >
          Reportar bug
        </a>
        <a href="https://github.com/alberba/file-converter" target="_blank">
          <img src={Github} alt="" className="h-8" />
        </a>
      </div>
    </footer>
  );
}
