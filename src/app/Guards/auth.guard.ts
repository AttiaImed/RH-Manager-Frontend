import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../Services/token.service';
import { EntryService } from '../Services/entry.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: TokenStorageService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private entryService: EntryService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const jwtToken = this.authService.getToken();
    console.log(jwtToken);
    const userRole = this.authService.getRole();
    if (!jwtToken) {
      this._snackBar.open('Access Denied !!!', '❌');
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this._snackBar.open('Access Denied,Role Not Granted !!!', '❌');
        this.router.navigate(['/Dashboard/Statistics'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      } else {
        return true;
      }
    }
    console.log(jwtToken);
    return true;
  }
}
