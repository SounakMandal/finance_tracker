import { z } from "zod";
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

export const FormSchema = z.object({
  category: z
    .string({
      required_error: "Please select an expense category.",
    }),
  amount: z.coerce
    .number({
      required_error: "Please select a valid amount."
    }),
  transaction_date: z
    .date({
      required_error: "A transaction date is required.",
    })
    .default(() => new Date()),
});

export type TransactionFormData = z.infer<typeof FormSchema>;

export interface FormFieldProps {
  form: UseFormReturn<TransactionFormData, any, undefined>;
}

export interface TransactionDatePickerProps {
  field: ControllerRenderProps<TransactionFormData, "transaction_date">;
}

export interface AmountInputProps {
  field: ControllerRenderProps<TransactionFormData, "amount">;
}

export interface ExpenseTypeSelectProps {
  field: ControllerRenderProps<TransactionFormData, "category">;
}
