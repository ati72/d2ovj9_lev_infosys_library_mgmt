import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  constructor(private dialog: MatDialog) {}

  //TODO: EZT KI KELL MAJD VENNI!!
  openDialog() {
    this.dialog.open(MemberDialogComponent, {
      width: '30%',
    });
  }
}
