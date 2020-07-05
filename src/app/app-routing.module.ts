import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpgrateComponent } from './pages/upgrate/upgrate.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { LoginComponent } from './pages/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthGuard } from './_helpers/auth.guard';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';


const routes: Routes = [
  { 
    path: 'user', 
    component: DefaultComponent,
    children: [
      { path: 'download/:id', component: UpgrateComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'error-404', component: NotFoundComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '', 
    component: DefaultComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full'},
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
