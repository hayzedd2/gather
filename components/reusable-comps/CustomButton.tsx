import { cn } from "@/lib/utils";
type variantT = "primary" | "secondary" | "destructive";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: variantT;
};
const getVariantClass = (variant: variantT) => {
  switch (variant) {
    case "primary":
      return "bg-black text-white bx-shadow";
    case "secondary":
      return "bg-white light-shadow  text-black cursor-pointer";
    case "destructive":
      return "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90";
  }
};

export function CustomButton({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        getVariantClass(variant),
        "text-[14px] font-[500] disabled:cursor-not-allowed disabled:opacity-70 py-[6px] px-[14px] cursor-pointer rounded-[100px] hover:opacity-90",
        className
      )}
      {...props}
    />
  );
}
