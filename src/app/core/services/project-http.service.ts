import { Injectable } from '@angular/core';

import { Project } from '../interfaces';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectHttpService extends BaseService {}
