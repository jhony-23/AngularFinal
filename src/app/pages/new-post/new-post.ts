import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post-service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-post.html',
  styleUrl: './new-post.css'
})
export class NewPostPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private postService = inject(PostService);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\//i)]],
  });

  loading = false;
  previewError = false;

  get f() { return this.form.controls; }

  async submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    try {
      await this.postService.createPost(this.form.value as any);
      await this.router.navigate(['/']);
    } finally {
      this.loading = false;
    }
  }

  async cancel() {
    await this.router.navigate(['/']);
  }

  // URL lista para previsualizar (limpia espacios y convierte fuentes comunes)
  get previewUrl(): string | null {
    const raw = (this.form.value.imageUrl || '').toString().trim();
    if (!raw) return null;
    return this.toDirectImageUrl(raw);
  }

  onImageError() { this.previewError = true; }
  onImageLoad() { this.previewError = false; }

  private toDirectImageUrl(url: string): string {
    // Convierte URLs comunes a un enlace directo a la imagen
    // 1) Google Drive: https://drive.google.com/file/d/<ID>/view => https://drive.google.com/uc?export=view&id=<ID>
    const g = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
    if (g) return `https://drive.google.com/uc?export=view&id=${g[1]}`;

    // 2) Dropbox: https://www.dropbox.com/s/...?.dl=0 => https://dl.dropboxusercontent.com/s/... (descarga directa)
    if (/dropbox\.com\//i.test(url)) {
      return url
        .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
        .replace('?dl=0', '')
        .replace('?dl=1', '');
    }

    // 3) Quita espacios accidentales
    return url.trim();
  }
}
