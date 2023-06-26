import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-add-edit-member',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.scss']
})
export class AddEditMemberComponent implements OnInit {
  memForm!: FormGroup;
  isAlive!: boolean;
  rank: string[] = [
    'ร.ต.อ.', 'พ.ต.ต.', 'พ.ต.ท.', 'พ.ต.อ.'
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional()
    public auth: AuthenticationService,
    private dialogRef: MatDialogRef<AddEditMemberComponent>,
    private fb: FormBuilder,
    private memService: UserService,
    private toast: HotToastService,
  ) {
    this.memForm = new FormGroup<any>({
      id: new FormControl(null),
      rank: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      birthdate: new FormControl(''),
      address: new FormControl(''),
      district: new FormControl(''),
      phone: new FormControl(''),
      province: new FormControl(''),
      zip: new FormControl(''),
      alive: new FormControl(true),
    });

  }

  ngOnInit() {
    if (this.data) {
      this.memForm.setValue({
        id: this.data.id,
        rank: this.data.rank,
        firstname: this.data.firstname,
        lastname: this.data.lastname,
        birthdate: this.data.birthdate.toDate(),
        address: this.data.address,
        district: this.data.district,
        phone: this.data.phone,
        province: this.data.province,
        zip: this.data.zip,
        alive: this.data.alive
      });
      this.isAlive = this.data.alive == 'ยังมีชีวิต';
    } else {
      this.isAlive = true;
    }
  }

  onSubmit() {
    if (this.memForm.invalid) return;

    const memData = this.memForm.value;

    if (this.data) {
      // const member = {...memData, id: this.data.id};
      this.memService.updateMember(memData).pipe(
        this.toast.observe({
          loading: 'loading...',
          success: 'Updated member success',
          error: ({message}) => `${message}`
        })
      ).subscribe(() => this.closeDialog());
    } else {
      this.memService.addMember(memData).pipe(
        this.toast.observe({
          loading: 'loading...',
          success: 'Add new member success',
          error: ({message}) => `${message}`
        })
      ).subscribe(() => this.closeDialog());
    }

  }

  closeDialog() {
    this.memForm.reset();
    this.dialogRef.close();
  }
}
