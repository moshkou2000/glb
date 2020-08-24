import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatSelectModule, MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
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
  declarations: [HelpComponent]
})
export class HelpModule { }
