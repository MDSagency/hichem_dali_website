type DividerProps = {
  className?: string;
  centered?: boolean;
};

export default function Divider({ className = "", centered = true }: DividerProps) {
  return (
    <div
      className={`h-px bg-gold ${centered ? "mx-auto w-[60px]" : "w-full"} ${className}`}
      aria-hidden="true"
    />
  );
}
