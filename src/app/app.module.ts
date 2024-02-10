import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { GitinfoComponent } from './gitinfo/gitinfo.component';
import { FormsModule } from '@angular/forms';
import { RepoinfoComponent } from './repoinfo/repoinfo.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';;

@NgModule({
  declarations: [
    AppComponent,
    GitinfoComponent,
    RepoinfoComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
