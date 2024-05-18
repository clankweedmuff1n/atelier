import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AuthState} from "./state/Auth.state";
import {Store} from "@ngxs/store";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  constructor(private router: Router, private store: Store) {
  }

  accessForAuthorizedVerifiedUser(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated: boolean = this.store.selectSnapshot(AuthState.isAuthenticated);
    const user: User | null = this.store.selectSnapshot(AuthState.user);
    /*if (user && !user.confirmed) {
      this.router.navigateByUrl("profile/verification", { state: { returnUrl: state.url } });
      return false;
    }*/

    if (!isAuthenticated) {
      this.router.navigateByUrl("profile/login", { state: { returnUrl: state.url } });
      return false;
    }
    return true;
  }

  accessForAuthorizedUnverifiedUser(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated: boolean = this.store.selectSnapshot(AuthState.isAuthenticated);
    const user: User | null = this.store.selectSnapshot(AuthState.user);

    if (isAuthenticated && user && !user.confirmed) {
      return true;
    }
    this.router.navigateByUrl("/", { state: { returnUrl: state.url } });
    return false;
  }

  restrictedAccessForAuthorizedUsers(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated: boolean = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (isAuthenticated) {
      this.router.navigateByUrl("/");
      return false;
    }
    return true;
  }
}

export const AccessForVerifiedUsersGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).accessForAuthorizedVerifiedUser(next, state);
}

export const RestrictedAccessForAuthorizedUsersGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).restrictedAccessForAuthorizedUsers(next, state);
}

export const AccessForUnverifiedUsersGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).accessForAuthorizedUnverifiedUser(next, state);
}
