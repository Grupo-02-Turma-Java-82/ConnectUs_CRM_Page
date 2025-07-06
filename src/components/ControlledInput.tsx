import type { HTMLInputTypeAttribute } from "react";
import type { Control } from "react-hook-form";
import type { IconName } from "lucide-react/dynamic";
import { DynamicIcon } from "lucide-react/dynamic";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DynamicInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
  icon?: IconName;
}

export function ControlledInput({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  icon,
}: DynamicInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative w-64">
              {icon && (
                <DynamicIcon
                  name={icon}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5"
                />
              )}
              <Input
                className="pl-10 bg-background border-border"
                type={type}
                placeholder={placeholder}
                {...field}
                autoComplete="off"
              />
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
