import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  // URL base de tu Realtime Database (sin slash al final)
  private readonly baseUrl = 'https://angular-c3335-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  // GET: /posts.json -> { id: Post } | null  => Post[]
  async getPosts(): Promise<Post[]> {
    const obs = this.http
      .get<Record<string, Omit<Post, 'id'>> | null>(`${this.baseUrl}/posts.json`)
      .pipe(
        map((obj) =>
          obj ? Object.entries(obj).map(([id, p]) => ({ id, ...p })) : []
        )
      );
    return await firstValueFrom(obs);
  }

  // POST: /posts.json -> { name: string }
  async createPost(data: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
    const payload = { ...data, createdAt: Date.now() };
    const res = await firstValueFrom(
      this.http.post<{ name: string }>(`${this.baseUrl}/posts.json`, payload)
    );
    return { id: res.name, ...payload };
  }

  // PATCH: /posts/{id}.json
  async updatePost(id: string, patch: Partial<Post>): Promise<void> {
    await firstValueFrom(
      this.http.patch<void>(`${this.baseUrl}/posts/${id}.json`, patch)
    );
  }

  // DELETE: /posts/{id}.json
  async deletePost(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/posts/${id}.json`)
    );
  }
}
