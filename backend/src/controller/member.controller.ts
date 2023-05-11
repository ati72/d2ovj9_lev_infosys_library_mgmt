import { Repository } from 'typeorm';
import { BaseController } from './base.controller';
import { AppDataSource } from '../data-source';
import { Member } from '../entity/Member';

export class MemberController extends BaseController {
  repository = AppDataSource.getRepository(Member);
}
