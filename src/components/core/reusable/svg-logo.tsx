export default function SvgLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
      aria-label="Logo"
    >
      <circle cx="16" cy="16" r="15" className="fill-background" />
      <circle
        cx="16"
        cy="16"
        r="6"
        className="stroke-foreground"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="16" cy="16" r="2" className="fill-foreground" />
    </svg>
  );
}
