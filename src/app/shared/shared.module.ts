import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThaiDatePipe } from '../pipe/thai-date.pipe';
import { ThaiDatepickerModule } from '../thai-datepicker/thai-datepicker.module';



@NgModule({
  declarations: [
    ThaiDatePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ThaiDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ThaiDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    ThaiDatePipe
  ]
})
export class SharedModule { }
