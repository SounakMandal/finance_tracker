import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion } from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { AmountFilter } from '../filters/amount';
import { Each } from '@/components/utils/map';
import { TagsFilter } from '../filters/tags';
import { DateFilter } from '../filters/date';
import { ExpenseTypeFilter } from '../filters/type';
import { useFilterStore } from '../filters/store';
import { type Table as TableType } from '@tanstack/table-core';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useViewMutation } from '@/hooks/useViewMutation';

export function TableFilters<TData>({ table }: { table: TableType<TData>; }) {
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);
  const [open, setOpen] = useState(false);
  const [viewName, setViewName] = useState('');
  const [count, setCount] = useState(Object.keys(filters).length);
  const { mutate } = useViewMutation();

  const applyFilters = () => {
    table.getAllColumns().forEach(column => {
      column.setFilterValue(filters[column.id]);
    });
    setCount(Object.keys(filters).length);
    setOpen(false);
  };

  const resetFilters = () => {
    setFilters({});
    table.getAllColumns().forEach(column => {
      column.setFilterValue(undefined);
    });
    setCount(0);
    setOpen(false);
  };

  return (
    <Popover open={ open } onOpenChange={ setOpen }>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter />Filter
          <Badge>{ count }</Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Accordion type="single" collapsible className="w-full">
          <Each
            data={ table.getAllColumns() }
            mapper={ (column) => {
              switch (column.id) {
                case 'date':
                  return <DateFilter key={ column.id } column={ column } />;
                case 'type':
                  return <ExpenseTypeFilter key={ column.id } column={ column } />;
                case 'amount':
                  return <AmountFilter key={ column.id } column={ column } />;
                case 'tags':
                  return <TagsFilter key={ column.id } column={ column } />;
                default:
                  return <React.Fragment key={ column.id }></React.Fragment>;
              }
            } }
          />
          <div>
            <div className='flex gap-2 w-full'>
              <Button
                className='w-1/2'
                variant='secondary'
                onClick={ event => {
                  event.preventDefault();
                  applyFilters();
                } }
              >Apply</Button>
              <Button
                className='w-1/2'
                variant='secondary'
                onClick={ event => {
                  event.preventDefault();
                  resetFilters();
                } }
              >Reset</Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='mt-4 w-full'>Save as View</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Save View</DialogTitle>
                  <DialogDescription>Save a snapshot of the result to easily access later</DialogDescription>
                </DialogHeader>
                <Input
                  defaultValue={ viewName }
                  placeholder="View Name"
                  onChange={ event => setViewName(event.target.value) }
                />
                <DialogFooter className="sm:justify-start">
                  <Button
                    onClick={ () => {
                      applyFilters();
                      mutate({ viewName });
                    } }
                  >
                    Save View
                  </Button>
                  <DialogClose asChild><Button>Cancel</Button></DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Accordion>
      </PopoverContent>
    </Popover>
  );
};
