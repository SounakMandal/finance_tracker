import { useFormState } from 'react-hook-form';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useFormClose } from './form-context';

export function FormClose() {
  const { isDirty } = useFormState();
  const { closeButton } = useFormClose();
  return (
    <SheetFooter>
      <SheetClose
        asChild
        type='submit'
        onClick={ () => closeButton.current = 'save' }
        disabled={ !isDirty }
      >
        <Button>Save changes</Button>
      </SheetClose>
      <SheetClose asChild onClick={ () => closeButton.current = 'close' } >
        <Button>Close</Button>
      </SheetClose>
    </SheetFooter>
  );
}
