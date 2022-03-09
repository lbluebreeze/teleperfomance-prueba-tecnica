import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ContentComponent } from './components/pages/content/content.component';
import { FrameworksComponent } from './components/pages/frameworks/frameworks.component';
import { InstructorComponent } from './components/pages/instructor/instructor.component';
import { LanguagesComponent } from './components/pages/languages/languages.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { RequirementsComponent } from './components/pages/requirements/requirements.component';
import { ReviewsComponent } from './components/pages/reviews/reviews.component';
import { UserComponent } from './modules/user/user.component';

/**
 * Rutas disponibles en la aplicacion
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'content',
    component: ContentComponent
  },
  {
    path: 'requirements',
    component: RequirementsComponent,
  },
  {
    path: 'languages',
    component: LanguagesComponent,
  },
  {
    path: 'frameworks',
    component: FrameworksComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'instructor',
    component: InstructorComponent,
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(x => x.UserModule),
  }
];

/**
 * Módulo encargado del enrutamiento de componentes en la aplicación
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
