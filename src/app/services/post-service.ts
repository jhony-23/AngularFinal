import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlAPI = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }


  async getPosts(){

    return await firstValueFrom(this.http.get(this.urlAPI));
  }
  
}
