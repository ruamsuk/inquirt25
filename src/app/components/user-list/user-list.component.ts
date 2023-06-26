import { AfterViewInit, Component, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProfileUser } from '../../models/user-profile.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from '../../services/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { FormControl } from '@angular/forms';
import { AddEditMemberComponent } from '../add-edit-member/add-edit-member.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Member } from '../../models/member.model';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id', 'rank', 'firstname', 'lastname', 'birthdate', 'key'
  ];
  dataSource!: MatTableDataSource<ProfileUser>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKey!: string;
  enabled = new FormControl(false);
  canDo: boolean = true;
  loading = false;

  constructor(
    @Optional()
    private authService: AuthenticationService,
    private userService: UserService,
    private toast: HotToastService,
    private dialog: MatDialog
  ) {
    this.checkRole();
    this.getUsers();
    this.dataSource = new MatTableDataSource<ProfileUser>();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers() {
    this.loading = true;

    this.userService.loadUsers()
      .pipe(
        this.toast.observe({
          success: 'Successfully',
          loading: 'loading...',
          error: ({message}) => `${message}`
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource<ProfileUser>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchKey = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.dataSource.filter = this.searchKey;
  }

  onDetail(data: ProfileUser) {
    this.dialog.open(UserDetailComponent, {data})
  }

  onDelete(row: Member) {
    const  confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete User',
        message: `ลบ: ${row.firstname} ${row.lastname}; แน่ใจ?`
      }
    });
    confirmDialog.afterClosed()
      .subscribe(res => {
        if (res) {
          let id = row.id;
          this.userService.deleteUser(id)
            .pipe(
              this.toast.observe({
                loading: 'loading...',
                success: 'Deleted Success',
                error: ({message}) => `${message}`
              })
            )
            .subscribe()
        }
      });

  }

  onUpdate(data: any) {
    this.dialog.open(AddEditMemberComponent, {data});
  }

  onCreate() {
    this.dialog.open(AddEditMemberComponent, {});
  }

  private checkRole() {
    this.userService.currentUserProfile$.pipe(
      untilDestroyed(this)
    )
      .subscribe((user) => {
        if (user?.role != 'admin') {
          this.canDo = false;
        }
      });
  }
}
