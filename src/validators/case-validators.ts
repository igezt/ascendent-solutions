import Joi from 'joi';
import * as joi from '@hapi/joi';
import 'joi-extract-type';
import { createBodyValidator, createParamValidator } from './create-validator';
import { Status } from '@prisma/client';

/**
 * Joi schema for creating a new case.
 * @property cid - The ID of the client.
 * @property eid - The ID of the employee.
 * @property request_message - The request message of the case.
 * @property creation_date - The creation date of the case.
 */
const createNewCaseRules = Joi.object({
  cid: Joi.number().positive().required(),
  eid: Joi.number().positive(),
  request_message: Joi.string().required(),
  creation_date: Joi.date(),
  status: Joi.string().valid(Status.COMPLETED, Status.OUTSTANDING),
});

/**
 * Type for the data required to create a new case.
 * Extracted from the createNewCaseRules schema.
 */
export type CreateNewCaseSchema = joi.extractType<typeof createNewCaseRules>;

/**
 * Validator middleware for creating a new case.
 * Uses the createNewCaseRules schema.
 */
export const validateCreateNewCase = createBodyValidator(createNewCaseRules);

/**
 * Joi schema for updating a case.
 * @property cid - The ID of the client.
 * @property eid - The ID of the employee.
 * @property request_message - The request message of the case.
 * @property creation_date - The creation date of the case.
 * @property status - The status of the case.
 */
const updateCaseRules = Joi.object({
  cid: Joi.number().positive(),
  eid: Joi.number().positive(),
  request_message: Joi.string(),
  creation_date: Joi.date().less(new Date()),
  status: Joi.string().valid(Status.COMPLETED, Status.OUTSTANDING),
});

/**
 * Type for the data required to update a case.
 * Extracted from the updateCaseRules schema.
 */
export type UpdateCaseSchema = joi.extractType<typeof updateCaseRules>;

/**
 * Validator middleware for updating a case.
 * Uses the updateCaseRules schema.
 */
export const validateUpdateCase = createBodyValidator(updateCaseRules);
