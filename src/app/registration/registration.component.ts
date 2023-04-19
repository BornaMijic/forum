import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../shared/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: any;

  errorMessage = "";

  private subscription: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }


  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(50)
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(50)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ])
    }, {validators: this.matchPassword});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  matchPassword: ValidatorFn = (registration: AbstractControl):  ValidationErrors | null => {
    let password = registration.get('password')!.value;
    let confirmPassword = registration.get('confirmPassword')!.value
    return password === confirmPassword ? null : { matchPassword: true }
  }

  registration() {
    this.errorMessage = "";
    let password = this.registrationForm.controls['password'].value;
    let confirmPassword = this.registrationForm.controls['confirmPassword'].value;
    if (password == confirmPassword) {
      let subscription = this.authenticationService.registration(this.registrationForm.controls['email'].value, this.registrationForm.controls['password'].value).subscribe(
        {
          next: (data) => {
            this.errorMessage = "";
            this.registrationForm.reset();
            this.router.navigate(['login'])
          },
          error: (error) => {
            this.errorMessage = error.error.error.message;
          }
        }
      )

      this.subscription.add(subscription);
    }
  }
}
