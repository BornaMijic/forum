import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../shared/services/authentication.service";
import {Subscription} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  page = 1;
  errorMessage = false;

  private subscription: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,Validators.min(6), Validators.max(50)
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.min(6), Validators.max(50)
      ])
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  login() {
    this.errorMessage = false;
    let subscription = this.authenticationService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(
      {next: (data: {email: string}) =>
        {
          this.authenticationService.setUser(data.email);
          this.errorMessage = false;
          this.loginForm.reset();
          this.router.navigate([''])
        },
        error: () => {
          this.errorMessage = true;
        }
      }
    )

    this.subscription.add(subscription);

  }

}
