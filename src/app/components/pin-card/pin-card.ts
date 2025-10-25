import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-pin-card',
  standalone: true,
  imports: [],
  templateUrl: './pin-card.html',
  styleUrl: './pin-card.css'
})
export class PinCard {
  @Input({ required: true }) post!: Post;
}
