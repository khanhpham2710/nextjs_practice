import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ className, type, ...props }, ref) => {
      const [showPassword, setShowPassword] = React.useState(false);
  
      return (
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className={cn("hide-password-toggle pe-10 ", className)}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
      );
    },
  );
  
  PasswordInput.displayName = "PasswordInput";
  
  export { PasswordInput };