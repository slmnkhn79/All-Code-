import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemoMaterialModule} from '../material-module';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { DatabaseDetailsComponent } from './database-details/database-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2TableModule } from 'ng2-table';
import { PaginationModule } from 'ngx-bootstrap'; 
import { TabsModule } from 'ngx-bootstrap';

import { MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DatabaseDetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    HttpClientModule,
    Ng2TableModule,
    PaginationModule,
    TabsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
