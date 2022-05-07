import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './services/authentication.guard';
//import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  // {
  //   path: 'main', 
  //   loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'gallery', 
  //   loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'contact', 
  //   loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  // },
  // { 
  //   path: 'not-found', 
  //   loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  // },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), 
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule),
    canActivate: [AuthenticationGuard] 
  },
  { 
    path: 'create_event',
    loadChildren: () => import('./pages/create-event/create-event.module').then(m => m.CreateEventModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
