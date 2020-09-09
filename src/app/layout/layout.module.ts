import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatTooltipModule, MatToolbarModule, MatDividerModule, MatMenuModule, 
  MatButtonModule, MatIconModule, MatBadgeModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatBadgeModule,
    MatListModule,
    MatTooltipModule
  ],
  exports: [],
  declarations: []
})
export class LayoutModule { }
