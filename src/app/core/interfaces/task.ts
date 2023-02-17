export interface Task {
  name: string;
  filedName: string;
  value: string;
  isRequired: boolean;
}

export interface Tasks {
  name: string;
  description: string;
  issueTypeId: number;
  taskProperty: TaskProperty[];
  epicId: number;
  boardId: number;
  boardColumnId: number;
  isBacklog: boolean;
  priority: string;
  taskStatus: string;
  assigneeId: number;
  reporterId: number;
}

export interface TaskProperty{
  name: string;
  filedName: string;
  value: string;
  isRequired: boolean
}
