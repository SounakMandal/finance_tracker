import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PropsWithChildren } from 'react';

export function AccordionStyledItem({ label, children }: PropsWithChildren<{ label: string; }>) {
  return (
    <AccordionItem value={ label } className="border-none">
      <AccordionTrigger className='hover:no-underline'>{ label }</AccordionTrigger>
      <AccordionContent>
        { children }
      </AccordionContent>
    </AccordionItem>
  );
}
