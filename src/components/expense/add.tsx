"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  category: z
    .string({
      required_error: "Please select an expense category.",
    }),
  amount: z.coerce
    .number({
      required_error: "Please select a valid amount."
    })
});

export function AddExpense() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{ JSON.stringify(data, null, 2) }</code>
        </pre>
      ),
    });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add an Expense</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add an Expense</SheetTitle>
          <SheetDescription>
            Add details of your expense
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) } className="w-full space-y-6">
              <FormField
                control={ form.control }
                name="category"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Type</FormLabel>
                    <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="drinks">Drinks</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage your expense categories in
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                ) }
              />

              <FormField
                control={ form.control }
                name="amount"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Amount</FormLabel>
                    <Input id="amount" type='number' defaultValue={ field.value } onChange={ field.onChange } className="col-span-3" />
                    <FormMessage />
                  </FormItem>
                ) }
              />

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
