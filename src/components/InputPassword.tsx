
  import { Input } from "./ui/input";
  import { EyeIcon, EyeOffIcon } from "lucide-react";
  import { useState } from "react";
  import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
  
  interface Props {
    form: any;
    className?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
  }
  
  export function InputPassword({
    form,
    className,
    name = "password",
    placeholder = "Contraseña",
    disabled = false,
  }: Props) {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <Input
                  className={className}
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  