import { Request, Response } from 'express';
import { Repository } from 'typeorm';

export abstract class BaseController {
  repository: Repository<any>;

  getAll = async (req: Request, res: Response) => {
    try {
      const entities = await this.repository.find();
      res.json(entities);
    } catch (err) {
      console.error(err);
      this.handleError(res);
    }
  };

  getOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const entity = await this.repository.findOneBy({ id: parseInt(id) });
      if (!entity) {
        this.handleError(res, 404, 'No entity found with id: ' + id);
        return;
      }
      res.json(entity);
    } catch (err) {
      console.error(err);
      this.handleError(res);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const entity = this.repository.create(req.body);
      const entityAdded = await this.repository.save(entity);
      res.json(entityAdded);
    } catch (err) {
      console.error(err);
      this.handleError(res);
    }
  };

  update = this.create;

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await this.repository.delete(id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      this.handleError(res);
    }
  };

  handleError(
    res,
    status: number = 500,
    message: string = 'Server error occured.'
  ) {
    res.status(status).json({ message });
  }
}
