import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Each } from '@/components/utils/map';

interface TagsDisplayAreaProps {
  tags?: string[];
  onChange: (tags: string[] | undefined) => void;
}

export function TagsDisplayArea({ tags, onChange }: TagsDisplayAreaProps) {
  const [pendingDataPoint, setPendingDataPoint] = useState("");

  useEffect(() => {
    if (pendingDataPoint.includes(",")) {
      const newDataPoints = new Set([
        ...tags ?? [],
        ...pendingDataPoint.split(",").map((chunk) => chunk.trim()),
      ]);
      onChange(Array.from(newDataPoints));
      setPendingDataPoint("");
    }
  }, [pendingDataPoint, tags]);

  const addPendingDataPoint = () => {
    if (pendingDataPoint) {
      const newDataPoints = new Set([...tags ?? [], pendingDataPoint]);
      onChange(Array.from(newDataPoints));
      setPendingDataPoint("");
    }
  };

  return (
    <div className="has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neutral-950 has-[:focus-visible]:ring-offset-2 dark:has-[:focus-visible]:ring-neutral-300 min-h-10 flex w-full flex-wrap gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white  disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950">
      <Each
        data={ tags ? tags : [] }
        mapper={ (tag, index) => (
          <span key={ index }>
            <Badge>
              { tag }
              <div
                onClick={ () => {
                  const updatedValue = tags?.filter((_, clearIndex) => clearIndex !== index);
                  onChange(updatedValue);
                } }
                className='cursor-pointer ml-1'
              >
                <X size={ 14 } />
              </div>
            </Badge>
          </span>
        ) }
      />
      <input
        type='string'
        value={ pendingDataPoint }
        onChange={ (event) => setPendingDataPoint(event.target.value) }
        onKeyDown={ (event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addPendingDataPoint();
          } else if (event.key === "Backspace" && pendingDataPoint.length === 0 && tags?.length) {
            event.preventDefault();
            onChange(tags?.slice(0, -1));
          }
        } }
        className='bg-transparent border-0 flex-1 outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400 '
      />
    </div>
  );
}
