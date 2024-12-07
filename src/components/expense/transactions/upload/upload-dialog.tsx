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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon } from './file-icon';

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
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
        </div>
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">File</Label>
          <Input id="file" type="file" placeholder="File" accept="text/csv" />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>{ close }</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
