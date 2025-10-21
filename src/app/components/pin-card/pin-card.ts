import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-pin-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './pin-card.html',
  styleUrl: './pin-card.css'
})
export class PinCard {
  @Input({ required: true }) post!: Post;
}
