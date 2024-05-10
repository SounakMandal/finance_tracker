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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseTypeSelectProps, FormFieldProps } from './schema';

function ExpenseType() {
  return (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Needs</SelectLabel>
        <SelectItem value="rent">Rent</SelectItem>
        <SelectItem value="mortgage">Mortgage</SelectItem>
        <SelectItem value="insurance">Insurance</SelectItem>
        <SelectItem value="groceries">Groceries</SelectItem>
        <SelectItem value="utilities">Utilities</SelectItem>
        <SelectItem value="loan">Loan Repayments</SelectItem>
        <SelectItem value="transport">Transport</SelectItem>
      </SelectGroup>

      <SelectGroup>
        <SelectLabel>Wants</SelectLabel>
        <SelectItem value="hobby">Hobby</SelectItem>
        <SelectItem value="food">Food</SelectItem>
        <SelectItem value="drinks">Drinks</SelectItem>
        <SelectItem value="gift">Gift</SelectItem>
        <SelectItem value="subscription">Subscription</SelectItem>
        <SelectItem value="travel">Travel</SelectItem>
        <SelectItem value="shopping">Shopping</SelectItem>
      </SelectGroup>
    </SelectContent>
  );
}

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

export function ExpenseTypeFormField({ form }: FormFieldProps) {
  return (
    <FormField
      control={ form.control }
      name="category"
      render={ ({ field }) => (
        <FormItem>
          <FormLabel>Expense Type</FormLabel>
          <ExpenseTypeSelectInput field={ field } />
          <FormDescription>
            You can manage your expense categories in
          </FormDescription>
          <FormMessage />
        </FormItem>
      ) }
    />);
}
