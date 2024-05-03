import { useFormState } from 'react-hook-form';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';
import { useFormClose } from './form-context';

export function FormClose() {
  const { isDirty } = useFormState();
  const { closeButton } = useFormClose();
  return (
    <SheetFooter>
      { isDirty &&
        <SheetClose
          type='submit'
          onClick={ () => closeButton.current = 'save' }
        >
          Save changes
        </SheetClose>
      }
      <SheetClose onClick={ () => closeButton.current = 'close' } >Close</SheetClose>
    </SheetFooter>
  );
}
