import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryInventoryItem } from '../models/LibraryInventoryItem';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<LibraryInventoryItem[]>('/api/items');
  }

  save(item: LibraryInventoryItem) {
    return this.http.post<LibraryInventoryItem>('/api/items', item);
  }

  update(item: LibraryInventoryItem, id: number) {
    return this.http.put<LibraryInventoryItem>('/api/items/' + id, item);
  }

  delete(id: number) {
    return this.http.delete<LibraryInventoryItem>('api/items/' + id);
  }
}
