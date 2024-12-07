import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { UploadContent } from './upload-content';
import { TransactionsTable } from '../table/transactions-table';
import { useDialog } from '@/components/wrapper/dialog/dialog-context';
import { parseCSV, readFile } from '@/utils/file';
import { toast } from '@/hooks/use-toast';
import { Expense } from '@/interface/expense';
import { columns } from './columns';
import { useSkipper } from '@/hooks/useSkipper';

function UploadStep() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setFileUpload] = useState(false);
  const { setStep, setData } = useDialog<Expense[]>();

  const handleFileInput = async () => {
    const fileList = fileInputRef.current?.files;
    if (fileList && fileList.length > 0) {
      for (const file of fileList) {
        try {
          const content = await readFile(file);
          setData(parseCSV(content));
        } catch (error) {
          toast({
            title: "Failure",
            variant: "destructive",
            description: "Failed to read file contents"
          });
        }
      }
    }
    setStep(step => step + 1);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Upload File</DialogTitle>
        <DialogDescription>Upload a csv file to import all your expenses at once</DialogDescription>
      </DialogHeader>
      <UploadContent ref={ fileInputRef } onFileUpload={ setFileUpload } />
      <DialogFooter className="sm:justify-start">
        <Button
          disabled={ !fileInputRef.current?.files?.length }
          onClick={ handleFileInput }
        >Upload</Button>
        <DialogClose asChild><Button>Close</Button></DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

function ReviewStep() {
  const { data, setData, setStep, close } = useDialog<Expense[]>();
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  return (
    <DialogContent className="min-w-full">
      <DialogHeader>
        <DialogTitle>Review Expenses</DialogTitle>
        <DialogDescription>Modify your imports</DialogDescription>
      </DialogHeader>
      <TransactionsTable
        data={ data }
        columns={ columns }
        meta={ {
          updateData: (rowIndex: number, columnId: any, value: any) => {
            skipAutoResetPageIndex();
            setData(old => old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex]!,
                  [columnId]: value,
                };
              }
              return row;
            }));
          }
        } }
        autoResetPageIndex={ autoResetPageIndex }
      />
      <DialogFooter className="sm:justify-start">
        <Button onClick={ () => setStep(step => step - 1) }>Previous</Button>
        <DialogClose onClick={ () => setStep(0) } asChild>{ close }</DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export function UploadDialog() {
  const { step, trigger } = useDialog();
  return (
    <Dialog>
      <DialogTrigger asChild>{ trigger }</DialogTrigger>
      { step === 0 && <UploadStep /> }
      { step === 1 && <ReviewStep /> }
    </Dialog>
  );
}
