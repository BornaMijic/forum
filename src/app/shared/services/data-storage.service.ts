import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{email: string}> {
    return this.http.post<{email: string}>(environment.signInUrl, {email: email, password: password, returnSecureToke: true});
  }

  registration(email: string, password: string){
    return this.http.post<{email: string}>(environment.signUpUrl, {email: email, password: password, returnSecureToke: true});
  }

  getPostForThreadId(id: string){
    return this.http.get(environment.url + "posts/" + id + ".json");
  }

  getThreads(){
    return this.http.get(environment.url + "threads.json");
  }

  addThread(title: string) {
    let thread = {name: title};
    return this.http.post<{name: string}>(environment.url + "threads.json", thread);
  }

  addPost(post: {email: string, message: string, date: string}, id: string): Observable<{name: string}> {
    return this.http.post<{name: string}>(environment.url + "posts/" + id + ".json", post);
  }

  editPost(editedPost: {id?: string, email: string, message: string, date: string}, idThread: string) {
    return this.http.put(environment.url + "posts/" + idThread + "/" + editedPost.id +  ".json", editedPost);
  }

  deletePost(idThread: string, idPost: string, deletePost: {email: string, message: string, date: string}) {
    return this.http.put<{name: string}>(environment.url + "posts/" + idThread + "/" + idPost +  ".json", deletePost);
  }
}
