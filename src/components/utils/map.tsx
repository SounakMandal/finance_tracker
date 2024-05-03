import { JSX } from 'react';

interface EachProps<T> {
  data: T[];
  mapper: (item: T, index: number) => JSX.Element;
}

export function Each<T>({ data, mapper }: EachProps<T>) {
  return (
    <>{ data?.map(mapper) }</>
  );
}
