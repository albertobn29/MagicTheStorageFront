import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';


// Components
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CardComponent } from './components/card/card.component';
import { IndexComponent } from './pages/index/index.component';
import { DetailedCardComponent } from './pages/detailed-card/detailed-card.component';

//Servicios
import { LoginGuard } from './services/login.guard';
import { BackServiceService } from './services/back-service.service';
import { MagicServiceService } from './services/magic-service.service';
import { CollectionComponent } from './pages/collection/collection.component';
import { MazosComponent } from './pages/mazos/mazos.component';
import { DetailedMazoComponent } from './pages/detailed-mazo/detailed-mazo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    IndexComponent,
    DetailedCardComponent,
    CollectionComponent,
    MazosComponent,
    DetailedMazoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [LoginGuard, BackServiceService, MagicServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
