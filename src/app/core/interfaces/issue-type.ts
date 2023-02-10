// import { IssueTypeColumn } from './issue-type column';
import { IssueTypeEnum } from '../enums/issue-type.enum';
import { IssueTypeColumn } from './issue-type column';

export interface IssueType {
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  type: IssueTypeEnum;
  issueTypeColumns: IssueTypeColumn[];
}
