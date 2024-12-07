import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Each } from '@/components/utils/map';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { TagsBadgeProps, TransactionFormData } from './schema';

function TagsDisplayArea({ field }: TagsBadgeProps) {
  const [pendingDataPoint, setPendingDataPoint] = useState("");

  useEffect(() => {
    if (pendingDataPoint.includes(",")) {
      const newDataPoints = new Set([
        ...field.value ?? [],
        ...pendingDataPoint.split(",").map((chunk) => chunk.trim()),
      ]);
      field.onChange(Array.from(newDataPoints));
      setPendingDataPoint("");
    }
  }, [pendingDataPoint, field]);

  const addPendingDataPoint = () => {
    if (pendingDataPoint) {
      const newDataPoints = new Set([...field.value ?? [], pendingDataPoint]);
      field.onChange(Array.from(newDataPoints));
      setPendingDataPoint("");
    }
  };

  return (
    <div>
      <Each
        data={ field.value ? field.value : [] }
        mapper={ (value, index) => (
          <span key={ index } className='p-1'>
            <Badge>
              { value }
              <div
                onClick={ () => {
                  const updatedValue = field.value?.filter((_, clearIndex) => clearIndex !== index);
                  field.onChange(updatedValue);
                } }
                className='cursor-pointer ml-1'
              >
                <X size={ 14 } />
              </div>
            </Badge>
          </span>
        ) }
      />
      <div className='mt-2'>
        <Input
          type='string'
          value={ pendingDataPoint }
          onChange={ (event) => setPendingDataPoint(event.target.value) }
          onKeyDown={ (event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              addPendingDataPoint();
            }
          } }
        />
      </div>
    </div>
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
