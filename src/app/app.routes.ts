import { Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil-component/perfil-component';
import { FeedPage } from './pages/feed/feed';
import { NewPostPage } from './pages/new-post/new-post';

export const routes: Routes = [
	{ path: '', component: FeedPage },
	{ path: 'new', component: NewPostPage },
	{ path: 'perfil', component: PerfilComponent },
];
