import { AfterViewInit, Component, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { Depart } from '../../models/depart.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { DepartComponent } from '../depart/depart.component';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-depart-list',
  templateUrl: './depart-list.component.html',
  styleUrls: ['./depart-list.component.scss']
})
export class DepartListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id', 'rank', 'firstname', 'lastname', 'key'
  ];
  dataSource!: MatTableDataSource<Depart>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKey!: string;
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
    this.getDepart();
    this.dataSource = new MatTableDataSource<Depart>()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getDepart() {
    this.loading = true;
    this.userService.loadDepart()
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
          this.dataSource = new MatTableDataSource<Depart>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
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

  onDelete(row: Depart) {
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
          this.userService.deleteDepart(id)
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
    this.dialog.open(DepartComponent, {data});
  }

  onCreate() {
    this.dialog.open(DepartComponent, {});
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
