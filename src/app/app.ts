import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostService } from './services/post-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('AngularFinal');

  postService = inject(PostService);
  posts: any[] = [];

  ngOnInit(): void {
    // Carga inicial opcional
    // this.getPosts();
  }

  async getPosts(): Promise<void> {
    this.posts = (await this.postService.getPosts()) as any[];
    console.log(this.posts);
  }
}