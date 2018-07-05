import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import{
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatDialogModule,
  MatOptionModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatProgressSpinnerModule,

} from '@angular/material';

import{
  FormsModule,
  ReactiveFormsModule
}from '@angular/forms';

@NgModule({
  imports:[
    CommonModule,
    HttpModule
  ],
  declarations:[],
  exports: [
    FormsModule,
    ReactiveFormsModule, 
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatOptionModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule, 
    MatTabsModule,
    MatProgressSpinnerModule,    
  ],
  providers:[]
})
export class SharedModule{}