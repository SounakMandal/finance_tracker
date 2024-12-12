import { useFormContext, useFormState } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AmountInputProps, TransactionFormData } from './schema';

function AmountInput({ field }: AmountInputProps) {
  return (
    <FormControl>
      <Input
        type='number'
        defaultValue={ field.value }
        onChange={ field.onChange } className="col-span-3"
      />
    </FormControl>
  );
}

export function TransactionAmountFormField() {
  const { isDirty } = useFormState<TransactionFormData>();
  const { control } = useFormContext<TransactionFormData>();
  return (
    <FormField
      control={ control }
      name="amount"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Expense Amount</FormLabel>
          <AmountInput field={ field } />
          { isDirty && <FormMessage /> }
        </FormItem>
      ) }
    />
  );
}
