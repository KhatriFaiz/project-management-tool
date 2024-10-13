import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as UiFormField,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const FormField = ({ form, name, label, placeholder, type }) => {
  return (
    <UiFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea placeholder={placeholder || ""} {...field} rows={3} />
            ) : (
              <Input
                type={type || "text"}
                placeholder={placeholder || ""}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
