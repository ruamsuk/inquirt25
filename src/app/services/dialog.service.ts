import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../dialog/confirm/confirm.component';
import { ConfirmDialogData } from '../models/confirm-dialog-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return  this.dialog.open(ConfirmComponent, {
      data,
      width: '400px',
      disableClose: true
    }).afterClosed()
  }
}
