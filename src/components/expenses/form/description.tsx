import { useFormContext } from 'react-hook-form';
import { DescriptionTextAreaProps, TransactionFormData } from './schema';
import { FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

function DescriptionTextArea({ field }: DescriptionTextAreaProps) {
  return (
    <Textarea
      value={ field.value }
      onChange={ field.onChange }
    />
  );
}

export function TransactionDescriptionFormField() {
  const { control } = useFormContext<TransactionFormData>();
  return (
    <FormField
      control={ control }
      name="description"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <DescriptionTextArea field={ field } />
          <FormDescription>An informative description helps you understand more about your expense</FormDescription>
        </FormItem>
      ) }
    />
  );
}
