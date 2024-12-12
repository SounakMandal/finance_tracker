import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseTypeSelectProps, TransactionFormData } from './schema';
import { useFormContext, useFormState } from 'react-hook-form';
import { ExpenseType } from '../expense-type';

function ExpenseTypeSelectInput({ field }: ExpenseTypeSelectProps) {
  return (
    <Select onValueChange={ field.onChange } defaultValue={ field.value }>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
      </FormControl>
      <ExpenseType />
    </Select>
  );
}

export function ExpenseTypeFormField() {
  const { isDirty } = useFormState<TransactionFormData>();
  const { control } = useFormContext<TransactionFormData>();
  return (
    <FormField
      control={ control }
      name="type"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Expense Type</FormLabel>
          <ExpenseTypeSelectInput field={ field } />
          <FormDescription>You can manage your expense categories here</FormDescription>
          { isDirty && <FormMessage /> }
        </FormItem>
      ) }
    />);
}
