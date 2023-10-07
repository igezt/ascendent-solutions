import { Status } from '@prisma/client';
import {
  CreateNewCaseSchema,
  UpdateCaseSchema,
} from '../validators/case-validators';

export class CreateCaseDto {
  status: Status;
  creation_date: Date;
  request_message: string;
  cid: number;
  eid: number;

  constructor(data: CreateNewCaseSchema) {
    this.status = data.status ?? Status.OUTSTANDING;
    // If creation date is undefined, the field defaults to current date
    this.creation_date = data.creation_date ?? new Date();
    this.request_message = data.request_message;
    this.cid = data.cid;
    this.eid = data.eid;
  }
}

export class UpdateCaseDto {
  id: number;
  status: Status;
  creation_date: Date;
  request_message: string;
  cid: number;
  eid: number;

  constructor(id: number, data: UpdateCaseSchema) {
    this.id = id;
    this.status = data.status;
    this.creation_date = data.creation_date;
    this.request_message = data.request_message;
    this.cid = data.cid;
    this.eid = data.eid;
  }
}
