import { Injectable } from '@angular/core';
import {DataStorageService} from "./data-storage.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private dataStorage: DataStorageService) { }

  user: BehaviorSubject<string> = new BehaviorSubject<string>("");

  login(email: string, password: string): Observable<{email: string}>{
    return this.dataStorage.login(email, password);
  }

  registration(email: string, password: string){
    return this.dataStorage.registration(email, password);
  }

  setUser(email: string) {
    sessionStorage.setItem("email", email);
    this.user.next(email);
  }

  logout() {
    sessionStorage.removeItem("email");
    this.user.next("");
  }

  autoLogin() {
    let email = sessionStorage.getItem("email");
    if(email) {
      this.user.next(email);
    }
  }
}
