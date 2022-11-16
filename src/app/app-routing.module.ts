import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistryComponent } from './pages/registry/registry.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    data: {
      pageTitle: 'Home'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    data: {
      pageTitle: 'Login'
    }
  },
  {
    path: 'registry',
    component: RegistryComponent,
    loadChildren: () => import('./pages/registry/registry.module').then(m => m.RegistryModule),
    data: {
      pageTitle: 'New Account'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
