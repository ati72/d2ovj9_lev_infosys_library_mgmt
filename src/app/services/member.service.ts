import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Member[]>('/api/members');
  }
}
