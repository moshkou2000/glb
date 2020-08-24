import { Component, Inject, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';

import { environment } from '../../../environments/environment';
import { ConfirmationModel } from './confirmation.model';
import { from } from 'rxjs';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  providers: [MatDialogModule]
})
export class ConfirmationComponent implements OnInit, AfterViewInit, OnDestroy {


  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmation: ConfirmationModel) { 
    }

  ngOnInit() { }
  ngAfterViewInit() { }
  ngOnDestroy() { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}
