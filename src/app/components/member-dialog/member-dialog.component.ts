import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/Member';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.css'],
})
export class MemberDialogComponent implements OnInit {
  memberForm!: FormGroup;
  actionButton: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<MemberDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.memberForm = this.formBuilder.group({
      id: [''],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      location: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      idCardNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
    if (this.editData) {
      this.actionButton = 'Update';
      this.memberForm.controls['id'].setValue(this.editData.id);
      this.memberForm.controls['firstName'].setValue(this.editData.firstName);
      this.memberForm.controls['lastName'].setValue(this.editData.lastName);
      this.memberForm.controls['phoneNumber'].setValue(
        this.editData.phoneNumber
      );
      this.memberForm.controls['location'].setValue(this.editData.location);
      this.memberForm.controls['idCardNumber'].setValue(
        this.editData.idCardNumber
      );
    }
  }

  addMember() {
    if (!this.editData) {
      if (this.memberForm.valid) {
        this.memberService.save(this.memberForm.value as Member).subscribe({
          next: (res) => {
            this.snackBar.open('Member added', '', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
            this.memberForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('Error while saving new member' + err);
          },
        });
      } else {
        this.memberForm.markAllAsTouched();
      }
    } else {
      if (this.memberForm.valid) {
        this.updateMember();
      }
    }
  }

  updateMember() {
    this.memberService
      .update(this.memberForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Member updated', '', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
          this.memberForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          console.log(err);
          alert('Error while updating member' + err);
        },
      });
  }
}
