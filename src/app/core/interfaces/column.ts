export interface Column {
  name: string;
  description: string;
  position: number;
  boardId?: number;
  taskStatus: string;
}
