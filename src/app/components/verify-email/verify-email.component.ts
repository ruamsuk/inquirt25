import { Component, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  mail: string | null;

  constructor(@Optional() private route: ActivatedRoute) {
    this.mail = this.route.snapshot.paramMap.get('mail')
  }

}
