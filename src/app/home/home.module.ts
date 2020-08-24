import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { MatCardModule, MatFormFieldModule, MatIconModule, MatTableModule, MatSelectModule, MatSortModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
