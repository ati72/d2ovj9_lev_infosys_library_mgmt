import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<ItemDialogComponent>
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      mediaType: ['', Validators.required],
      dateOfAcquisition: ['', Validators.required],
      status: ['', Validators.required],
    });
    if (this.editData) {
      this.actionButton = 'Update';
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
        this.inventoryService
          .save(this.itemForm.value as LibraryInventoryItem)
          .subscribe({
            next: (res) => {
              alert('Item added');
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
        this.updateItem();
      }
    }
  }

  updateItem() {
    this.inventoryService
      .update(this.itemForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Item Updated!');
          this.itemForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          console.log(err);
          alert('error while updating member');
        },
      });
  }
}
