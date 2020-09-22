import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatSelectModule, MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// import { AboutRoutingModule } from './about-routing.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';

@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule,
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
  exports: [GalleryComponent],
  declarations: [GalleryComponent]
})
export class GalleryModule { }
