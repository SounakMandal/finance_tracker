import { PropsWithChildren } from 'react';

export default function Home({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-8 lg:gap-6">
      { children }
    </main>
  );
}
