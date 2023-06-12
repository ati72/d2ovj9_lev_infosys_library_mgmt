import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-rent-dialog',
  templateUrl: './rent-dialog.component.html',
  styleUrls: ['./rent-dialog.component.css'],
})
export class RentDialogComponent implements OnInit {
  rentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public rentData: any,
    private dialogRef: MatDialogRef<RentDialogComponent>,
    private snackBar: MatSnackBar,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.rentForm = this.formBuilder.group({
      id: [''],
      renterId: [''],
    });
    this.rentForm.controls['id'].setValue(this.rentData.id);
  }

  rentItem() {
    console.log(this.rentForm.value);
    this.inventoryService
      .rentItem(this.rentForm.value.id, this.rentForm.value)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Item rented', '', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
          this.rentForm.reset();
          this.dialogRef.close('rent');
        },
        error: (err) => {
          alert('Error while renting item!'), console.log(err);
        },
      });
  }
}
