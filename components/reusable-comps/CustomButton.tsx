import { cn } from "@/lib/utils"; // Utility function for classNames (optional)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function CustomButton({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-[100px] bg-black text-[14px] font-[500] hover:opacity-80 text-white py-[6px] px-[14px] cursor-pointer bx-shadow",
        className
      )}
      {...props}
    />
  );
}
