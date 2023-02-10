import { Injectable } from '@angular/core';
import {Board} from "../interfaces/board";
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {IssueType} from "../interfaces/issue-type";
import {Project} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class IssueTypeService extends BaseService {


  createIssueType(payload: IssueType): Observable<IssueType> {
    return this.post<IssueType>('issue-type', payload);
  }
  update(id: string, issueType: IssueType): Observable<IssueType> {
    return this.put<IssueType>(`issue-type/${id}`, issueType);
  }
  deleteIssueType(id: string): Observable<IssueType> {
    return this.delete<IssueType>(`issue-type/${id}`);
  }

}
