interface ModelBadgeProps {
  models: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  /**
 * "plate" (default) and "text" both render the model codes as the same
 * red Montserrat text so model identifiers remain consistent across views.
   */
  variant?: "plate" | "text";
}

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

  return (
    <div className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`} data-testid="badge-model-list">
      {codes.map((code) => (
        <span
          key={code}
          className={`font-sans font-normal uppercase tracking-wider leading-none text-primary ${textSizeClasses[size]}`}
          data-testid={`badge-model-${code}`}
        >
          {code}
        </span>
      ))}
    </div>
  );
}
