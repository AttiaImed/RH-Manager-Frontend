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
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: TokenStorageService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private jwtHelper: JwtHelperService,
    private entryService: EntryService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const jwtToken = this.authService.getToken();
    console.log(jwtToken);
    const userRole = this.authService.getRole();
    if (!jwtToken || this.jwtHelper.isTokenExpired(jwtToken)) {
      // check Wither the real problem is the expiration of the
      if(this.jwtHelper.isTokenExpired(this.authService.getToken())){
        this._snackBar.open("Your session is Expired please try to loggIn again", '❌');
        this.entryService.signOut();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }else{
        this._snackBar.open("Access Denied !!!", '❌');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }
    }else{
      if(route.data['role'] && route.data['role'].indexOf(userRole) === -1){
        this._snackBar.open("Access Denied,Role Not Granted !!!", '❌');
        this.router.navigate(['/Dashboard'], { queryParams: { returnUrl: state.url } })
        return false;
      }
      else{
        return true;
      }
    }
    console.log(jwtToken)
    return true;
  }

}
