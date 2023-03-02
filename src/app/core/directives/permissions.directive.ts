import { Directive, Input, AfterViewInit, ElementRef } from '@angular/core';
import { AuthFacadeService} from "../../pages/auth/auth-facade.service";

@Directive({
  selector: '[appPermissions]',
  standalone: true
})
export class PermissionsDirective implements AfterViewInit{
  @Input() appPermissions: string[] = [];

  constructor(
    private authFacadeService: AuthFacadeService,
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  hasPermission(): boolean {
    const userPermissions = this.authFacadeService.permissions;

    return userPermissions.some(permission => this.appPermissions.includes(permission));
  }

  ngAfterViewInit(): void {
    console.log(this.elementRef.nativeElement)
    console.log(this.hasPermission())
    if (!this.hasPermission()) {
      this.elementRef.nativeElement.remove();
    }
  }

}
