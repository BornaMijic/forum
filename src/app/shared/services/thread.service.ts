import { Injectable } from '@angular/core';
import {DataStorageService} from "./data-storage.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private dataStorage: DataStorageService) { }

  getPostsForThreadId(id: string) {
    return this.dataStorage.getPostForThreadId(id)
  }

  getThreads() {
    return this.dataStorage.getThreads();
  }

  addThread(title: string): Observable<{name: string}> {
    return this.dataStorage.addThread(title);
  }

  addPost(post: {email: string, message: string, date: string}, id: string): Observable<{name: string}> {
    return this.dataStorage.addPost(post, id)
  }

  editPost(editedPost: {id?: string, email: string, message: string, date: string}, idThread: string) {
    return this.dataStorage.editPost(editedPost, idThread)
  }

  deletePost(idThread: string, idPost: string, deletePost: {email: string, message: string, date: string}) {
    return this.dataStorage.deletePost(idThread, idPost, deletePost);
  }
}
