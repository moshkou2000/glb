import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatSelectModule, MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// import { AboutRoutingModule } from './about-routing.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
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
  exports: [AboutComponent],
  declarations: [AboutComponent]
})
export class AboutModule { }
