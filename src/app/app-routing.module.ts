import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthGuard } from './_helpers/auth.guard';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PaymentMomoComponent } from './pages/payment-momo/payment-momo.component';
import { PaymentMomoConfirmComponent } from './pages/payment-momo-confirm/payment-momo-confirm.component';


const routes: Routes = [
  // { 
  //   path: 'user', 
  //   component: DefaultComponent,
  //   children: [
  //     { path: 'history/:id', component: UpgrateComponent },
  //     { path: 'notification', component: NotificationComponent },
  //     { path: 'history-get', component: HistoriesComponent },
  //     { path: 'payment-momo', component: PaymentMomoComponent},
  //     { path: 'error-404', component: NotFoundComponent },
  //     { path: 'payment/momo-confirm', component: PaymentMomoConfirmComponent }
  //   ],
  //   canActivate: [AuthGuard]
  // },
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

  // {
  //   path: 'register',
  //   component: DefaultComponent,
  //   children: [
  //     {
  //       path: 'confirm', component: ConfirmRegisterComponent
  //     },
  //   ]
  // },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
