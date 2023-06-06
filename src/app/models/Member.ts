import { LibraryInventoryItem } from './LibraryInventoryItem';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  location: string;
  idCardNumber: number;
  rentedItems: LibraryInventoryItem[];
}
