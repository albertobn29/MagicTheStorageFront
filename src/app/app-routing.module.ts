import { LoginGuard } from './services/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { IndexComponent } from './pages/index/index.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { DetailedCardComponent } from './pages/detailed-card/detailed-card.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { DetailedMazoComponent } from './pages/detailed-mazo/detailed-mazo.component';
import { MazosComponent } from './pages/mazos/mazos.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: IndexComponent,
  },
  {
    path: 'registro',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'buscar',
    canActivate:[LoginGuard],
    component: SearchComponent,
  },
  {
    path: 'carta/:id',
    canActivate:[LoginGuard],
    component: DetailedCardComponent,
  },
  {
    path: 'coleccion',
    canActivate:[LoginGuard],
    component: CollectionComponent,
  },
  {
    path: 'mazos',
    canActivate:[LoginGuard],
    component: MazosComponent,
  },
  {
    path: 'mazo/:id',
    canActivate:[LoginGuard],
    component: DetailedMazoComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
