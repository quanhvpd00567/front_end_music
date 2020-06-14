import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './layouts/shares/header/header.component';
import { DescriptionComponent } from './conponents/description/description.component';
import { FooterComponent } from './layouts/shares/footer/footer.component';
import { MenuComponent } from './layouts/shares/menu/menu.component';
import { UpgrateComponent } from './pages/upgrate/upgrate.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DescriptionComponent,
    FooterComponent,
    MenuComponent,
    UpgrateComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
