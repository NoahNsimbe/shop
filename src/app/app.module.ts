import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MessageComponent } from './message/message.component';

import { NgxsModule } from '@ngxs/store';
import { AppState } from './shared/app.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '.././environments/environment';
import { RouterModule } from '@angular/router';


// import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
// import {MatSelectModule} from '@angular/material/select';
// import {MatInputModule} from '@angular/material/input';
// import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    CatalogComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
	  MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppState], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot()	
  ],

  exports: [
    // MatSelectModule,
    // MatInputModule,
    // MatButtonModule
    // MaterialModule,
  ],
  providers: [
    // {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
