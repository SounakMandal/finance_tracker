import { z } from "zod";
import { ControllerRenderProps } from 'react-hook-form';

export const FormSchema = z.object({
  type: z
    .string({
      required_error: "Please select an expense category.",
    }),
  amount: z.coerce
    .number({
      required_error: "Please select a valid amount."
    }),
  date: z
    .date({
      required_error: "A transaction date is required.",
    }),
  description: z
    .string()
    .optional(),
  tags: z
    .array(z.string())
    .optional()
});

export type TransactionFormData = z.infer<typeof FormSchema>;

export interface TransactionDatePickerProps {
  field: ControllerRenderProps<TransactionFormData, "date">;
}

export interface AmountInputProps {
  field: ControllerRenderProps<TransactionFormData, "amount">;
}

export interface ExpenseTypeSelectProps {
  field: ControllerRenderProps<TransactionFormData, "type">;
}

export interface DescriptionTextAreaProps {
  field: ControllerRenderProps<TransactionFormData, "description">;
}

export interface TagsBadgeProps {
  field: ControllerRenderProps<TransactionFormData, "tags">;
}
