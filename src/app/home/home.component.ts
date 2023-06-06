import { Component, OnInit } from '@angular/core';
import { Member } from '../models/Member';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  members: Member[] = [];

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.memberService.getAll().subscribe({
      next: (members) => {
        this.members = members;
      },
      error: (err) => console.log(err),
    });
  }
}
