import Joi from 'joi';
import * as joi from '@hapi/joi';
import 'joi-extract-type';
import { createValidator } from './create-validator';
import { Status } from '@prisma/client';

const createNewCaseRules = Joi.object({
  cid: Joi.number().positive().required(),
  eid: Joi.number().positive(),
  request_message: Joi.string().required(),
  creation_date: Joi.date(),
});

export type CreateNewCaseSchema = joi.extractType<typeof createNewCaseRules>;
export const validateCreateNewCase = createValidator(createNewCaseRules);

const updateCaseRules = Joi.object({
  cid: Joi.number().positive(),
  eid: Joi.number().positive(),
  request_message: Joi.string(),
  creation_date: Joi.date().less(new Date()),
  status: Joi.string().valid(Status.COMPLETED, Status.OUTSTANDING),
});

export type UpdateCaseSchema = joi.extractType<typeof updateCaseRules>;
export const validateUpdateCase = createValidator(updateCaseRules);
