import {
  Directive,
  Input,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

import { AuthFacadeService } from '../../pages/auth/auth-facade.service';

@Directive({
  selector: '[appPermissions]',
  standalone: true,
})
export class PermissionsDirective implements AfterViewInit {
  @Input() appPermissions: string[] = [];

  constructor(
    private authFacadeService: AuthFacadeService,
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef
  ) {}

  // hasPermission(): boolean {
  //   this.authFacadeService.permissions$.subscribe((res) => {
  //     this.userPermissions = res;
  //   });

  //   return this.userPermissions.some((permission) =>
  //     this.appPermissions.includes(permission)
  //   );
  // }

  ngAfterViewInit(): void {
    this.authFacadeService.permissionsSubject.subscribe(
      (permissions: string[]) => {
        // console.log('look here');
        // console.log(permissions);
        const userPermissions = permissions.some((permission) =>
          this.appPermissions.includes(permission)
        );
        setTimeout(() => {
          if (!userPermissions) {
            this.elementRef.nativeElement.classList.add('hidden');
          } else {
            this.elementRef.nativeElement.classList.remove('hidden');
          }
          this.cdr.detectChanges();
        });

        console.log(this.elementRef.nativeElement);
        console.log(userPermissions);
      }
    );
  }
}

//--
