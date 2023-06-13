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

  rentItem = async (req: Request, res: Response) => {
    try {
      const entity = await this.repository.findOne({
        relations: ['rentedBy'],
        where: {
          id: parseInt(req.params.id),
        },
      });

      console.log(entity);

      if (!entity) {
        return this.handleError(
          res,
          null,
          404,
          'No entity found with id: ' + req.params.id
        );
      }

      if (entity.status === 'Rented') {
        return this.handleError(res, null, 400, 'This Item is already rented');
      }

      entity.rentedBy = req.body.renterId;
      entity.status = 'Rented';

      const result = await this.repository.save(entity);

      res.json(result);
    } catch {
      this.handleError(res);
    }
  };

  returnItem = async (req: Request, res: Response) => {
    try {
      const entity = await this.repository.findOneBy({
        id: parseInt(req.params.id),
      });

      if (!entity) {
        return this.handleError(
          res,
          null,
          404,
          'No entity found with id: ' + req.params.id
        );
      }

      if (entity.status === 'Available') {
        return this.handleError(
          res,
          null,
          400,
          'This Item is already available'
        );
      }

      entity.rentedBy = null;
      entity.status = 'Available';
      const result = await this.repository.save(entity);
      res.json(result);
    } catch {
      this.handleError(res);
    }
  };
}
