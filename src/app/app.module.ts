import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './layouts/shares/header/header.component';
import { DescriptionComponent } from './conponents/description/description.component';
import { FooterComponent } from './layouts/shares/footer/footer.component';
import { MenuComponent } from './layouts/shares/menu/menu.component';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { DotdotdotPipe } from './pipes/dotdotdot.pipe';
import { PaymentMomoComponent } from './pages/payment-momo/payment-momo.component';
import { PaymentMomoConfirmComponent } from './pages/payment-momo-confirm/payment-momo-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DescriptionComponent,
    FooterComponent,
    MenuComponent,
    DefaultComponent,
    LoginComponent,
    NotFoundComponent,
    ToastComponent,
    DotdotdotPipe,
    PaymentMomoComponent,
    PaymentMomoConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbToastModule
  ],
  providers: [
    ApiService ,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
