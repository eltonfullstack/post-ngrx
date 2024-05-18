import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { Post } from "../interface/post";
import { PostModel } from "../state/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    }),
  }

  constructor(private httpClient: HttpClient ) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.URL + '/posts', this.httpOptions)
      .pipe(
        catchError(this.errorHandler),
      )
  }

  create(post: Post): Observable<any> {
    return this.httpClient.post(this.URL + '/posts/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler),
      )
  }

  findById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.URL + '/posts/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler),
      )
  }

  update(post: any): Observable<any> {
    return this.httpClient.put(this.URL + '/posts/' + post.id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler),
      )
  }

  delete(id: number) {
    return this.httpClient.delete(this.URL + '/posts/' + id, this.httpOptions)
  }

  errorHandler(error: any) {
    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

}
