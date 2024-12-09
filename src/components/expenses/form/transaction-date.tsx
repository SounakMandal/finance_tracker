import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { TransactionDatePickerProps, TransactionFormData } from './schema';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from 'lucide-react';
import { useFormContext, useFormState } from 'react-hook-form';

function TransactionDatePicker({ field }: TransactionDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant={ "outline" } className={ cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground") }>
            { field.value
              ? format(field.value, "PPP")
              : <span>Pick a date</span>
            }
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={ field.value }
          onSelect={ field.onChange }
          disabled={ (date: Date) => date > new Date() || date < new Date("1900-01-01") }
        />
      </PopoverContent>
    </Popover>
  );
}

export function TransactionDateFormField() {
  const { isDirty } = useFormState<TransactionFormData>();
  const { control } = useFormContext<TransactionFormData>();
  return (
    <FormField
      control={ control }
      name="date"
      render={ ({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Transaction Date</FormLabel>
          <TransactionDatePicker field={ field } />
          { isDirty && <FormMessage /> }
        </FormItem>
      ) }
    />
  );
}
