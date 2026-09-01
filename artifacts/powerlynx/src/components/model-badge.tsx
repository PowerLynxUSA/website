interface ModelBadgeProps {
  models: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-[11px] px-2 py-1 gap-1",
  md: "text-xs px-2.5 py-1.5 gap-1.5",
  lg: "text-sm px-3.5 py-2 gap-2",
};

/**
 * Displays one or more model / SKU codes as bold black-on-orange plates,
 * styled to read like a stamped equipment ID tag.
 */
export function ModelBadge({ models, className = "", size = "md" }: ModelBadgeProps) {
  const codes = models
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);

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
