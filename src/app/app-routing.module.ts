import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ThreadComponent} from "./thread/thread.component";
import {CreateThreadComponent} from "./create-thread/create-thread.component";
import {UserGuard} from "./shared/guards/user.guard";
import { NotUserGuard } from './shared/guards/not-user.guard';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'thread/:title/:id', component: ThreadComponent},
  {path: 'create-thread', component: CreateThreadComponent, canActivate: [UserGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NotUserGuard]},
  {path: 'registration', component: RegistrationComponent, canActivate: [NotUserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
