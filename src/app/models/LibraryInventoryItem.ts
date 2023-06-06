import { Member } from './Member';

export interface LibraryInventoryItem {
  id: number;
  author: string;
  title: string;
  mediaType: string;
  dateOfAcquisition: Date;
  status: string;
  rentedBy: Member;
}
