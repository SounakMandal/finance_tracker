import React from 'react';
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
import { UploadContent } from './upload-content';
import { TransactionsTable } from '../table/transactions-table';

interface UploadDialogProps {
  trigger: React.ReactNode;
  close: React.ReactNode;
}

export function UploadDialog({
  trigger,
  close
}: UploadDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{ trigger }</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>Upload a csv file to import all your expenses at once</DialogDescription>
        </DialogHeader>
        <UploadContent />
        {/* <TransactionsTable data={ [] } /> */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>{ close }</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
