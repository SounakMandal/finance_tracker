import { Toaster } from '@/components/ui/toaster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ManageLayout({
  children,
  expenses,
  settings,
}: {
  children: React.ReactNode;
  expenses: React.ReactNode;
  settings: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-8 lg:gap-6">
      { children }
      <Toaster />
      <Tabs defaultValue="expenses" className="w-full">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses">{ expenses }</TabsContent>
        <TabsContent value="investments">Change your investments here.</TabsContent>
        <TabsContent value="planning">Change your planning here.</TabsContent>
        <TabsContent value="settings">{ settings }</TabsContent>
      </Tabs>
    </main>
  );
}
