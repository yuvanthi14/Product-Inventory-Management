import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductService } from './product.service';
import { provideHttpClient } from '@angular/common/http';
// import { EditComponent } from './dashboard/edit/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([]), 
  ],
  providers: [provideHttpClient(), ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
