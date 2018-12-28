import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ngrid2Component } from './ngrid2.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ngrid2Modal } from './ngrid2Modal.component';



@NgModule({
  declarations: [Ngrid2Component,Ngrid2Modal],
  entryComponents:[Ngrid2Modal],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [Ngrid2Component]  
})
export class Ngrid2Module { }
