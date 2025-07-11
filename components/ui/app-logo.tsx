export default function AppLogo({
  size,
  color = "white",
}: {
  size: string;
  color?: "white" | "black";
}) {
  const sizeClasses = {
    "5xl": "text-5xl",
    "4xl": "text-4xl",
    "3xl": "text-3xl",
    "2xl": "text-2xl",
    xl: "text-xl",
    lg: "text-lg",
    base: "text-base",
    sm: "text-sm",
    xs: "text-xs",
  };

  const textColor = color === "black" ? "text-gray-900" : "text-white";
  const secondaryColor = color === "black" ? "text-gray-600" : "text-white/90";

  return (
    <div
      className={`${textColor} ${
        sizeClasses[size as keyof typeof sizeClasses] || "text-5xl"
      } font-semibold tracking-wide select-none`}
    >
      <span className={secondaryColor}>si</span>
      <span className="text-[#6C5CE7]">,</span>
      <span className={secondaryColor}>poem</span>
    </div>
  );
}
