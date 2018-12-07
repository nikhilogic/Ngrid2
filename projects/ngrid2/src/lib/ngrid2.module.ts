import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ngrid2Component } from './ngrid2.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [Ngrid2Component],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [Ngrid2Component]  
})
export class Ngrid2Module { }
