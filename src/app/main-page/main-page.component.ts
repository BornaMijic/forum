import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';
import {Subscription} from "rxjs";
import {ThreadService} from "../shared/services/thread.service";
import {AuthenticationService} from "../shared/services/authentication.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  email: string = "";

  threads: {id: string, name: string}[] = [];

  page = 1;

  errorMessage = false;

  private subscription: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService, private threadService: ThreadService) { }

  ngOnInit(): void {
    let subscription = this.authenticationService.user.subscribe(
      (email: string) => {
        this.email = email;
      }
    )

    this.subscription.add(subscription);

    subscription = this.threadService.getThreads().subscribe({
      next: (data) => {
        this.errorMessage = false;
        for(let key in data) {
          // @ts-ignore
          this.threads.push({...data[key], id: key})
        }
        this.threads.reverse();
      },
      error: () => {
        this.errorMessage = true;
      }
    });

    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
