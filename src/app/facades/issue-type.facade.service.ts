import { Injectable } from '@angular/core';
import { IssueType } from '../core/interfaces/issuetype.interface';

import { IssueTypeHttpService } from '../core/services/issue-type-http.service';

@Injectable({
  providedIn: 'root',
})
export class IssueTypeFacadeService {
  constructor(private issueTypeHttpService: IssueTypeHttpService) {}

  createIssueType(payload: IssueType) {
    return this.issueTypeHttpService.createIssueType(payload);
  }

  updateIssueType(id: number, payload: IssueType) {
    return this.issueTypeHttpService.updateIssueType(id, payload);
  }

  deleteIssueTypeById(id: number) {
    return this.issueTypeHttpService.deleteIssueTypeById(id);
  }

  getIssueTypes() {
    return this.issueTypeHttpService.getIssueTypes();
  }

  getIssueTypeById(id: number) {
    this.issueTypeHttpService.getIssueTypeById(id);
  }
}
