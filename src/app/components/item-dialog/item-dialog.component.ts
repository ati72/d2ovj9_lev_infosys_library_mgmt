import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibraryInventoryItem } from 'src/app/models/LibraryInventoryItem';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css'],
})
export class ItemDialogComponent implements OnInit {
  itemForm!: FormGroup;
  actionButton: string = 'Save';
  status: string = 'Available';
  mediaTypes: string[] = ['Book', 'CD', 'DVD'];

  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      id: [''],
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      title: ['', [Validators.required, Validators.minLength(2)]],
      mediaType: ['', Validators.required],
      dateOfAcquisition: ['', Validators.required],
      status: ['', Validators.required],
    });
    if (this.editData) {
      this.actionButton = 'Update';
      this.itemForm.controls['id'].setValue(this.editData.id);
      this.itemForm.controls['author'].setValue(this.editData.author);
      this.itemForm.controls['title'].setValue(this.editData.title);
      this.itemForm.controls['mediaType'].setValue(this.editData.mediaType);
      this.itemForm.controls['dateOfAcquisition'].setValue(
        this.editData.dateOfAcquisition
      );
      this.itemForm.controls['status'].setValue(this.editData.status);
    }
  }

  addItem() {
    if (!this.editData) {
      if (this.itemForm.valid) {
        this.itemForm.patchValue({
          dateOfAcquisition: this.formatDate(
            this.itemForm.get('dateOfAcquisition')?.value
          ),
        });
        this.inventoryService
          .save(this.itemForm.value as LibraryInventoryItem)
          .subscribe({
            next: (res) => {
              this.snackBar.open('Item added', '', {
                duration: 3000,
                verticalPosition: 'bottom',
              });
              this.itemForm.reset();
              this.dialogRef.close('save');
            },
            error: (err) => {
              console.log(err);
              console.log(this.itemForm.value);
              alert('error while saving item');
            },
          });
      } else {
        this.itemForm.markAllAsTouched();
      }
    } else {
      if (this.itemForm.valid) {
        this.updateItem();
      }
    }
  }

  updateItem() {
    this.itemForm.patchValue({
      dateOfAcquisition: this.formatDate(
        this.itemForm.get('dateOfAcquisition')?.value
      ),
    });
    this.inventoryService
      .update(this.itemForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Item updated', '', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
          this.itemForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          console.log(err);
          alert('error while updating member');
        },
      });
  }

  // TODO: ez update-nél hibát dob, ha nem állítok új dátumot, vlaszeg, mert nem Date, amit át akarok alakítani valamiért
  formatDate(date: Date): string {
    if (isNaN(date.getTime())) {
      return '';
    } else {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return (
        year + '/' + ('00' + month).slice(-2) + '/' + ('00' + day).slice(-2)
      );
    }
  }
}
