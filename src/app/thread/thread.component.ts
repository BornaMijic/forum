import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, max} from "rxjs";
import {AuthenticationService} from "../shared/services/authentication.service";
import {ThreadService} from "../shared/services/thread.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  email: string = "";

  private readonly DATE_FORMAT: string = 'DD-MM-yyyy HH:mm Z';

  errorMessage = false;

  posts: { id?: string, email: string, message: string, date: string }[] = [];

  postForm!: FormGroup;

  page = 1;

  threadId = null;

  threadTitle = null;

  idEdit: string|null = null;

  message: string = "";


  constructor(private authenticationService: AuthenticationService, private threadService: ThreadService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      post: new FormControl(null, [
        Validators.required,
      ]),
    });

    let subscription = this.authenticationService.user.subscribe(
      (email: string) => {
        this.email = email;
      }
    )

    this.subscription.add(subscription);

    this.threadTitle = this.route.snapshot.params['title']

    this.threadId = this.route.snapshot.params['id']

    if (this.threadId) {
      subscription = this.threadService.getPostsForThreadId(this.threadId).subscribe({
        next: (data) => {
          this.errorMessage = false;
          for (let key in data) {
            // @ts-ignore
            this.posts.push({...data[key], id: key})
          }

          for (let post of this.posts) {
            console.log(post.date);
            post.date = moment.utc(new Date(post.date)).local().format(this.DATE_FORMAT);
          }
        },
        error: () => {
          this.errorMessage = true;
        }
      });

      this.subscription.add(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

   pageChanged($event: number) {
    this.page = $event;
  }

  addPost() {
    let message = this.postForm.controls['post'].value;
    if (this.threadId != null && this.email != "" && message.length > 0) {
      let post: { id?: string, email: string, message: string, date: string } = {
        email: this.email,
        message: message,
        date: moment.utc(moment()).toISOString()
      }
      let subscription = this.threadService.addPost(post, this.threadId).subscribe(
        (data: { name: string }) => {
          post.id = data['name'];
          post.date = moment.utc(new Date(post.date)).local().format(this.DATE_FORMAT);
          this.posts.push(post);
          this.postForm.reset();


        }
      )

      this.subscription.add(subscription)
    }
  }

    editPost(id: string | undefined, i: number, post: { id?: string, email: string, message: string, date: string }) {
      post.date = moment.utc(moment()).toISOString()
    if (this.threadId != null && this.email != "" && post.id && post.message.length > 0) {
      post.message = this.message+ "(edited)";
    
      let subscription = this.threadService.editPost(post, this.threadId).subscribe(
        () => {
          this.posts[i].message = post.message;
          this.posts[i].date = moment.utc(new Date(post.date)).local().format(this.DATE_FORMAT);

        }
      )

      this.subscription.add(subscription);

      this.idEdit = null;

    }
  }

  deletePost(id: string | undefined, i: number, post: { id?: string, email: string, message: string, date: string }) {
    let deletePost: {email: string, message: string, date: string } = {email: post.email, message: "Message was deleted by author", date: post.date};
    let subscription = this.threadService.deletePost(this.threadId!, id!, deletePost).subscribe(
      {
        next: () => {
          console.log("delete")
          this.posts[i].message = "Message was deleted by author";
        },
        error: () => {

        }
      }
    )

    this.subscription.add(subscription);
  }

  startEdit(id: string, message: string) {
    if(id) {
      if(message.slice(message.length - 8, message.length)== "(edited)") {
        this.message = message.slice(0, message.length - 8);
      } else {
        this.message = message;
      }
      this.idEdit = id!;
    }
  }

  closeEdit() {
     this.message = "";
      this.idEdit = null;
    
  }
}
