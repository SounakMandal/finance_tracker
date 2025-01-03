import { useFilterStore } from '@/components/expenses/filters/store';
import { useMutation } from '@tanstack/react-query';
import { toast } from './use-toast';
import { updateView } from '@/actions/view';
import { View } from '@/interface/view';

export function useViewMutation() {
  const filters = useFilterStore((state) => state.filters);
  const saveView = async ({ viewName }: { viewName: string; }) => {
    const document: Partial<View> = {
      name: viewName,
      filters,
      last_accessed: new Date(),
      frequency: 1
    };
    await updateView(document);
  };
  return useMutation({
    mutationFn: saveView,
    onError: (_error, _variables, _context) => {
      console.error(_error);
      toast({
        title: 'Failure',
        variant: 'destructive',
        description: 'Failed to save view',
      });
    },
    onSuccess: (_result, _variables) => {
      toast({
        title: 'Success',
        description: 'View updated successfully',
      });
    },
  });
}
