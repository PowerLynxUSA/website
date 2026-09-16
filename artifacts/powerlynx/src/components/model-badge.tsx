interface ModelBadgeProps {
  models: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  /**
   * "plate" (default): bold black-on-orange plates, styled to read like a
   * stamped equipment ID tag.
   * "text": bare bold red text in the brand primary color, no background —
   * used where the plate style is too heavy (e.g. dense catalog grid cards).
   */
  variant?: "plate" | "text";
}

const sizeClasses = {
  sm: "text-[11px] px-2 py-1 gap-1",
  md: "text-xs px-2.5 py-1.5 gap-1.5",
  lg: "text-sm px-3.5 py-2 gap-2",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function ModelBadge({ models, className = "", size = "md", variant = "plate" }: ModelBadgeProps) {
  const codes = models
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);

  if (variant === "text") {
    return (
      <div className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`} data-testid="badge-model-list">
        {codes.map((code) => (
          <span
            key={code}
            className={`font-mono font-extrabold uppercase tracking-wider leading-none text-primary ${textSizeClasses[size]}`}
            data-testid={`badge-model-${code}`}
          >
            {code}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap ${size === "lg" ? "gap-2" : "gap-1.5"} ${className}`} data-testid="badge-model-list">
      {codes.map((code) => (
        <span
          key={code}
          className={`inline-flex items-center justify-center bg-primary text-black font-mono font-extrabold uppercase tracking-wider leading-none border border-black/10 shadow-sm ${sizeClasses[size]}`}
          data-testid={`badge-model-${code}`}
        >
          {code}
        </span>
      ))}
    </div>
  );
}
