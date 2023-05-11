import { BaseController } from './base.controller';
import { AppDataSource } from '../data-source';
import { LibraryInventoryItem } from '../entity/LibraryInventoryItem';

export class LibraryInventoryItemController extends BaseController {
  repository = AppDataSource.getRepository(LibraryInventoryItem);
}
