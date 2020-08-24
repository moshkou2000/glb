import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatSelectModule, MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
