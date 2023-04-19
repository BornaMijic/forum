import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../shared/services/authentication.service";
import {Subscription, map, switchMap} from "rxjs";
import * as moment from "moment";
import {ThreadService} from "../shared/services/thread.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit, OnDestroy {

  threadForm!: FormGroup;
  email: string = "";
  private readonly DATE_FORMAT: string = 'DD/MM/yyyy';
  private subscription: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService, private threadService: ThreadService, private router: Router) { }

  ngOnInit(): void {
    this.threadForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      post: new FormControl(null, [
        Validators.required,
      ])
    });

    let subscription = this.authenticationService.user.subscribe(
      (email: string) => {
        this.email = email;
      }
    )

    this.subscription.add(subscription);
  }

  createThread() {
    let message = this.threadForm.controls['post'].value;
    let title = this.threadForm.controls['post'].value;
    let id: string|null = null;
    if(this.email != "" && message.length > 0) {
      let post: { id?: string, email: string, message: string, date: string } = {
        email: this.email,
        message: message,
        date: moment.utc(moment()).toISOString()
      }
      let subscription = this.threadService.addThread(this.threadForm.controls['post'].value).pipe(
        switchMap((data: { name: string }) => {
          let id = data['name'];
          return this.threadService.addPost(post, id).pipe(map(() => id));
        })
      ).subscribe((value) => {
        
            this.router.navigate(['thread/', title, value]);
          
      })

      this.subscription.add(subscription)
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
