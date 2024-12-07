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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useFormContext, useFormState } from 'react-hook-form';
import { ExpenseCategorySelectProps, ExpenseTypeFormData } from './schema';

function ExpenseType() {
  return (
    <SelectContent>
      <SelectItem value="needs">Needs</SelectItem>
      <SelectItem value="wants">Wants</SelectItem>
    </SelectContent>
  );
}

function ExpenseTypeSelectInput({ field }: ExpenseCategorySelectProps) {
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

export function ExpenseCategoryFormField() {
  const { isDirty } = useFormState<ExpenseTypeFormData>();
  const { control } = useFormContext<ExpenseTypeFormData>();
  return (
    <FormField
      control={ control }
      name="category"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Expense Category</FormLabel>
          <ExpenseTypeSelectInput field={ field } />
          <FormDescription>Expense types are further categorized into needs and wants</FormDescription>
          { isDirty && <FormMessage /> }
        </FormItem>
      ) }
    />
  );
}
