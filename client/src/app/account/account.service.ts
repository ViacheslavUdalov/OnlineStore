import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, of, ReplaySubject} from "rxjs";
import {IUser} from "../shared/models/User";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {IAddress} from "../shared/models/address";
import {add} from "ngx-bootstrap/chronos";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private  http: HttpClient, private router: Router) { }
  login(values: any) {
    return this.http.post(this.baseURL + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }
  register(values: any) {
    return this.http.post(this.baseURL + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }
  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/')
  }
  checkEmailExist(email: string) {
    return this.http.get(this.baseURL + 'account/emailexist?email=' + email);
  }
  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseURL + 'account', {headers}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }
  getUserAddress() {
    return this.http.get<IAddress>(this.baseURL + 'account/address');
  }
  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseURL + 'account/address', address);
  }
}
