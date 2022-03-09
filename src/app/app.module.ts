import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AppFacade } from './core/app.facade';
import { AppState } from './core/app.state';
import { ReactiveFormsModule } from '@angular/forms';
import { ExternalLinkComponent } from './components/external-link/external-link.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { PhraseOfTheDayComponent } from './components/phrase-of-the-day/phrase-of-the-day.component';
import { ContentComponent } from './components/pages/content/content.component';
import { GenericComponent } from './components/generic/generic.component';
import { RequirementsComponent } from './components/pages/requirements/requirements.component';
import { LanguagesComponent } from './components/pages/languages/languages.component';
import { FrameworksComponent } from './components/pages/frameworks/frameworks.component';
import { InstructorComponent } from './components/pages/instructor/instructor.component';
import { ReviewsComponent } from './components/pages/reviews/reviews.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { UserApiService } from './services/user/user.api.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard } from './shared/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    ExternalLinkComponent,
    HomeComponent,
    FooterComponent,
    PhraseOfTheDayComponent,
    ContentComponent,
    GenericComponent,
    RequirementsComponent,
    LanguagesComponent,
    FrameworksComponent,
    InstructorComponent,
    ReviewsComponent,
    BlogComponent,
    ContactComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [
    AppFacade,
    AppState,
    UserApiService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
