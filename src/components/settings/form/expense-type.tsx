import { useFormContext, useFormState } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ExpenseNameInputProps, ExpenseTypeFormData } from './schema';

function ExpenseTypeNameInput({ field }: ExpenseNameInputProps) {
  return (
    <FormControl>
      <Input
        type='string'
        className="col-span-3"
        defaultValue={ field.value }
        onChange={ field.onChange }
      />
    </FormControl>
  );
}

export function ExpenseTypeFormField() {
  const { isDirty } = useFormState<ExpenseTypeFormData>();
  const { control } = useFormContext<ExpenseTypeFormData>();
  return (
    <FormField
      control={ control }
      name="name"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Expense Type</FormLabel>
          <ExpenseTypeNameInput field={ field } />
          <FormDescription>The name with which your expense will be categorized</FormDescription>
          { isDirty && <FormMessage /> }
        </FormItem>
      ) }
    />
  );
}
