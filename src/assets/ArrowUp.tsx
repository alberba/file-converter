type ArrowUpProps = {
  className?: string;
};

export default function ArrowUp({ className }: ArrowUpProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      aria-label="Flecha desplegable"
      viewBox="0 0 16.2 17"
      className={className}
    >
      <path
        stroke="currentColor"
        d="M8.1 1.5v14m0-14-6.6 6m6.6-6 6.6 6"
        style={{
          strokeWidth: 3,
          strokeDasharray: "none",
          strokeOpacity: 1,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      />
    </svg>
  );
}
