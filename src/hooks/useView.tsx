import { useFilterStore } from '@/components/expenses/filters/store';
import { useMutation } from '@tanstack/react-query';
import { toast } from './use-toast';
import { executePipeline } from '@/actions/view';

export function useView() {
  const filters = useFilterStore((state) => state.filters);
  const saveView = async ({ viewName }: { viewName: string; }) => {
    const pipeline = [
      {
        $match: {
          date: {
            $gte: new Date(filters.date[0]).toISOString(),
            $lte: new Date(filters.date[1]).toISOString(),
          }
        }
      },
      {
        $merge: {
          into: viewName,
          on: '_id',
          whenMatched: 'replace',
          whenNotMatched: 'insert'
        }
      },
    ];
    await executePipeline(pipeline);
  };
  return useMutation({
    mutationFn: saveView,
    onError: (_error, _variables, _context) => {
      console.error(_error);
      toast({
        title: 'Failure',
        variant: 'destructive',
        description: 'Failed to update expense',
      });
    },
    onSuccess: (_result, _variables) => {
      toast({
        title: 'Success',
        description: 'Expense updated successfully',
      });
    },
  });
}
