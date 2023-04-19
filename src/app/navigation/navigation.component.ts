import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "../shared/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  email: string = "";

  constructor(private authenticationService: AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    let subscription = this.authenticationService.user.subscribe(
      (email: string) => {
        this.email = email;
      }
    )

    this.subscription.add(subscription);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login'])
  }
}
