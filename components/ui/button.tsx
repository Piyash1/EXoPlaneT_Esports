import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.3)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-white/5 hover:text-white text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "bg-primary/10 border border-primary text-primary shadow-[0_0_10px_rgba(0,255,200,0.2)] hover:shadow-[0_0_25px_rgba(0,255,200,0.5)] hover:bg-primary/20",
        sku: "bg-primary text-black skew-x-[-12deg] hover:bg-primary/90 hover:skew-x-[-12deg] [&>span]:skew-x-[12deg]",
      },
      size: {
        default: "h-10 px-6 py-2 rounded-md",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        skew: "h-10 px-6", // Specific size for skew variant to avoid roundness issues
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      {
        variant: "sku",
        class: "rounded-sm", // Less rounded for skew look
      },
    ],
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = "button";

    // For skew variant, we need to un-skew the text content
    const content = variant === "sku" ? <span>{children}</span> : children;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
