import { Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil-component/perfil-component';
import { FeedPage } from './pages/feed/feed';

export const routes: Routes = [
	{ path: '', component: FeedPage },
	{ path: 'perfil', component: PerfilComponent },
];
