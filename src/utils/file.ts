import { parse } from 'csv-parse/sync';
import { DocumentSchema } from '@/components/expenses/upload/schema';
import { Expense } from '@/interface/expense';

export const readFile = (file: File) => {
  const result = DocumentSchema.safeParse(file);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};

export function parseCSV(content: string) {
  const rows: string[][] = parse(content, {
    columns: false,
    skip_empty_lines: true,
    delimiter: ',',
  });
  const headers = rows[0];
  rows.splice(0, 1);
  return rows.map((value) => {
    const data = {} as Expense;
    headers.forEach((header, index) => {
      const columnHeader = header.replaceAll(';', '');
      const cellValue = value[index].replaceAll(';', '');
      switch (columnHeader) {
        case 'date':
          data[columnHeader] = new Date(cellValue);
          break;
        case 'type':
          data[columnHeader] = cellValue;
          break;
        case 'tags':
          data[columnHeader] = cellValue.split(':');
          break;
        case 'description':
          data[columnHeader] = cellValue;
          break;
        case 'amount':
          data[columnHeader] = parseFloat(cellValue);
          break;
      }
    });
    return data;
  });
}
