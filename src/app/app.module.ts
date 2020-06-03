import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MessageComponent } from './message/message.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { RegisterComponent } from './register/register.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

import { StoresState } from './shared/states/stores.state';
import { OrderState } from './shared/states/orders.state';
import { AuthState } from './auth/auth.state';

import { AccountModule } from './account/account.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CartModule } from './cart/cart.module';
import { CatalogModule } from './catalog/catalog.module';


import { AuthInterceptor } from './auth/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    MessageComponent,
    ItemDetailsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AccountModule,
    CheckoutModule,
    CatalogModule,
    CartModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([StoresState, OrderState, AuthState], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({key: [AuthState, StoresState, OrderState] }),
    NgxsFormPluginModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
