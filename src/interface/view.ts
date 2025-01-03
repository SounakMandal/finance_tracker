export interface View {
  _id: string;
  user_id: string;
  name: string;
  filters: Record<string, any>;
  insights: Record<string, any>;
  last_accessed: Date;
  frequency: number;
}
