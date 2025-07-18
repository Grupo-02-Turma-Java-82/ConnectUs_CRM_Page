import type { ComponentProps } from "react";
import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface FormInputProps extends ComponentProps<"textarea"> {
  control: Control<any>;
  name: string;
  label: string;
}

export function TextareaInput({
  control,
  name,
  label,
  ...rest
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2 w-full resize-none">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} {...rest} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
