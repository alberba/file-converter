type ArrowUpProps = {
  className?: string;
};

export default function ArrowUp({ className }: ArrowUpProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="540"
      height="566.67"
      fill="none"
      viewBox="0 0 16.2 17"
      className={className}
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8.1 1.5v14m0-14-6.6 6m6.6-6 6.6 6"
        style={{ strokeWidth: 3, strokeDasharray: "none", strokeOpacity: 1 }}
      />
    </svg>
  );
}
