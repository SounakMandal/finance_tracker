import { Dispatch, forwardRef, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileIcon } from './file-icon';

interface UploadContentProps {
  onFileUpload: Dispatch<SetStateAction<boolean>>;
}

export const UploadContent = forwardRef<HTMLInputElement, UploadContentProps>(
    ({ onFileUpload }, ref) => {
      return (
        <>
          <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
            <FileIcon className="w-12 h-12" />
            <span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
          </div>
          <div className="space-y-2 text-sm">
            <Label htmlFor="file" className="text-sm font-medium">File</Label>
            <Input
              ref={ ref }
              id="file" type="file" placeholder="File" accept="text/csv"
              onChange={ (event) => onFileUpload(!!event.target.files) }
            />
          </div>
        </>
      );
    }
);
