import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-depart',
  templateUrl: './depart.component.html',
  styleUrls: ['./depart.component.scss']
})
export class DepartComponent implements OnInit {
  depForm!: FormGroup;
  rank: string[] = [
    'ร.ต.อ.', 'พ.ต.ต.', 'พ.ต.ท.', 'พ.ต.อ.', 'พล.ต.อ.'
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional()
    public auth: AuthenticationService,
    private dialogRef: MatDialogRef<DepartComponent>,
    private fb: FormBuilder,
    private memService: UserService,
    private toast: HotToastService,
  ) {
    this.depForm = new FormGroup<any>({
      id: new FormControl(null),
      rank: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
    });

  }


  ngOnInit() {
    if (this.data) {
      this.depForm.setValue({
        id: this.data.id,
        rank: this.data.rank,
        firstname: this.data.firstname,
        lastname: this.data.lastname,
      });
    }
  }

  onSubmit() {
    if (this.depForm.invalid) return;

    const depData = this.depForm.value;

    if (this.data) {

      this.memService.updateDepart(depData).pipe(
        this.toast.observe({
          loading: 'loading...',
          success: 'Updated member success',
          error: ({message}) => `${message}`
        })
      ).subscribe(() => this.closeDialog());
    } else {
      this.memService.addDepart(depData).pipe(
        this.toast.observe({
          loading: 'loading...',
          success: 'Add new member success',
          error: ({message}) => `${message}`
        })
      ).subscribe(() => this.closeDialog());
    }

  }

  closeDialog() {
    this.depForm.reset();
    this.dialogRef.close();
  }

}
