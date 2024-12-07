import { z } from 'zod';
import { ControllerRenderProps } from 'react-hook-form';

export const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter the name of your expense type"
    }),
  category: z
    .string({
      required_error: "Please select an expense category.",
    }),
  aggregateType: z
    .string({
      required_error: "Please enter whether this expense is an individual item or an aggregate item"
    })
});

export type ExpenseTypeFormData = z.infer<typeof FormSchema>;

export interface ExpenseNameInputProps {
  field: ControllerRenderProps<ExpenseTypeFormData, "name">;
}

export interface ExpenseCategorySelectProps {
  field: ControllerRenderProps<ExpenseTypeFormData, "category">;
}

export interface AggregateTypeSelectProps {
  field: ControllerRenderProps<ExpenseTypeFormData, "aggregateType">;
}
