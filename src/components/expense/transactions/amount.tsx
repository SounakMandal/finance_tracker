import { AmountInputProps, FormFieldProps } from './schema';
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function AmountInput({ field }: AmountInputProps) {
  return (
    <Input
      id="amount"
      type='number'
      defaultValue={ field.value }
      onChange={ field.onChange } className="col-span-3" />
  );
}

export function AmountFormField({ form }: FormFieldProps) {
  return (
    <FormField
      control={ form.control }
      name="amount"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Expense Amount</FormLabel>
          <AmountInput field={ field } />
          <FormMessage />
        </FormItem>
      ) }
    />
  );
}
