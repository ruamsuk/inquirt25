import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Member } from '../../models/member.model';
import { CountAgeService } from '../../services/count-age.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  users!: Member;
  age!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    @Optional()
    private dialogRef: MatDialogRef<UserDetailComponent>,
    private countAge: CountAgeService
  ) {
    if (this.user) {
      this.users = this.user;
      this.age = countAge.getAge(this.user.birthdate);
    }
  }

}
