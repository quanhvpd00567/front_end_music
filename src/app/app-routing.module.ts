import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpgrateComponent } from './pages/upgrate/upgrate.component';
import { NotificationComponent } from './pages/notification/notification.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'upgrate', component: UpgrateComponent
  },
  {
    path: 'notification', component: NotificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
