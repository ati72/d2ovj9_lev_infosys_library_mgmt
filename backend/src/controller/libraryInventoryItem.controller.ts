import { BaseController } from './base.controller';
import { AppDataSource } from '../data-source';
import { LibraryInventoryItem } from '../entity/LibraryInventoryItem';
import { Request, Response } from 'express';

export class LibraryInventoryItemController extends BaseController {
  repository = AppDataSource.getRepository(LibraryInventoryItem);

  override getAll = async (req: Request, res: Response) => {
    try {
      const entities = await this.repository.find({
        relations: ['rentedBy'],
      });
      res.json(entities);
    } catch (err) {
      this.handleError(res);
    }
  };
}
