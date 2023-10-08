import { Status } from '@prisma/client';
import {
  CreateNewCaseSchema,
  UpdateCaseSchema,
} from '../validators/case-validators';

/**
 * Data Transfer Object (DTO) for creating a new case.
 * It validates the data for creating a new case.
 * @property status - The status of the case. Defaults to Status.OUTSTANDING if not provided.
 * @property creation_date - The creation date of the case. Defaults to the current date if not provided.
 * @property request_message - The request message of the case.
 * @property cid - The ID of the client.
 * @property eid - The ID of the employee.
 */
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

/**
 * Data Transfer Object (DTO) for updating a case.
 * It validates the data for updating a case.
 * @property id - The ID of the case.
 * @property status - The status of the case.
 * @property creation_date - The creation date of the case.
 * @property request_message - The request message of the case.
 * @property cid - The ID of the client.
 * @property eid - The ID of the employee.
 */
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
