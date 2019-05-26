import { FavoriService } from './favoris/favori.service';

import { CommentsModule } from './comments/comments.module';
import { ContactModule } from './contacts/contact.module';
import { MattersModule } from './matters/matters.module';
import { UniversityModule } from './universities/university.module';
import { CountryModule } from './countries/country.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { WorkMethodComponent } from './work-method/work-method.component';
import { EducshareInfoComponent } from './educshare-info/educshare-info.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HowWorksComponent } from './how-works/how-works.component';
import { TermsComponent } from './terms/terms.component';
import { PaiementComponent } from './paiement/paiement.component';
import { AuthenticationService } from './service/authentication.service';
import { LogoutComponent } from './logout/logout.component';
import { DocumentsModule } from './documents/documents.module';
import { DepartementModule } from './departements/departement.module';
import { CourseModule } from './courses/course.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagerModule } from './pager/pager.module';
import { SignupModule } from './signup/signup.module';
import { UserProfilModule } from './users/user-profil.module';
import { SearchModule } from './search/search.module';
import { ListFavoriComponent } from './favoris/list-favori/list-favori.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SubjectListComponent,
    WorkMethodComponent,
    EducshareInfoComponent,
    LoginComponent,
    ErrorComponent,
    HowWorksComponent,
    TermsComponent,
    PaiementComponent,
    LogoutComponent,
    DashboardComponent,
    ListFavoriComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DepartementModule,
    UniversityModule,
    CourseModule,
    CountryModule,
    MattersModule,
    PagerModule,
    DocumentsModule,
    SignupModule,
    UserProfilModule,
    ContactModule,
    SearchModule,
    CommentsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, FavoriService],
  bootstrap: [AppComponent]
})
export class AppModule { }
