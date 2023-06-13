import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Member } from 'src/app/models/Member';
import { InventoryService } from 'src/app/services/inventory.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-rent-dialog',
  templateUrl: './rent-dialog.component.html',
  styleUrls: ['./rent-dialog.component.css'],
})
export class RentDialogComponent implements OnInit {
  rentForm!: FormGroup;
  members: Member[] = [];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public rentData: any,
    private dialogRef: MatDialogRef<RentDialogComponent>,
    private snackBar: MatSnackBar,
    private inventoryService: InventoryService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.rentForm = this.formBuilder.group({
      id: [''],
      renterId: [
        '',
        { validators: [Validators.required, this.renterIdValidator()] },
      ],
    });
    this.rentForm.controls['id'].setValue(this.rentData.id);
    this.memberService.getAll().subscribe({
      next: (member) => {
        this.members = member;
      },
      error: (err) => console.log(err),
    });
  }

  rentItem() {
    console.log(this.rentForm.value + 'RENTFORM VALUE');
    if (this.rentForm.valid) {
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
    } else {
      this.rentForm.markAllAsTouched();
    }
  }

  renterIdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const member = this.members.find((m) => m.id == value);
      if (!member) {
        return { invalidMember: true };
      }
      const pastLimit = member!.rentedItems.length < 6;
      const validInput = pastLimit;
      return validInput ? null : { invalidInput: true };
    };
  }
}
