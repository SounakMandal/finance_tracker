import { useFormContext, useFormState } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AggregateTypeSelectProps, ExpenseTypeFormData } from './schema';

function AggregateType() {
  return (
    <SelectContent>
      <SelectItem value="individual">Individual</SelectItem>
      <SelectItem value="aggregate">Aggregate</SelectItem>
    </SelectContent>
  );
}

function AggregateTypeSelectInput({ field }: AggregateTypeSelectProps) {
  return (
    <Select onValueChange={ field.onChange } defaultValue={ field.value }>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
      </FormControl>
      <AggregateType />
    </Select>
  );
}

export function AggregateTypeFormField() {
  const { isDirty } = useFormState<ExpenseTypeFormData>();
  const { control } = useFormContext<ExpenseTypeFormData>();
  return (
    <FormField
      control={ control }
      name="aggregateType"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Aggregate Type</FormLabel>
          <AggregateTypeSelectInput field={ field } />
          <FormDescription>Expenses maybe to individual or aggregate</FormDescription>
          { isDirty && <FormMessage /> }
        </FormItem>
      ) }
    />
  );
}
