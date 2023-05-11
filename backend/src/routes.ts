import express from 'express';
import { LibraryInventoryItemController } from './controller/libraryInventoryItem.controller';
import { MemberController } from './controller/member.controller';

export function getRoutes() {
  const router = express.Router();

  const libraryInventoryItemController = new LibraryInventoryItemController();
  const memberController = new MemberController();

  router.get('/items', libraryInventoryItemController.getAll);
  router.get('/items/:id', libraryInventoryItemController.getOne);
  router.post('/items', libraryInventoryItemController.create);
  router.put('/items', libraryInventoryItemController.update);
  router.delete('/items/:id', libraryInventoryItemController.delete);

  router.get('/members', memberController.getAll);
  router.get('/members/:id', memberController.getOne);
  router.post('/members', memberController.create);
  router.put('/members', memberController.update);
  router.delete('/members/:id', memberController.delete);

  return router;
}
