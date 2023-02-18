import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Role,
  RoleDeleteResponse,
  RoleListResponse,
  RolePermissionsInterface,
  RoleResponse,
} from '../interfaces/role.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RoleHttpService extends BaseService {
  createRole(payload: Role): Observable<RoleResponse> {
    return this.post<RoleResponse>('role', payload);
  }

  getRole(): Observable<RoleListResponse> {
    return this.get<RoleListResponse>('role');
  }
  // -- ??????????????????????????
  // getRolePermission() {
  //   return this.get('role/permission');
  // }

  getMyRole(): Observable<RoleListResponse> {
    return this.get<RoleListResponse>('role/my');
  }

  getAllRoles(): Observable<RoleResponse[]> {
    return this.get<RoleResponse[]>('role/all');
  }

  addPermissionsToRole(
    payload: RolePermissionsInterface
  ): Observable<RoleResponse> {
    return this.post<RoleResponse>('role/permissions');
  }

  getRoleById(id: string): Observable<RoleResponse> {
    return this.get<RoleResponse>(`role${id}`);
  }
  updateRoleById(id: string, payload: Role): Observable<RoleResponse> {
    return this.put<RoleResponse>(`role${id}`);
  }

  deleteRoleById(id: string): Observable<RoleDeleteResponse> {
    return this.delete<RoleDeleteResponse>(`role${id}`);
  }
  //------- ???????????????????????
  // getPermissionsByRoleId(id: string): Observable<RoleResponse[]> {
  //   return this.get<RoleResponse[]>(`role/permissions/${id}`);
  // }
}
