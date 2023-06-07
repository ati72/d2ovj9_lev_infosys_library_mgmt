import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LibraryInventoryItem } from 'src/app/models/LibraryInventoryItem';
import { InventoryService } from 'src/app/services/inventory.service';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'author',
    'title',
    'mediaType',
    'dateOfAcquisition',
    'status',
    'rentedBy',
    'action',
  ];

  dataSource!: MatTableDataSource<LibraryInventoryItem>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  openDialog() {
    this.dialog
      .open(ItemDialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        // val a dialogRef.close-ból jön
        if (val === 'save') {
          this.getAllItems();
        }
      });
  }

  getAllItems() {
    this.inventoryService.getAll().subscribe({
      next: (items) => {
        this.dataSource = new MatTableDataSource(items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.log(err),
    });
  }

  editItem(row: any) {
    this.dialog
      .open(ItemDialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllItems();
        }
      });
  }

  deleteItem(id: number) {
    this.inventoryService.delete(id).subscribe({
      next: (res) => {
        alert('item deleted');
        this.getAllItems();
      },
      error: (err) => {
        alert('Error while deleting item');
      },
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
