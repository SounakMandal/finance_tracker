import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { TransactionFormData } from './schema';
import { TagsDisplayArea } from '../tags-display';

export function TagsFormField() {
  const { control } = useFormContext<TransactionFormData>();
  return (
    <FormField
      control={ control }
      name="tags"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <TagsDisplayArea tags={ field.value } onChange={ field.onChange } />
          <FormDescription>Tags can help you logically group your expense</FormDescription>
        </FormItem>
      ) }
    />
  );
}
