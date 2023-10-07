import Joi from 'joi';
import * as joi from '@hapi/joi';
import 'joi-extract-type';
import { createValidator } from './create-validator';

const createNewClientRules = Joi.object({
  name: Joi.string(),
  bday: Joi.date(),
  address: Joi.string(),
  company: Joi.string(),
});

export type CreateClientSchema = joi.extractType<typeof createNewClientRules>;
export const validateCreateNewClient = createValidator(createNewClientRules);

const updateClientRules = Joi.object({
  cid: Joi.number().positive().required(),
  name: Joi.string(),
  bday: Joi.date(),
  address: Joi.string(),
  company: Joi.string(),
});

export type UpdateClientSchema = joi.extractType<typeof updateClientRules>;
export const validateUpdateClient = createValidator(updateClientRules);
