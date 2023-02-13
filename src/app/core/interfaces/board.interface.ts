import { IssueType } from './issuetype.interface';
import { Project } from './project.interface';
// payload interface
export interface Board {
  name: string;
  description: string;
  position: number;
  columns: BoardColumn[];
}

export interface BoardColumn {
  name: string;
  description: string;
  position: number;
  boardId: number;
  taskStatus: TaskStatusEnum[];
  id?: number;
}

export interface TaskStatusEnum {
  ToDo: string;
  InProgress: string;
  Done: string;
}
//response interface
export interface BoardResponse {
  id: number;
  name: string;
  description: string;
  position: number;
  projectId: number;
  project: Project;
  columns: Column[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Column {
  id: number;
  name: string;
  description: string;
  position: number;
  boardId: number;
  board: string;
  tasks: Task[];
  taskStatus: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
  issueType: IssueType;
  epicId: number;
  epic: Epic;
  projectId: number;
  project: Project;
  boardId: number;
  board: string;
  boardColumnId: number;
  boardColumn: string;
  isBacklog: boolean;
  priority: string;
  taskStatus: string;
  assigneeId: number;
  assignee: Assignee;
  reporterId: number;
  reporter: Reporter;
  createdById: number;
  createdBy: CreatedBy;
  deletedById: number;
  deletedBy: DeletedBy;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Epic {
  id: number;
  name: string;
  description: string;
  projectId: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Assignee {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: string[];
}

export interface Reporter {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: string[];
}

export interface CreatedBy {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: string[];
}

export interface DeletedBy {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: string[];
}
