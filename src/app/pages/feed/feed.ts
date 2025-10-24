import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PinCard } from '../../components/pin-card/pin-card';
import { PostService } from '../../services/post-service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, PinCard],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class FeedPage {
  private postService = inject(PostService);
  posts: Post[] = [];
  loading = false;

  async ngOnInit() {
    await this.loadPosts();
  }

  async loadPosts() {
    this.loading = true;
    try {
      const data = await this.postService.getPosts();
      this.posts = data.slice(0, 30);
    } finally {
      this.loading = false;
    }
  }

  trackById(index: number, item: Post) {
    return item.id ?? index;
  }
}
