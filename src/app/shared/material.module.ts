import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';

const MatComponents = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  NgOptimizedImage
]

@NgModule({
  imports: [
    MatComponents
  ],
  exports: [
    MatComponents
  ]
})
export class MaterialModule { }
