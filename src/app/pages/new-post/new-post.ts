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
  });

  loading = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  get f() { return this.form.controls; }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async submit() {
    if (this.form.invalid || !this.selectedFile) { 
      this.form.markAllAsTouched(); 
      return; 
    }
    this.loading = true;
    try {
      // Convertir imagen a base64 para guardar en Firebase
      const base64 = await this.fileToBase64(this.selectedFile);
      const payload = { 
        ...(this.form.value as any), 
        imageUrl: base64 
      };
      await this.postService.createPost(payload);
      await this.router.navigate(['/']);
    } finally {
      this.loading = false;
    }
  }

  async cancel() {
    await this.router.navigate(['/']);
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
