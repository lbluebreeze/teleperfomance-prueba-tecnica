import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AppFacade } from './core/app.facade';
import { AppState } from './core/app.state';
import { LoginService } from './services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ExternalLinkComponent } from './components/external-link/external-link.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { PhraseOfTheDayComponent } from './components/phrase-of-the-day/phrase-of-the-day.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    ExternalLinkComponent,
    HomeComponent,
    FooterComponent,
    PhraseOfTheDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppFacade,
    AppState,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
