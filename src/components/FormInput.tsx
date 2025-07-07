import type { ComponentProps } from "react";
import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps extends ComponentProps<"input"> {
  control: Control<any>;
  name: string;
  label: string;
}

export function FormInput({ control, name, label, ...rest }: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2 w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...rest} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
