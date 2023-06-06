import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Member } from '../../models/Member';
import { MemberService } from '../../services/member.service';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'phoneNumber',
    'location',
    'idCardNumber',
    'rentedItems',
    'action',
  ];
  dataSource!: MatTableDataSource<Member>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllMembers();
  }

  openDialog() {
    this.dialog
      .open(MemberDialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        // val a dialogRef.close-ból jön
        if (val === 'save') {
          this.getAllMembers();
        }
      });
  }

  getAllMembers() {
    this.memberService.getAll().subscribe({
      next: (members) => {
        // ez más mint a vidiben
        console.log(members);
        this.dataSource = new MatTableDataSource(members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.log(err),
    });
  }

  editMember(row: any) {
    this.dialog.open(MemberDialogComponent, {
      width: '30%',
      data: row,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
