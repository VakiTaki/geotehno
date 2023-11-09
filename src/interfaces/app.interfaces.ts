export interface IEvent {
  id: string | number;
  date: number;
  importance: string | number;
  equipment: string | number;
  message: string | number;
  responsible: string | number;
  completed: boolean;
}
