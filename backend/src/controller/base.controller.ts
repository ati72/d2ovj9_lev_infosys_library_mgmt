import { Request, Response } from 'express';
import { Repository } from 'typeorm';

export abstract class BaseController {
  repository: Repository<any>;

  getAll = async (req: Request, res: Response) => {
    try {
      const entities = await this.repository.find();
      res.json(entities);
    } catch (err) {
      this.handleError(res);
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const entity = await this.repository.findOneBy({ id: parseInt(id) });
      if (!entity) {
        return this.handleError(
          res,
          null,
          404,
          'No entity found with id: ' + id
        );
      }
      res.json(entity);
    } catch (err) {
      console.error(err);
      this.handleError(res);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const entity = this.repository.create(req.body as object);
      entity.id = null;
      // why insert?
      const result = await this.repository.insert(entity);
      const inserted = await this.repository.findOneBy({
        id: result.raw.insertId,
      });
      res.json(inserted);
    } catch (err) {
      this.handleError(res);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const entity = this.repository.create(req.body as object);
      const entityToUpdate = await this.repository.findOneBy({ id: entity.id });
      if (!entityToUpdate) {
        return this.handleError(
          res,
          null,
          404,
          'No entity found with id: ' + req.params.id
        );
      }
      const result = await this.repository.save(entity);
      res.json(result);
    } catch (err) {
      this.handleError(res, err);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const entityToDelete = await this.repository.findOneBy({
        id: req.params.id,
      });
      if (!entityToDelete) {
        return this.handleError(
          res,
          null,
          404,
          'No entity found with id: ' + req.params.id
        );
      }
      await this.repository.delete(entityToDelete);
      res.status(200).send();
    } catch (err) {
      this.handleError(res);
    }
  };

  handleError(
    res,
    err = null,
    status: number = 500,
    message: string = 'Server error occured.'
  ) {
    if (err) {
      console.error(err);
    }
    res.status(status);
    res.json({ error: message });
  }
}

// ref: https://github.com/aron123/infrend-2023/blob/master/webshop-k16/server/src/controller/base.controller.ts
