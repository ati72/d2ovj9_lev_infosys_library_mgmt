import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/Member';
import { MemberService } from '../../services/member.service';
import { LibraryInventoryItem } from 'src/app/models/LibraryInventoryItem';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  members: Member[] = [];
  items: LibraryInventoryItem[] = [];
  countRented: number = 0;

  constructor(
    private memberService: MemberService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.memberService.getAll().subscribe({
      next: (members) => {
        this.members = members;
      },
      error: (err) => console.log(err),
    });

    this.inventoryService.getAll().subscribe({
      next: (items) => {
        this.items = items;
        this.countRented = this.items.filter(
          (item) => item.status === 'Rented'
        ).length;
      },
      error: (err) => console.log(err),
    });
  }
}
