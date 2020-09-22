import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatSelectModule, MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// import { AboutRoutingModule } from './about-routing.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
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
  exports: [HomeComponent],
  declarations: [HomeComponent]
})
export class HomeModule { }
