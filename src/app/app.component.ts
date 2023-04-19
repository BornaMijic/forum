import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forum';

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit(): void {
    this.authenticationService.autoLogin();
  }
}
