import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinCard } from '../../components/pin-card/pin-card';
import { PostService } from '../../services/post-service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, PinCard],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class FeedPage {
  private postService = inject(PostService);
  posts: Post[] = [];

  async ngOnInit() {
    const data = await this.postService.getPosts();
    this.posts = (data as Post[]).slice(0, 20);
  }
}
