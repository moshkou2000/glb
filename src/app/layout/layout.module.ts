import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatTooltipModule, MatToolbarModule, MatDividerModule, MatMenuModule, 
  MatButtonModule, MatIconModule, MatBadgeModule, MatListModule } from '@angular/material';

import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

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
  exports: [
    AlertComponent,
    FooterComponent,
    HeaderComponent
  ],
  declarations: [
    AlertComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }
