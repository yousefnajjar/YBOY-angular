import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean 
    | UrlTree {
    //true -->if there is a token
    const token = localStorage.getItem('token');
    if(token){
      //Admin/dashboard
      if(state.url.indexOf('admin') >=0){
        let user: any = localStorage.getItem('user');
        if(user){
          user = JSON.parse(user);
          if(user.role =='Admin'){
            this.toastr.success('Welcome');
            return true;
          }
          else  {
            this.router.navigate(['userunauthoriz']);
           return false;
          }
        } else {
          this.toastr.warning('role name is undfined ');
          return false;
        }
      }else if(state.url.indexOf('driver') >=0){
        let user: any = localStorage.getItem('user');
        if(user){
          user = JSON.parse(user);
          if(user.role =='Driver'){
            this.toastr.success('Welcome');
            return true;
          }
          else  {
            this.router.navigate(['userunauthoriz']);
           return false;
          }
        } else {
          this.toastr.warning('role name is undfined ');
          return false;
        }
      }else if(state.url.indexOf('chef') >=0){
        let user: any = localStorage.getItem('user');
        if(user){
          user = JSON.parse(user);
          if(user.role =='Chef'){
            this.toastr.success('Welcome');
            return true;
          }
          else  {
            this.router.navigate(['userunauthoriz']);
           return false;
          }
        } else {
          this.toastr.warning('role name is undfined ');
          return false;
        }
      }
    return true;
    } else {
      this.router.navigate(['auth/login']);
     this.toastr.warning('Please login !!');
     return false;
    }
  }
  
}
