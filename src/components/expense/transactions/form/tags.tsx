import { useFormContext } from 'react-hook-form';
import { TagsBadgeProps, TransactionFormData } from './schema';
import { FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Each } from '@/components/utils/map';

function TagsDisplayArea({ field }: TagsBadgeProps) {
  return (
    <>
      <Each
        data={ field.value ? field.value : [] }
        mapper={ (value) => (
          <Badge>
            { value } <X size={ 10 } />
          </Badge>
        ) }
      />
      <Textarea />
    </>
  );
}

export function TagsFormField() {
  const { control } = useFormContext<TransactionFormData>();
  return (
    <FormField
      control={ control }
      name="tags"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <TagsDisplayArea field={ field } />
          <FormDescription>Tags can help you logically group your expense</FormDescription>
        </FormItem>
      ) }
    />
  );
}
