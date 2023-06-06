import { BaseController } from './base.controller';
import { AppDataSource } from '../data-source';
import { Member } from '../entity/Member';
import { Request, Response } from 'express';

export class MemberController extends BaseController {
  repository = AppDataSource.getRepository(Member);

  override getAll = async (req: Request, res: Response) => {
    try {
      const entities = await this.repository.find({
        relations: ['rentedItems'],
      });
      res.json(entities);
    } catch (err) {
      this.handleError(res);
    }
  };
}
