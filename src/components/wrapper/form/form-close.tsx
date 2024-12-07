import { useFormState } from 'react-hook-form';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';
import { useFormClose } from './form-context';
import { Button } from '@/components/ui/button';

export function FormClose() {
  const { isDirty } = useFormState();
  const { closeButton } = useFormClose();
  return (
    <SheetFooter>
      { isDirty &&
        <SheetClose
          asChild type='submit' onClick={ () => closeButton.current = 'save' }
        >
          <Button>Save changes</Button>
        </SheetClose>
      }
      <SheetClose asChild onClick={ () => closeButton.current = 'close' } >
        <Button>Close</Button>
      </SheetClose>
    </SheetFooter>
  );
}
